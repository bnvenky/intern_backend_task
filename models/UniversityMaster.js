const mongoose = require('mongoose');

const UniversityMasterSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('UniversityMaster', UniversityMasterSchema);