// backend/controllers/teacherController.js
import Teacher from '../models/Teacher.js';

// @desc    Create a new teacher
// @route   POST /api/v1/teachers
export const createTeacher = async (req, res) => {
  try {
    const { name, specialty, phone, email, qualifications, department } = req.body;
    
    const teacher = await Teacher.create({
      name,
      specialty,
      phone,
      email,
      qualifications,
      department,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: teacher
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all teachers for current user
// @route   GET /api/v1/teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ createdBy: req.user.id });
    
    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete a teacher
// @route   DELETE /api/v1/teachers/:id
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        error: 'No teacher found'
      });
    }

    // Make sure user owns the teacher
    if (teacher.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this teacher'
      });
    }

    await teacher.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};