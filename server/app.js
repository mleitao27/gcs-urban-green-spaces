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

app.use('/public', express.static(__dirname + '/extension/public'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoints
app.use('/api/users', usersRouter);
app.use('/api/surveys', surveysRouter);

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