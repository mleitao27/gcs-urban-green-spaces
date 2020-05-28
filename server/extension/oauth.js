// Imports
const {OAuth2Client} = require('google-auth-library');
var axios = require('axios');

var db = require('../modules/db');

// Oauth register handler
const registerHandler = async (accessData) => {
    // Check if user logged in 3rd party
    return oauthHandler(accessData)
    .then(async id => {
        if (id !== false) {
            // Find user in the db
            const users = await db.loadCollection('users');
            const repeatedUsers = await users.find({email: accessData.email}).toArray();

            // If user already exists
            if (repeatedUsers.length > 0) {
                return 302;
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
                return 201;
            }
        } else return 404;
    });
};

// Oauth login handler
const loginHandler = async (accessData) => {
    return oauthHandler(accessData)
    .then(async id => {
        if (id !== false) {
            // Find user in the db
            const users = await db.loadCollection('users');
            const repeatedUsers = await users.find({oauthId: accessData.user, email: accessData.email}).toArray();
            // If the user was found
            if (repeatedUsers.length === 1)
                return {status: 200, type: repeatedUsers[0].type};
            else return {status: 404, type: ''};
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