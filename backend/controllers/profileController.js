// backend/controllers/profileController.js
import Profile from '../models/Profile.js';
import User from '../models/User.js';

// Get or create profile
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate('user');
    
    if (!profile) {
      // Create default profile if doesn't exist
      profile = new Profile({
        user: req.user.id,
        name: req.user.name,
        email: req.user.email
      });
      await profile.save();
    }
    
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, study, about } = req.body;
    
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { name, email, phone, study, about },
      { new: true, runValidators: true }
    ).populate('user');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ message: 'Error updating profile', error: err.message });
  }
};