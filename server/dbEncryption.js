var mongodb = require('mongodb');
var crypto = require('crypto');
const { exit } = require('process');

const db = {
    url: 'mongodb://127.0.0.1:27017',
    name: 'crowdsourcing'
};

var loadCollection = async (collection) => {
    // Create connection
    const client = await mongodb.MongoClient.connect
        (db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    // Return 'collection' passed as arg
    return client.db(db.name).collection(collection);
};

var getDocument = async (collectionName, search) => {
    // Loads collection
    const collection = await loadCollection(collectionName);
    // Returns wanted doc as result of find
    return await collection.find(search).toArray();
};

var updateDocument = async (collectionName, search, updatedDocument) => {
    // Loads collection
    const collection = await loadCollection(collectionName);
    // Turns collection into array
    const result = await collection.find().toArray();
    // If collection not empty
    if (result.length > 0)
        // Update wanted document 
        await collection.updateOne(search, {$set: updatedDocument});
};

const encryptAES = (password) => {
    var mykey = crypto.createCipheriv('aes-256-cbc', generate(password, 32), generate(password, 16));
    var mystr = mykey.update(password, 'utf8', 'hex')
    mystr += mykey.final('hex');
    return (mystr);
  };

const decryptAES = (cypherText, password) => {
    var mykey = crypto.createDecipheriv('aes-256-cbc', generate(password, 32), generate(password, 16));
    var mystr = mykey.update(cypherText, 'hex', 'utf8')
    mystr += mykey.final('utf8');
    return (mystr);
};

const generate = (password, bytes) => {
if (password.length > bytes)
    return password.slice(0,bytes);
else if(password.length < bytes) 
    return password.padEnd(bytes, '0')
else
    return password;
};

// SCRIPT
const main = async () => {
    const users = await getDocument('users', {});

    const asyncRes = await Promise.all(users.map(async (user) => {
        if (user.password) {
            let encrypted = dencryptAES(user.password, user.password);
            console.log(user.email, user.password);
            await updateDocument('users', {email: user.email}, {password: encrypted});
        }
    }));

    exit();
};

var myArgs = process.argv.slice(2);
if (myArgs[0] === 'e') console.log(encryptAES(myArgs[1]));
else if (myArgs[0] === 'd') console.log(decryptAES(myArgs[1], myArgs[2]));
else if (myArgs[0] === 'a') main();