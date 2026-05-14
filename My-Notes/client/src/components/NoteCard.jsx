import React from 'react';
import { Pin, Trash2, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NoteCard({ note, onDelete, onUpdate }) {
  const isDark = document.documentElement.classList.contains('dark');

  const cardStyle = {
    // ── Glassmorphism base ──
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    background:
      note.color && note.color !== '#ffffff'
        ? isDark
          ? `${note.color}28`
          : `${note.color}55`
        : isDark
        ? 'rgba(28, 22, 14, 0.65)'
        : 'rgba(255, 252, 245, 0.72)',

    // ── Claymorphism: border + layered puffy shadow ──
    border: isDark
      ? '1.5px solid rgba(255,255,255,0.10)'
      : '1.5px solid rgba(255,255,255,0.75)',
    borderRadius: '24px',
    boxShadow: isDark
      ? `0 2px 0 1px rgba(255,255,255,0.07) inset,
         0 -1px 0 1px rgba(0,0,0,0.25) inset,
         0 8px 32px rgba(0,0,0,0.38),
         0 2px 8px rgba(0,0,0,0.22)`
      : `0 2px 0 1px rgba(255,255,255,0.60) inset,
         0 -1px 0 1px rgba(0,0,0,0.06) inset,
         0 8px 32px rgba(80,40,10,0.13),
         0 2px 8px rgba(80,40,10,0.09)`,

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
      whileHover={{
        y: -5,
        scale: 1.015,
        boxShadow: isDark
          ? `0 2px 0 1px rgba(255,255,255,0.09) inset,
             0 -1px 0 1px rgba(0,0,0,0.30) inset,
             0 20px 60px rgba(0,0,0,0.50),
             0 6px 20px rgba(0,0,0,0.28)`
          : `0 2px 0 1px rgba(255,255,255,0.70) inset,
             0 -1px 0 1px rgba(0,0,0,0.07) inset,
             0 20px 60px rgba(80,40,10,0.18),
             0 6px 20px rgba(80,40,10,0.12)`,
      }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      style={cardStyle}
    >
      {/* ── Clay glossy sheen (top highlight stripe) ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '40%',
          background: isDark
            ? 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)',
          borderRadius: '0 0 60% 60%',
          pointerEvents: 'none',
        }}
      />

      {/* Pinned accent — unchanged logic */}
      {note.isPinned && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: isDark
              ? 'linear-gradient(180deg, #f59e0b, #b45309)'
              : 'linear-gradient(180deg, #fbbf24, #92400e)',
            borderRadius: '24px 0 0 24px',
            opacity: 0.85,
          }}
        />
      )}

      {/* Pin button — unchanged logic */}
      <button
        onClick={() => onUpdate(note._id, { isPinned: !note.isPinned })}
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          padding: '6px',
          borderRadius: '10px',
          background: isDark
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(255,255,255,0.55)',
          border: isDark
            ? '1px solid rgba(255,255,255,0.09)'
            : '1px solid rgba(255,255,255,0.75)',
          boxShadow: isDark
            ? '0 1px 4px rgba(0,0,0,0.25)'
            : '0 1px 4px rgba(80,40,10,0.10)',
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

      {/* Content — completely unchanged */}
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

      {/* Footer actions — unchanged logic, clay-styled buttons */}
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
            padding: '5px 9px',
            borderRadius: '10px',
            border: isDark
              ? '1px solid rgba(255,255,255,0.07)'
              : '1px solid rgba(255,255,255,0.65)',
            background: isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0.50)',
            boxShadow: isDark
              ? '0 1px 4px rgba(0,0,0,0.2)'
              : '0 1px 4px rgba(80,40,10,0.08)',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          className="dark:text-stone-600 text-stone-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 size={14} />
        </button>
        <button
          style={{
            padding: '5px 9px',
            borderRadius: '10px',
            border: isDark
              ? '1px solid rgba(255,255,255,0.07)'
              : '1px solid rgba(255,255,255,0.65)',
            background: isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0.50)',
            boxShadow: isDark
              ? '0 1px 4px rgba(0,0,0,0.2)'
              : '0 1px 4px rgba(80,40,10,0.08)',
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