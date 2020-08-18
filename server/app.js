/* 
 * app (Main)
 * Description : Server's amin file. Contains all the essential
 * import, middleware, router's setting and and an enpoint to 
 * check if user is in cache. Also runs the entire server.
 */

// Imports
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var cache = require('./modules/cache');

// Create express application
const app = express();

// Routers
var usersRouter = require('./routes/users');
var surveysRouter = require('./routes/surveys');
var profileRouter = require('./routes/profile');
var resultsRouter = require('./routes/results');
var oauthRouter = require('./routes/oauth');
var researcherRouter = require('./routes/researcher');

// Makes './extension/public' folder available with '/public' url
app.use('/public', express.static(__dirname + '/extension/public'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoints
app.use('/api/users', usersRouter);
app.use('/api/surveys', surveysRouter);
app.use('/api/profile', profileRouter);
app.use('/api/results', resultsRouter);
app.use('/api/oauth', oauthRouter);
app.use('/api/researcher', researcherRouter);

// Endpoint used to check if user regitered in cache
// User id passed in url
app.get('/:uid', (req, res) => {
    // Checks in cache
    cache.get(req.params.uid)
    .then(result => {
        // If not found sends 404
        if (typeof result === 'undefined') res.status(404).send();
        // Else sends 200
        else res.status(200).send();
    });
});

// Choose port
// const port = process.env.PORT || 3000;
const port = 3000;

// Run server
app.listen(port, () => console.log(`Listening on port ${port}...`));