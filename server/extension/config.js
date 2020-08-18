// Set admin credentials
const admin = [
    {
        email: 'admin',
        password: 'admin'
    }
];

// Database credentials
const db = {
    url: 'mongodb://127.0.0.1:27017/crowdsourcing',
    name: 'crowdsourcing'
};

// Set cache timeout in seconds
const userTimeout = 3600;

// Interval to consider that user has answered recently in seconds
const recentAnswer = 3600;

// Offset to include an UGS in the user proximity list in meters
const inUgsOffset = 1000;

const language = 'en';

// Exports
exports.admin = admin;
exports.userTimeout = userTimeout;
exports.recentAnswer = recentAnswer;
exports.inUgsOffset = inUgsOffset;
exports.language = language;
exports.db = db;