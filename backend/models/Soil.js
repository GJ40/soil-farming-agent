const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
    soilType: { type: String, required: true },
    description: { type: String, required: true },
    moistureContent: Number,
    image: String,
    nutrients: {
      nitrogen: {
        type: String,
        enum: ['High', 'Moderate', 'Low'], // Allowed values for the dropdown
      },
      phospohrus: {
        type: String,
        enum: ['High', 'Moderate', 'Low'], // Allowed values for the dropdown
      },
      potassium: {
        type: String,
        enum: ['High', 'Moderate', 'Low'], // Allowed values for the dropdown
      }
    },
    region: String,
    phRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },
    suitableCrops: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
  
soilSchema.index({ soilType: 1 }); // for search
soilSchema.index({ createdAt: -1 }); // for sorting
  
module.exports = mongoose.model('Soil', soilSchema);
  