import React from 'react';
import { Pin, Trash2, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NoteCard({ note, onDelete, onUpdate }) {
  const isDark = document.documentElement.classList.contains('dark');

  const cardStyle = {
    backdropFilter: 'blur(14px) saturate(140%)',
    WebkitBackdropFilter: 'blur(14px) saturate(140%)',
    background:
      note.color && note.color !== '#ffffff'
        ? isDark
          ? `${note.color}28`
          : `${note.color}44`
        : isDark
        ? 'rgba(28, 22, 14, 0.65)'
        : 'rgba(255, 251, 243, 0.75)',
    border: isDark
      ? '1px solid rgba(255,255,255,0.08)'
      : '1px solid rgba(120, 80, 40, 0.12)',
    borderRadius: '20px',
    boxShadow: isDark
      ? '0 4px 24px rgba(0,0,0,0.3)'
      : '0 4px 24px rgba(80,40,10,0.07)',
    padding: '20px 22px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      whileHover={{ y: -4, boxShadow: isDark
        ? '0 10px 40px rgba(0,0,0,0.4)'
        : '0 10px 40px rgba(80,40,10,0.13)' }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      style={cardStyle}
    >
      {/* Pinned accent */}
      {note.isPinned && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '3px',
            height: '100%',
            background: isDark ? '#b45309' : '#92400e',
            borderRadius: '20px 0 0 20px',
            opacity: 0.8,
          }}
        />
      )}

      {/* Pin button */}
      <button
        onClick={() => onUpdate(note._id, { isPinned: !note.isPinned })}
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          padding: '5px',
          borderRadius: '8px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          opacity: note.isPinned ? 1 : 0,
        }}
        className="group-hover:!opacity-100"
      >
        <Pin
          size={15}
          className={
            note.isPinned
              ? 'fill-amber-700 text-amber-700 dark:fill-amber-500 dark:text-amber-500'
              : 'text-stone-400 dark:text-stone-600'
          }
        />
      </button>

      {/* Content */}
      <div style={{ paddingRight: '24px' }}>
        {note.title && (
          <h3
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '-0.01em',
              marginBottom: '6px',
            }}
            className="dark:text-stone-100 text-stone-800"
          >
            {note.title}
          </h3>
        )}
        {note.content && (
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.875rem',
              lineHeight: '1.65',
              whiteSpace: 'pre-wrap',
            }}
            className="dark:text-stone-400 text-stone-600"
          >
            {note.content}
          </p>
        )}
      </div>

      {/* Footer actions */}
      <div
        style={{
          marginTop: '12px',
          display: 'flex',
          gap: '4px',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
        className="group-hover:!opacity-100"
      >
        <button
          onClick={() => onDelete(note._id)}
          style={{
            padding: '5px 7px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          className="dark:text-stone-600 text-stone-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 size={14} />
        </button>
        <button
          style={{
            padding: '5px 7px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          className="dark:text-stone-600 text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
        >
          <Palette size={14} />
        </button>
      </div>
    </motion.div>
  );
}