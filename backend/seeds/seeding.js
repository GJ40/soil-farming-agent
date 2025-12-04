const Soil = require('../models/Soil');
const Distributor = require('../models/Distributor');

const soils = require('./soils.json');
const distributors = require('./distributors.json');

const seedDB = async () => {
    try {
        await Soil.deleteMany({});
        await Soil.insertMany(soils);
        await Distributor.deleteMany({});
        await Distributor.insertMany(distributors);
        console.log('Database seeded successfully');
    } catch (error) {
        console.log("Error seeding database");
        console.log(error);
    }
};

module.exports = {seedDB};