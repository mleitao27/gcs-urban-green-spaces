/* 
 * db (Module)
 * Description : Database handling module allows to get, insert, update and delete
 * data from the the db. Also provides simple connection function to mongodb.
 */

// Imports
var mongodb = require('mongodb');

// Db credentials from configuration file
var config = require('../extension/config');

/**
 * DESCRIPTION: Connects to the database and retrieves a certain collection.
 * Used in every other method.
 * ARGS:
 * - collection : collection to be to returned from the db
 */
var loadCollection = async (collection) => {
    // Create connection
    const client = await mongodb.MongoClient.connect
        (config.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    // Return 'collection' passed as arg
    return client.db(config.db.name).collection(collection);
};

/**
 * DESCRIPTION: Inserts a document in a collection.
 * Returns the inserted document.
 * ARGS:
 * - collectionName : collection where to insert new doc
 * - newDocument : new doc to be inserted into the db
 */
var insertDocument = async (collectionName, newDocument) => {
    // Loads collection
    const collection = await loadCollection(collectionName);
    // Inserts document into loaded collection
    const dID = await collection.insertOne(newDocument);
    // Returns document
    return dID.ops[0]._id;
};

/**
 * DESCRIPTION: Gets document from collection according to
 * a search param passed as argument
 * ARGS:
 * - collectionName : collection where to look for the doc
 * - search : search param(s) used to find the doc
 */
var getDocument = async (collectionName, search) => {
    // Loads collection
    const collection = await loadCollection(collectionName);
    // Returns wanted doc as result of find
    return await collection.find(search).toArray();
};

/**
 * DESCRIPTION: Updates a document matching the search
 * parameters from a certain collection
 * ARGS:
 * - collectionName : collection where to look for the doc
 * - search : search param(s) used to find the doc
 * - updatedDocument : new values to be updated in the doc
 */ 
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

/**
 * DESCRIPTION: Deletes one document matching the search
 * parameters from a certain collection
 * ARGS:
 * - collectionName : collection where to look for the doc
 * - search : search param(s) used to find the doc
 */ 
var deleteDocument = async (collectionName, search) => {
    // Loads collection
    const collection = await loadCollection(collectionName);
    // Turns collection into array and looks for document
    const result = await collection.find(search).toArray();
    // If document found in collection
    if (result.length > 0)
        // Delete document
        await collection.deleteOne(search);
};

/**
 * DESCRIPTION: Deletes all documents matching the search
 * parameters from a certain collection
 * ARGS:
 * - collectionName : collection where to look for the doc
 * - search : search param(s) used to find the doc
 */ 
var deleteAllDocuments = async (collectionName, search) => {
    // Loads collection
    const collection = await loadCollection(collectionName);
    // Turns collection into array and looks for document
    const result = await collection.find(search).toArray();
    // Maps throught the array deleting all the docs
    result.map(async r => {
        await collection.deleteOne(search);
    });
};

// Export functions
exports.loadCollection = loadCollection;
exports.insertDocument = insertDocument;
exports.getDocument = getDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
exports.deleteAllDocuments = deleteAllDocuments;