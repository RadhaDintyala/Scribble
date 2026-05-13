import React, { useState } from 'react';
import { Mic, Image, Palette, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateNote({ onSave }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isDark = document.documentElement.classList.contains('dark');

  const glassBase = {
    backdropFilter: 'blur(20px) saturate(160%)',
    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
    border: isDark
      ? '1px solid rgba(255,255,255,0.1)'
      : '1px solid rgba(120, 80, 40, 0.15)',
    boxShadow: isDark
      ? '0 8px 40px rgba(0,0,0,0.4)'
      : '0 8px 40px rgba(80, 40, 10, 0.1)',
    borderRadius: '24px',
    background: isDark
      ? 'rgba(28, 22, 14, 0.75)'
      : 'rgba(255, 251, 243, 0.82)',
  };

  return (
    <div className="flex justify-center w-full mb-10">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            onClick={() => setIsExpanded(true)}
            style={{
              ...glassBase,
              width: '560px',
              cursor: 'text',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            whileHover={{ boxShadow: isDark
              ? '0 12px 48px rgba(0,0,0,0.5)'
              : '0 12px 48px rgba(80, 40, 10, 0.15)' }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '1rem',
              }}
              className="dark:text-stone-500 text-stone-400"
            >
              Write something…
            </span>
            <div className="flex gap-3 dark:text-stone-600 text-stone-400">
              <Mic size={20} />
              <Image size={20} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            style={{
              ...glassBase,
              width: '680px',
              padding: '32px 36px',
            }}
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Decorative accent line */}
            <div
              style={{
                width: '36px',
                height: '3px',
                borderRadius: '2px',
                background: isDark ? '#b45309' : '#92400e',
                marginBottom: '24px',
                opacity: 0.7,
              }}
            />

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                width: '100%',
                marginBottom: '16px',
              }}
              className="dark:text-stone-100 text-stone-800 placeholder:text-stone-300 dark:placeholder:text-stone-700"
            />
            <textarea
              placeholder="What's on your mind…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '1rem',
                lineHeight: '1.75',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                width: '100%',
                minHeight: '140px',
                resize: 'none',
              }}
              className="dark:text-stone-300 text-stone-600 placeholder:text-stone-300 dark:placeholder:text-stone-700"
            />

            <div
              style={{
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: isDark
                  ? '1px solid rgba(255,255,255,0.07)'
                  : '1px solid rgba(120,80,40,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Tool icons */}
              <div className="flex gap-5 dark:text-stone-500 text-stone-400">
                {[Mic, Image, Palette].map((Icon, i) => (
                  <button
                    key={i}
                    className="hover:dark:text-amber-400 hover:text-amber-700 transition-colors"
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                    setTitle('');
                    setContent('');
                  }}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                  className="dark:text-stone-500 text-stone-400 hover:dark:text-stone-300 hover:text-stone-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (title || content) onSave({ title, content });
                    setTitle('');
                    setContent('');
                    setIsExpanded(false);
                  }}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    padding: '8px 24px',
                    borderRadius: '12px',
                    background: isDark ? '#92400e' : '#78350f',
                    color: '#fef3c7',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:opacity-90 active:scale-95"
                >
                  Save note
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}