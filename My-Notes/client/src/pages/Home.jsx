import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateNote from '../components/CreateNote';
import NoteCard from '../components/NoteCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/notes`);
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async ({ title, content }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/notes`, { title, content });
      setNotes([res.data, ...notes]);
    } catch (error) {
      console.error('Error creating note', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/notes/${id}`, updates);
      setNotes(
        notes
          .map(note => (note._id === id ? res.data : note))
          .sort((a, b) => b.isPinned - a.isPinned)
      );
    } catch (error) {
      console.error('Error updating note', error);
    }
  };

  const pinnedNotes = notes.filter(n => n.isPinned);
  const otherNotes = notes.filter(n => !n.isPinned);

  return (
    <div
      className="min-h-screen pt-28 pb-16 px-6 transition-colors duration-500"
      style={{ maxWidth: '1100px', margin: '0 auto' }}
    >
      <CreateNote onSave={handleSaveNote} />

      {loading ? (
        <div className="flex justify-center mt-16">
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '2.5px solid transparent',
              borderTopColor: '#92400e',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </div>
      ) : (
        <div className="mt-10">
          {pinnedNotes.length > 0 && (
            <div className="mb-10">
              <p
                className="text-xs uppercase tracking-[0.18em] mb-5 ml-1 dark:text-stone-400 text-stone-500"
                style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}
              >
                Pinned
              </p>
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
              {pinnedNotes.length > 0 && (
                <p
                  className="text-xs uppercase tracking-[0.18em] mb-5 ml-1 dark:text-stone-400 text-stone-500"
                  style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}
                >
                  Others
                </p>
              )}
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-24"
            >
              <p
                className="dark:text-stone-500 text-stone-400 text-lg"
                style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic' }}
              >
                Your thoughts will appear here…
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}