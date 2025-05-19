const mongoose = require('mongoose');

const distributorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, require: true},
    image: String,
    contactPerson: String,
    contact: {
      phone: { type: String, require: true},
      email: { type: String, require: true},
      whatsapp: String,
      facebook: String
    },
    services: [String],
    distributes: {type: [String], required: true}, // crop types
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
  
distributorSchema.index({ name: 1 });
distributorSchema.index({ location: 1 });
distributorSchema.index({ createdAt: -1 });
  
module.exports = mongoose.model('Distributor', distributorSchema);
  