const QualificationMaster = require('../models/QualificationMaster');

// Create a new skill
exports.createQualification = async (req, res) => {
  try {
    const { name } = req.body;

    const qualification = new QualificationMaster({ name});
    await qualification.save();

    res.status(201).json(qualification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all skills
exports.getQualification = async (req, res) => {
  try {
    const qualification = await QualificationMaster.find();
    res.json(qualification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQualificationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the technology by ID and populate the skills field
    const qualification = await QualificationMaster.findById(id).populate('name');

    if (!qualification) {
      return res.status(404).json({ message: 'Qualification not found' });
    }

    // Return the populated skills
    res.json(qualification.name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

