const mongoose = require('mongoose');


const logSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    details: mongoose.Schema.Types.Mixed // Any extra info
});
  
module.exports =  mongoose.model('Log', logSchema);
  