const User = require("../models/User.js");
const Soil = require("../models/Soil.js");
const Distributor = require("../models/Distributor.js");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


const dashboard = async (req, res) => {
    try {
        const soilCount = await Soil.countDocuments();
        const distCount = await Distributor.countDocuments();
        
        const cropTypes = await Distributor.aggregate([
            { $unwind: "$distributes" },
            { $group: { _id: "$distributes" } },
            { $count: "distinctDistributeCount" }
        ]);

        const distinctLocations = await Distributor.distinct("location");
        const activeLocationCount = distinctLocations.length;

        const cropsStats = await Distributor.aggregate([
            { $unwind: "$distributes" },

            // Group by crop name and count occurrences
            {
                $group: {
                _id: "$distributes",
                count: { $sum: 1 }
                }
            },

            // Sort optionally (e.g., alphabetically or by count)
            { $sort: { _id: 1 } },

            // Group again to generate two arrays: names and counts
            {
                $group: {
                _id: null,
                cropNames: { $push: "$_id" },
                counts: { $push: "$count" }
                }
            },

            // Reshape the output
            {
                $project: {
                _id: 0,
                cropNames: 1,
                counts: 1
                }
            }
        ]);

        // console.log(cropsStats[0]);

        const results = {
            dataCards: {
                soilCount,
                distCount, 
                cropTypes: cropTypes[0].distinctDistributeCount, 
                activeLocationCount
            },
            pieCharts: {
                cropsStats: cropsStats[0],

            }
        }

        // console.log(results);
        res.json(results);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong.", success: false });
    }
};


module.exports = dashboard