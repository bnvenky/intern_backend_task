const SkillsMaster = require('../models/SkillsMaster');

// Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const { name, description } = req.body;

    const skill = new SkillsMaster({ name, description });
    await skill.save();

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await SkillsMaster.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSkillsById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the technology by ID and populate the skills field
    const skill = await SkillsMaster.findById(id).populate('name description');

    if (!skill) {
      return res.status(404).json({ message: 'Skills not found' });
    }

    // Return the populated skills
    res.json(skill.name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

