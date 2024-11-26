const Candidates = require('../models/Candidates')
const SkillsMaster = require('../models/SkillsMaster');
const QualificationMaster = require('../models/QualificationMaster');
const UniversityMaster = require('../models/UniversityMaster');
const fs = require('fs');
const path = require('path');



// Create a new Candidates
exports.createCandidates = async (req, res) => {
  try {
    const { firstName,
      lastName,
        phone,
        dateOfBirth,
        email,
        gender,
        higherQualification,
        university,
        currentExperience,
        position,
        skills
        } = req.body;
    
    console.log(position);
    
    const avatar = req.file ? `/uploads/${req.file.filename}` : null; // Updated path 
    console.log(avatar);


    const QualificationIds = [];
      let qualification = await QualificationMaster.findOne({name: higherQualification});
      if (!qualification){
        // Create a new qualification if it doesn't exist
        qualification  = new QualificationMaster({name: higherQualification})
        await qualification.save();
      }
      QualificationIds.push(qualification._id);
    

    const UniversityIds = [];
      let univ = await UniversityMaster.findOne({name: university});
      if (!univ){
        // Create a new University if it doesn't exist
        univ  = new UniversityMaster({name: university})
        await univ.save();
      }
      UniversityIds.push(univ._id);

      


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

    const candidates = new Candidates({
      firstName,
      lastName,
        phone,
        dateOfBirth,
        email,
        gender,
        higherQualification: QualificationIds,
        university: UniversityIds,
        currentExperience,
        position,
        skills: skillIds,
        avatar
    });

    await candidates.save();
    res.status(201).json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all positions
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidates.find()
    .populate('skills', 'name description')
    .populate('higherQualification', 'name')
    .populate('university', 'name');
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a unique candidate by ID
exports.getUniqueCandidate = async (req, res) => {
  try {
    const { id } = req.params; // Candidate ID from request params

    const candidate = await Candidates.findById({_id : id})
      .populate('skills', 'name description') // Populate skills with their name and description
      .populate('higherQualification', 'name') // Populate higher qualification with its name
      .populate('university', 'name'); // Populate university with its name

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.updateCandidates = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const updatedDetails = req.body;

    console.log(updatedDetails);

    // Ensure higherQualification is an array
    if (updatedDetails.higherQualification) {
      const qualifications = Array.isArray(updatedDetails.higherQualification)
        ? updatedDetails.higherQualification
        : [updatedDetails.higherQualification];

      const qualificationIds = await Promise.all(
        qualifications.map(async (qualificationName) => {
          let qualification = await QualificationMaster.findOne({ name: qualificationName });
          if (!qualification) {
            qualification = new QualificationMaster({ name: qualificationName });
            await qualification.save();
          }
          return qualification._id;
        })
      );
      updatedDetails.higherQualification = qualificationIds;
    }

    // Ensure university is an array
    if (updatedDetails.university) {
      const universities = Array.isArray(updatedDetails.university)
        ? updatedDetails.university
        : [updatedDetails.university];

      const universityIds = await Promise.all(
        universities.map(async (universityName) => {
          let university = await UniversityMaster.findOne({ name: universityName });
          if (!university) {
            university = new UniversityMaster({ name: universityName });
            await university.save();
          }
          return university._id;
        })
      );
      updatedDetails.university = universityIds;
    }

    // Convert `skills` names to Object IDs
    if (updatedDetails.skills) {
      const skills = Array.isArray(updatedDetails.skills)
        ? updatedDetails.skills
        : [updatedDetails.skills];

      const skillIds = await Promise.all(
        skills.map(async (skillName) => {
          let skill = await SkillsMaster.findOne({ name: skillName });
          if (!skill) {
            skill = new SkillsMaster({ name: skillName });
            await skill.save();
          }
          return skill._id;
        })
      );
      updatedDetails.skills = skillIds;
    }

    // Update avatar if provided
    if (req.file) {
      updatedDetails.avatar = `/uploads/${req.file.filename}`;
    }

    // Update candidate document in the database
    const candidate = await Candidates.findByIdAndUpdate(
      candidateId,
      { $set: updatedDetails },
      { new: true, omitUndefined: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Respond with the updated candidate
    res.status(200).json({
      message: 'Candidate updated successfully',
      candidate: {
        _id: candidate._id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        phone: candidate.phone,
        dateOfBirth: candidate.dateOfBirth,
        email: candidate.email,
        gender: candidate.gender,
        higherQualification: candidate.higherQualification,
        university: candidate.university,
        currentExperience: candidate.currentExperience,
        position: candidate.position,
        skills: candidate.skills,
        avatar: candidate.avatar,
      },
    });
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ message: 'Error updating candidate', error: error.message });
  }
};





// Update a Candidate
// exports.updateCandidates = async (req, res) => {
//   try {
//     const { id } = req.params; // Candidate ID
//     const {
//       firstName,
//       lastName,
//       phone,
//       dateOfBirth,
//       email,
//       gender,
//       higherQualification,
//       university,
//       currentExperience,
//       position,
//       skills,
//     } = req.body;
    

//     // Check if avatar is being updated
//     const avatar = req.file ? `/uploads/${req.file.filename}` : null;

//     // Handle Higher Qualification
//     const QualificationIds = [];
//     if (higherQualification) {
//       for (const qualificationName of higherQualification) {
//         let qualification = await QualificationMaster.findOne({ name: qualificationName });
//         if (!qualification) {
//           qualification = new QualificationMaster({ name: qualificationName });
//           await qualification.save();
//         }
//         QualificationIds.push(qualification._id);
//       }
//     }

//     // Handle University
//     const UniversityIds = [];
//     if (university) {
//       for (const universityName of university) {
//         let univ = await UniversityMaster.findOne({ name: universityName });
//         if (!univ) {
//           univ = new UniversityMaster({ name: universityName });
//           await univ.save();
//         }
//         UniversityIds.push(univ._id);
//       }
//     }

//     // Handle Skills
//     const skillIds = [];
//     if (skills) {
//       for (const skillName of skills) {
//         let skill = await SkillsMaster.findOne({ name: skillName });
//         if (!skill) {
//           skill = new SkillsMaster({ name: skillName });
//           await skill.save();
//         }
//         skillIds.push(skill._id);
//       }
//     }

//     // Find the candidate and update their details
//     const updatedCandidate = await Candidates.findByIdAndUpdate(
//       id,
//       {
//         $set: {
//           firstName,
//           lastName,
//           phone,
//           dateOfBirth,
//           email,
//           gender,
//           higherQualification: QualificationIds.length ? QualificationIds : undefined,
//           university: UniversityIds.length ? UniversityIds : undefined,
//           currentExperience,
//           position,
//           skills: skillIds.length ? skillIds : undefined,
//           avatar: avatar || undefined,
//         },
//       },
//       { new: true, omitUndefined: true }
//     )
//       .populate('skills', 'name description')
//       .populate('higherQualification', 'name')
//       .populate('university', 'name');

//     if (!updatedCandidate) {
//       return res.status(404).json({ message: 'Candidate not found' });
//     }

//     res.status(200).json(updatedCandidate);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



