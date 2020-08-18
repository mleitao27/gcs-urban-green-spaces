/* 
 * cache (Module)
 * Description : Cache handling module, contains get(), set() and del() methods.
 * Allows to manage the cache built using memcached-promisify.
 */

// Imports
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

// Delete 'key' from cache 
const del = (key) => {
    return memcached.del(key)
    .then(result => {
        return result;
    });
};

// Export methods
exports.get = get;
exports.set = set;
exports.del = del;