import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide teacher name'],
    trim: true
  },
  specialty: {
    type: String,
    required: [true, 'Please provide specialty'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  qualifications: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    enum: [
      'Computer Science',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'Engineering',
      'Literature',
      'Other'
    ],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;