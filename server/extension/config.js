// Set admin credentials
const admin = [
    {
        email: 'admin',
        password: 'admin'
    }
];

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