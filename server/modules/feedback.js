/* 
 * feedbackExtension
 * Description : Handles feedback both immediate and differenciated
 */

// Imports
const feedbackArray = require('../extension/feedback/feedbackArray');

// Sends immeadiate feedback to the users answer
const immediate = () => {
    feedbackArray.feedbacks.immediate();
};

// Call differenciated feedback modules that can will
// deliver feed back to the user after doing some processing
const differenciated = () => {
    feedbackArray.feedbacks.differenciated.map(feedback => {
        feedback.module();
    });
};

// Export functions
exports.immediate = immediate;
exports.differenciated = differenciated;