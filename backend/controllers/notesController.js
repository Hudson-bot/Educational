import Note from '../models/Note.js';

// Save note
export const saveNote = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const username = req.user.name; // Assuming the user's name is available in req.user

    let note = await Note.findOne({ user: userId });

    if (note) {
      note.content = content;
      note.username = username;
      await note.save();
    } else {
      note = await Note.create({
        user: userId,
        username,
        content
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get note
export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: note || { content: '' }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({ user: req.user.id });

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