const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    higherQualification: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QualificationMaster' }],
    university: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UniversityMaster' }],
    currentExperience: { type: Number, required: true },
    position: [{ type: String, required: true }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SkillsMaster' }],
    avatar: { type: String }// File path for avatar
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields// File path for avatar
);
  
module.exports  = mongoose.model('Candidates', candidateSchema);


