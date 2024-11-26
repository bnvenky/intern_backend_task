const mongoose = require('mongoose');

const TechnologyMasterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    skills:[{ type: String,  unique: true}],
    description: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('TechnologyMaster', TechnologyMasterSchema);
