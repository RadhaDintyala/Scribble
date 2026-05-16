import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import CreateNote from '../components/CreateNote';
import NoteCard from '../components/NoteCard';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const BACKEND_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://scribble-note.onrender.com';
const API_URL = import.meta.env.VITE_API_URL || `${BACKEND_URL}/api`;

export default function Home({ token }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const socketRef = useRef(null); // ✅ socket stored in ref, not module level

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetchNotes();

      // ✅ Only connect socket when logged in
      socketRef.current = io(BACKEND_URL);

      const userId = localStorage.getItem('userId');
      if (userId) {
        socketRef.current.emit('join', userId);
      }

      socketRef.current.on('noteCreated', (newNote) => {
        setNotes((prevNotes) => {
          if (prevNotes.some(n => n._id === newNote._id)) return prevNotes;
          return [newNote, ...prevNotes];
        });
      });

      socketRef.current.on('noteUpdated', (updatedNote) => {
        setNotes((prevNotes) =>
          prevNotes
            .map(note => (note._id === updatedNote._id ? updatedNote : note))
            .sort((a, b) => b.isPinned - a.isPinned)
        );
      });

      socketRef.current.on('noteDeleted', (deletedId) => {
        setNotes((prevNotes) => prevNotes.filter(note => note._id !== deletedId));
      });
    } else {
      setNotes([]);
      setLoading(false);
      // ✅ Disconnect socket on logout
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('noteCreated');
        socketRef.current.off('noteUpdated');
        socketRef.current.off('noteDeleted');
      }
    };
  }, [token]);

  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, [loading]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async ({ title, content }) => {
    try {
      const res = await axios.post(`${API_URL}/notes`, { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(prev => {
        if (prev.some(n => n._id === res.data._id)) return prev;
        return [res.data, ...prev];
      });
    } catch (error) {
      console.error('Error creating note', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const res = await axios.put(`${API_URL}/notes/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(prev =>
        prev
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
      className="min-h-screen pt-32 pb-16 px-6 transition-colors duration-500"
      style={{ maxWidth: '1100px', margin: '0 auto' }}
    >
      {!token ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-24"
        >
          <p
            className="dark:text-stone-500 text-stone-400 text-xl font-medium"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Please login from the menu to view or create notes.
          </p>
        </motion.div>
      ) : (
        <>
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
            <div ref={containerRef} className="mt-10">
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
        </>
      )}
    </div>
  );
}