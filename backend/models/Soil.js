const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
    soilType: { type: String, required: true },
    description: String,
    image: String,
    phRange: {
      min: Number,
      max: Number
    },
    suitableCrops: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
  
soilSchema.index({ soilType: 1 }); // for search
soilSchema.index({ createdAt: -1 }); // for sorting
  
module.exports = mongoose.model('Soil', soilSchema);
  