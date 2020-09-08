/* 
 * users (Router)
 * Description : Contains all tht endpoints that handle requests
 * related to the users. Handles user authentication and registration
 * but also admin features such as change user type or remove them
 * from the system.
 */

// Imports
var express = require('express');
var router = express.Router();

var db = require('../modules/db');
var cache = require('../modules/cache');
var config = require('../extension/config');

var multer  = require('multer');
var upload = multer({ limits: { fieldSize: 25 * 1024 * 1024 } });

// Get Users
router.post('/', async (req, res) => {
  // Check cache
  cache.get(req.body.adminEmail)
  .then(async result => {
    // If user not in cache
    if (typeof result === 'undefined') res.status(403).send();
    else {
      // Get existing users from db
      const users = await db.loadCollection('users');
      res.status(200).send(await users.find().toArray());
    }
    });
});

// Register User
router.post('/register', async (req, res) => {

  // Create new user object
  const newUser = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    type: req.body.type
  };

  // Get existing users from db
  const users = await db.loadCollection('users');
  // Search for user with same email
  var repeated = await users.find({ email: newUser.email }).toArray();

  // If user found send 302
  if (repeated.length > 0) {
    res.status(302).send();
  }
  // If user not found send 201
  else {
    await users.insertOne(newUser);
    res.status(201).send();
  }

});

// Login User
router.post('/login', async (req, res) => {

  // Login user object
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  // Get login admin credentials
  for (admin of config.admin) {
    if (admin.email === user.email && admin.password === user.password) {
      // Add admin to cache
      cache.set(String(user.email), config.userTimeout);
      return res.status(200).send({ type: 'admin' });
    }
  }

  // Get existing users from db
  const users = await db.loadCollection('users');
  // Search for user in db
  const found = await users.find(user).toArray();

  // If user found
  if (found.length === 1) {
    // Store in cache
    cache.set(String(user.email), config.userTimeout);
    return res.status(200).send({ type: found[0].type });
  }
  // If user not found
  res.status(404).send();
});

// Login user with oauth
router.post('/logout', async (req, res) => {
  cache.del(String(req.body.email))
    .then(async result => {
      if (result) res.status(200).send();
      else res.status(404).send();
    });
});

// Change User Type
router.post('/changeType', async (req, res) => {
  cache.get(req.body.adminEmail)
    .then(async result => {
      // Check if admin is in the cache
      if (typeof result === 'undefined') res.status(403).send();
      else {
        // Get existing users from db
        const users = await db.loadCollection('users');
        // Search and updtate type for user with same email
        await users.updateOne({ email: req.body.email }, { $set: { type: req.body.type } });
        res.status(200).send();
      }
    });
});

// Delete User
router.post('/remove', async (req, res) => {
  cache.get(req.body.adminEmail)
    .then(async result => {
      // Check if admin is in the cache
      if (typeof result === 'undefined') res.status(403).send();
      else {
        const users = await db.loadCollection('users');
        // Check if admin pasword correct
        for (admin of config.admin) {
          if (admin.password === req.body.adminPassword) {
            // Removes user with the specified email with admin auth
            await users.deleteOne({ email: req.body.emailDelete });
            res.status(200).send();
          }
        }
        res.status(401).send();
      }
    });
});

// Edit User
router.post('/edit', upload.single(), async (req, res) => {
  // Check cache
  cache.get(req.body.email)
  .then(async result => {
  // If user not in cache
      if (typeof result === 'undefined') res.status(403).send();
      else{
          await db.updateDocument('users', { email: req.body.email }, {base64: req.body.base64, name: req.body.name }) 
          res.status(200).send();
      }     
  });
});

router.post('/get', upload.single(), async (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
    // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else res.status(200).send(await db.getDocument('users', { email: req.body.email }) );       
    });
});

// Export router
module.exports = router;