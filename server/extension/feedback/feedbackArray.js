/* 
 * diffFeedbackArray
 * Description : Array of differenciated feedback modules.
 */

// Import feedback modules
var diffFeedback1 = require('./diffFeedback1');
var diffFeedback2 = require('./diffFeedback2');
var diffFeedback3 = require('./diffFeedback3');

var immediateFeedback = require('./immediateFeedback');

const feedbacks = {
    immediate: immediateFeedback.immediateFeedback,
    differenciated: [
        {
            name: 'diffFeedback1',
            module: diffFeedback1.diffFeedback1
        },
        {
            name: 'diffFeedback2',
            module: diffFeedback2.diffFeedback2
        },
        {
            name: 'diffFeedback3',
            module: diffFeedback3.diffFeedback3
        }
    ]
};

// Export array
exports.feedbacks = feedbacks;