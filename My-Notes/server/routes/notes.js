const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const router = express.Router();

//get
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ isPinned: -1, updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
});
//post
router.post('/', auth, async (req, res) => {
  try {
    const note = new Note({ ...req.body, userId: req.user.id });
    await note.save();
    
    // Emit event to all connected clients in this user's room
    const io = req.app.get('io');
    if (io) io.to(`user-${req.user.id}`).emit('noteCreated', note);
    
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note' });
  }
});
//put
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    // Emit event
    const io = req.app.get('io');
    if (io) io.to(`user-${req.user.id}`).emit('noteUpdated', note);
    
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
});
//delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    // Emit event
    const io = req.app.get('io');
    if (io) io.to(`user-${req.user.id}`).emit('noteDeleted', req.params.id);
    
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
});

module.exports = router;
