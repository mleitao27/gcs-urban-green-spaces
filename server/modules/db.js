var mongodb = require('mongodb');

// Object with db credentials
const db = {
    url: 'mongodb://127.0.0.1:27017/crowdsourcing',
    name: 'crowdsourcing'
};

// Load collection
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

var insertDocument = async (collectionName, newDocument) => {
    const collection = await loadCollection(collectionName);
    const dID = await collection.insertOne(newDocument);

    return dID.ops[0]._id;
};

var getDocument = async (collectionName, search) => {
    const collection = await loadCollection(collectionName);
    return await collection.find(search).toArray();
};

var updateDocument = async (collectionName, search, newDocument) => {
    const collection = await loadCollection(collectionName);
    await collection.updateOne(search, {$set: newDocument});
};

var deleteDocument = async (collectionName, search) => {
    const collection = await loadCollection(collectionName);
    const result = await collection.find(search).toArray();
    if (result.length > 0)
        await collection.deleteOne(search);
};

var deleteAllDocuments = async (collectionName, search) => {
    const collection = await loadCollection(collectionName);
    const result = await collection.find(search).toArray();
    result.map(async r => {
        await collection.deleteOne(search);
    });
};

exports.loadCollection = loadCollection;
exports.insertDocument = insertDocument;
exports.getDocument = getDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
exports.deleteAllDocuments = deleteAllDocuments;