
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  study: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    default: '',
    maxlength: 200
  }
}, {
  timestamps: true
});

export default mongoose.model('Profile', profileSchema);