// Imports
const {OAuth2Client} = require('google-auth-library');
var axios = require('axios');

var db = require('../modules/db');
var cache = require('../modules/cache');
var config = require('../extension/config');

// Oauth register handler
const registerHandler = async (req, res) => {
    const accessData = req.body;
    // Check if user logged in 3rd party
    oauthHandler(accessData)
    .then(async id => {
        if (id !== false) {
            // Find user in the db
            const users = await db.loadCollection('users');
            const repeatedUsers = await users.find({email: accessData.email}).toArray();

            // If user already exists
            if (repeatedUsers.length > 0) {
                res.status(302).send();
            } else {
                const newUser = {
                    name: accessData.name,
                    email: accessData.email,
                    platform: accessData.platform,
                    oauthId: accessData.user,
                    type: accessData.type
                };
                // Insert in the DB if it's a new user
                await users.insertOne(newUser);
                res.status(201).send();
            }
        } else res.status(404).send();
    });
};

// Oauth login handler
const loginHandler = async (req, res) => {
    const accessData = req.body;
    oauthHandler(accessData)
    .then(async id => {
        if (id !== false) {
            // Find user in the db
            const users = await db.loadCollection('users');
            const repeatedUsers = await users.find({oauthId: accessData.user, email: accessData.email}).toArray();
            // If the user was found
            if (repeatedUsers.length === 1) {
                cache.set(String(req.body.email), config.userTimeout);
                res.status(200).send({type: repeatedUsers[0].type});
            }
            else res.status(404).send({type: ''});
        }
    });
};

// Oauth 3rd party login verification
// If logged returns id else returns false
const oauthHandler = async (accessData) => {
    // If oauth platform is google
    if (accessData.platform === 'google') {
        return googleVerification(accessData.id, accessData.token)
        .then(id => {
            return id === accessData.user ? id : false;
        });
    }
    // If oauth platform is facebook
    else if (accessData.platform == 'facebook') {
        return facebookVerification(accessData.token)
        .then(id => {
            return id === accessData.user ? id : false;
        });
    }

    /* Add other third party platforms */
    
};

// Verify access token with google
const googleVerification = async (clientId, idToken) => {
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: clientId
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return userid;
};

// Verify access token with facebook
const facebookVerification = (accessToken) => {
    return axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`)
    .then(res => {
        return res.data.id;
    });
};

// Exports
exports.registerHandler = registerHandler;
exports.loginHandler = loginHandler;