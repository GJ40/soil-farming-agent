const express = require('express');
const dotenv = require('dotenv');
const Distributor = require('../models/Distributor');
dotenv.config();

// Add Distributor
const addDistributor = async (req, res) => {
    try {
      const { name, location, image, contact, distributes } = req.body;
      if(!(name && location && contact)){
        return res.status(400).json({ message: "Please fill all required fields.", success: false });
      }
      const newDistributor = new Distributor({
        name, 
        location,
        image,
        contact,
        distributes
      });
      const savedDistributor = await newDistributor.save();
      res.status(201).json({ message: "Added distributor to Database successfully.", success: true, distributor: savedDistributor});
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Failed to add distributor' });
    }
  };
  
  // Update Distributor
  const updateDistributor = async (req, res) => {
    try {
      const { name, location, contact, distributes } = await req.body;
      if(!(name && location && contact && distributes)){
        return res.status(400).json({ message: 'Please fill all required fields', success: false });
      }
      const distributor = await Distributor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!distributor) return res.status(404).json({ message: 'Distributor not found', success: false });
      res.status(201).json({ message: "Updated distributor details successfully.", success: true, distributor: distributor });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to update distributor', error });
    }
  };
  
  // Delete Distributor
  const deleteDistributor = async (req, res) => {
    try {
      const distributor = await Distributor.findByIdAndDelete(req.params.id);
      if (!distributor) return res.status(404).json({ message: 'Distributor not found', success: false });
      res.status(201).json({ message: 'Distributor deleted successfully', success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to delete distributor' });
    }
  };
  
  // Read/Search Distributors
  const getDistributors = async (req, res) => {
    try {
      const { query, location } = req.body;
      const filter = {};
      if (query) {
        filter.$or = [
          { name: { $regex: query, $options: 'i' } },
          { distributes: { $regex: query, $options: 'i' } }
        ];
      }

      if (location) {
        filter.location = { $regex: location, $options: 'i' };
      }
  
      const distributors = await Distributor.find(filter);
      res.status(201).json(distributors);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to fetch distributors' });
    }
  };

const getAllDistributors = async(req, res) => {
    try {
        const distributors = await Distributor.find();
        // console.log(soils);
        res.status(200).json(distributors);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in fetching distributors details."})
    }
}

const getDistributor = async (req, res) => {
  try {
    const id = req.params.id;
    const distributor = await Distributor.findOne({ _id: id });

    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    res.status(200).json(distributor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while fetching distributor details." });
  }
}

module.exports = { getAllDistributors, getDistributors, getDistributor, addDistributor, updateDistributor, deleteDistributor };