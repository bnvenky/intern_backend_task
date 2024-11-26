
// Create a new skill
const TechnologyMaster = require('../models/TechnologyMaster');
const SkillsMaster = require('../models/SkillsMaster');

exports.createTech = async (req, res) => {
  try {
    const { name, skills, description } = req.body;

    const tech = new TechnologyMaster({ name, skills, description });
    await tech.save();

    res.status(201).json(tech);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all skills
exports.getTech = async (req, res) => {
  try {
    const technologies = await TechnologyMaster.find();
    res.json(technologies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSkillsByTechnologyId = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the technology by ID and populate the skills field
    const technology = await TechnologyMaster.findById(id).populate('skills', 'name description');

    if (!technology) {
      return res.status(404).json({ message: 'Technology not found' });
    }

    // Return the populated skills
    res.json(technology.skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
