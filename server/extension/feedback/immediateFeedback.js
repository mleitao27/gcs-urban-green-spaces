/* 
 * immediateFeedback
 * Description : Immediate feedback dummy module
 */

const db = require('../../modules/db');

const immediateFeedback = async (req, res) => {
    const status = await db.getDocument('status', {user: req.body.email});
    res.status(200).send({weather: status[0].weather, googlefit: status[0].googlefit});
};

// Export module
exports.immediateFeedback = immediateFeedback;