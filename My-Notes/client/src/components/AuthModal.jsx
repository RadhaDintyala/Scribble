import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'https://scribble-note.onrender.com/api';

export default function AuthModal({ isOpen, onClose, mode, setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const res = await axios.post(`${API_URL}${endpoint}`, { username, password });
      
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 dark:hover:text-white">
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold mb-6 text-stone-800 dark:text-white" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
              required
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
              required
              autoComplete="off"
            />
            <button
              type="submit"
              className="mt-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors"
            >
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}