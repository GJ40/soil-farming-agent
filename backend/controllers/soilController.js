const Soil = require('../models/Soil');
const dotenv = require('dotenv');
dotenv.config();


// Add Soil
const addSoil = async (req, res) => {
  try {
    const { soilType, description, phRange, image, suitableCrops, moistureContent, region, nutrients } = req.body;
    const data = req.body;
    if(!(soilType && description && phRange)){
        return res.status(400).json({ message: "Please fill all required fields.", success: false });
    }
    const optionalFields = {
      image,
      suitableCrops,
      moistureContent,
      region,
      nutrients
    };

    const filteredOptionalFields = Object.entries(optionalFields).reduce((acc, [key, val]) => {
      if (
        val !== undefined &&
        val !== '' &&
        (typeof val !== 'object' || Object.values(val).some((v) => v !== ''))
      ) {
        acc[key] = val;
      }
      return acc;
    }, {});

    const newSoil = new Soil(
        { 
            soilType, 
            description, 
            phRange, 
            suitableCrops,
            ...filteredOptionalFields
        }
    );

    const saveSoil = await newSoil.save();
    
    res.status(201).json({ message: "Added soil to Database successfully.", success: true, soil: saveSoil});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to add soil' });
  }
};

// Update Soil
const updateSoil = async (req, res) => {
  try {
    const { soilType, description, phRange } = await req.body;
    if(!(soilType && description && phRange.min && phRange.max)){
      return res.status(400).json({ message: 'Please fill all required fields', success: false });
    }
    const soil = await Soil.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!soil) return res.status(404).json({ message: 'Soil not found', success: false });
    res.status(201).json({ message: "Updated soil details successfully.", success: true, soil: soil });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update soil' });
  }
};

// Delete Soil
const deleteSoil = async (req, res) => {
  try {
    const soil = await Soil.findByIdAndDelete(req.params.id);
    if (!soil) return res.status(404).json({ message: 'Soil not found', success: false });
    res.status(201).json({ message: 'Soil deleted successfully', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete soil' });
  }
};

// Read/Search Soil
const getSoils = async (req, res) => {
  try {
    const { query, phRange } = req.body;
    // console.log(query, typeof query)
    // Create a dynamic filter object
    const filter = {};

    
    // If 'query' exists, match it in either 'soilType' or 'description'
    if (query) {
      filter.$or = [
        { soilType: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }

    // Filter by pH range if either phMin or phMax is provided
    if (phRange) {
      filter['phRange.min'] = phRange.min ? { $lte: parseFloat(phRange.min) } : undefined;
      filter['phRange.max'] = phRange.max ? { $gte: parseFloat(phRange.max) } : undefined;

      // Remove undefined filters
      if (!filter['phRange.min']) delete filter['phRange.min'];
      if (!filter['phRange.max']) delete filter['phRange.max'];
    }

    // Fetch matching soils from DB
    const soils = await Soil.find(filter).sort({ createdAt: -1 });

    if(!soils){
      return res.status(500).json({ message: "No matching results found. "});
    }

    res.status(201).json(soils);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch soils'});
  }
};

const getAllSoils = async(req, res) => {
    try {
        const soils = await Soil.find();
        // console.log(soils);
        res.status(200).json(soils);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in fetching soils details."})
    }
}

const getSoil = async (req, res) => {
  try {
    const id = req.params.id;
    const soil = await Soil.findOne({ _id: id });

    if (!soil) {
      return res.status(404).json({ message: "Soil not found" });
    }
    res.status(200).json(soil);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while fetching soil details." });
  }
}


module.exports = { getAllSoils, getSoils, addSoil, updateSoil, deleteSoil, getSoil };