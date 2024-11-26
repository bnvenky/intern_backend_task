const mongoose = require('mongoose');

const SkillsMasterSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('SkillsMaster', SkillsMasterSchema);
