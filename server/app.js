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

app.get('/:uid', (req, res) => {
    cache.get(req.params.uid)
    .then(result => {
        if (typeof result === 'undefined') res.status(404).send();
        else res.status(200).send();
    });
});

//Choose port
// const port = process.env.PORT || 3000;
const port = 3000;

// Run server
app.listen(port, () => console.log(`Listening on port ${port}...`));