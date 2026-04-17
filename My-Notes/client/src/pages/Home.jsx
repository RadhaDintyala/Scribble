import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateNote from '../components/CreateNote';
import NoteCard from '../components/NoteCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home({ user }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNoteCreated = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/notes/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.map(note => note._id === id ? res.data : note).sort((a, b) => b.isPinned - a.isPinned));
    } catch (error) {
      console.error('Error updating note', error);
    }
  };

  const pinnedNotes = notes.filter(n => n.isPinned);
  const otherNotes = notes.filter(n => !n.isPinned);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <CreateNote onNoteCreated={handleNoteCreated} />

      {loading ? (
        <div className="flex justify-center mt-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="mt-8">
          {pinnedNotes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 ml-2">Pinned</h2>
              <motion.div layout className="masonry-grid">
                <AnimatePresence>
                  {pinnedNotes.map(note => (
                    <NoteCard key={note._id} note={note} onDelete={handleDelete} onUpdate={handleUpdate} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {otherNotes.length > 0 && (
            <div>
              {pinnedNotes.length > 0 && <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 ml-2">Others</h2>}
              <motion.div layout className="masonry-grid">
                <AnimatePresence>
                  {otherNotes.map(note => (
                    <NoteCard key={note._id} note={note} onDelete={handleDelete} onUpdate={handleUpdate} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {notes.length === 0 && (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
              <p className="text-xl">Notes you add appear here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
