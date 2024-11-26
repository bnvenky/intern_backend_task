const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    experience: { type: String, required: true },
    jobDescription: { type: String, required: true },
    technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TechnologyMaster' }], // Reference to TechnologyMaster
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SkillsMaster' }], // Reference to SkillsMaster
    rounds: [
      {
        name: String,
        interviewMode: String,
        duration: String,
      },
    ],
    additionalNotes: String,
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Position', PositionSchema);

