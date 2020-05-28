const Memcached = require('memcached-promisify');

// Initialize cache
const memcached = new Memcached();

// Get 'key' from cache
const get = (key) => {
    return memcached.get(key)
    .then(result => {
        return result;
    });
};

// Set 'key' in cache with 'timeout'
const set = (key, timeout) => {
    memcached.set(key, key, timeout)
    .then(result => {});
};

// Delete 'key' in cache 
const del = (key) => {
    return memcached.del(key)
    .then(result => {
        return result;
    });
};


exports.get = get;
exports.set = set;
exports.del = del;