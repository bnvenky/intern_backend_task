/*const Position = require('../models/Position');

// Create a new position
exports.createPosition = async (req, res) => {
  try {
    const {id,title,companyName,experience,skills,jobDescription,rounds,additionalNotes} = req.body
    const position = new Position({id,title,companyName,experience,skills,jobDescription,rounds,additionalNotes});
    console.log(position);
    await position.save();
    res.status(201).json(position);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all positions
exports.getPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/



const Position = require('../models/Position');
const SkillsMaster = require('../models/SkillsMaster');
const TechnologyMaster = require('../models/TechnologyMaster');

// Create a new position
exports.createPosition = async (req, res) => {
  try {
    const { title, companyName, experience, technologies, skills, jobDescription, rounds, additionalNotes } = req.body;
    // console.log(title, companyName, experience, skills, jobDescription, rounds, additionalNotes)
    const TechIds = [];
    for (const TechName of technologies){
      let tech = await TechnologyMaster.findOne({name: TechName});

      if (!tech){
        // Create a new tech if it doesn't exist
        tech = new TechnologyMaster({name: TechName})
        await tech.save();
      }
      TechIds.push(tech._id);
    }

    

    

    const skillIds = [];
    for (const skillName of skills) {
      let skill = await SkillsMaster.findOne({ name: skillName });

      if (!skill) {
        // Create a new skill if it doesn't exist
        skill = new SkillsMaster({ name: skillName });
        await skill.save();
      }

      skillIds.push(skill._id);
    }

    const position = new Position({
      title,
      companyName,
      experience,
      technologies: TechIds,
      skills: skillIds,
      jobDescription,
      rounds,
      additionalNotes,
    });

    await position.save();
    res.status(201).json(position);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all positions
exports.getPositions = async (req, res) => {
  try {
    const positions = await Position.find()
    .populate('skills', 'name description')
    .populate('technologies', 'name description');
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPositionsId = async (req, res) => {
  try {
    const { id } = req.params;
    const positions = await Position.findById({_id : id})
      .populate('skills', 'name description')
      .populate('technologies', 'name description');

    if (!positions) {
      return res.status(404).json({ message: 'Position not found' });
    }

    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updatePosition = async (req, res) => {
  try {
    const positionId = req.params.id;
    const updatedDetails = req.body;
    console.log(updatedDetails);

    // Transform `technologies` to an array of strings if it's an array of objects
    if (Array.isArray(updatedDetails.technologies)) {
      updatedDetails.technologies = updatedDetails.technologies.map(tech => tech.name);
    }

    // Handle `technologies` if provided
    if (updatedDetails.technologies) {
      const techIds = [];
      for (const techName of updatedDetails.technologies) {
        let tech = await TechnologyMaster.findOne({ name: techName });

        if (!tech) {
          // Create a new technology if it doesn't exist
          tech = new TechnologyMaster({ name: techName });
          await tech.save();
        }
        techIds.push(tech._id);
      }
      updatedDetails.technologies = techIds;
    }

    // Transform `skills` to an array of strings if it's an array of objects
    if (Array.isArray(updatedDetails.skills)) {
      updatedDetails.skills = updatedDetails.skills.map(skill => skill.name);
    }

    // Handle `skills` if provided
    if (updatedDetails.skills) {
      const skillIds = [];
      for (const skillName of updatedDetails.skills) {
        let skill = await SkillsMaster.findOne({ name: skillName });

        if (!skill) {
          // Create a new skill if it doesn't exist
          skill = new SkillsMaster({ name: skillName });
          await skill.save();
        }
        skillIds.push(skill._id);
      }
      updatedDetails.skills = skillIds;
    }

    // Update the position
    const position = await Position.findById(positionId);
    if (!position) {
      return res.status(404).json({ message: 'Position not found' });
    }

    Object.assign(position, updatedDetails);
    await position.save();

    res.json({ message: 'Position updated successfully', position });
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({ message: 'Error updating position', error: error.message });
  }
};
    