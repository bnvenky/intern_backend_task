const UniversityMaster = require('../models/UniversityMaster');

// Create a new skill
exports.createUniversity = async (req, res) => {
  try {
    const { name } = req.body;

    const university = new UniversityMaster({ name});
    await university.save();

    res.status(201).json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all skills
exports.getUniversity = async (req, res) => {
  try {
    const university = await UniversityMaster.find();
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUniversityById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the technology by ID and populate the skills field
    const university = await UniversityMaster.findById(id).populate('name');

    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }

    // Return the populated skills
    res.json(university.name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};