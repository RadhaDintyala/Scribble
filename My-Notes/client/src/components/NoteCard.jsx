import React from 'react';
import { Pin, Trash2, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NoteCard({ note, onDelete, onUpdate }) {
  // Using a fallback for isDark to avoid errors if the body class isn't set yet
  const isDark = document.body.classList.contains('dark');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ 
        y: -4, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      className="group relative rounded-2xl border border-white/40 dark:border-white/10 overflow-hidden transition-all duration-300 masonry-item flex flex-col backdrop-blur-md"
      style={{ 
        backgroundColor: isDark 
          ? (note.color === '#ffffff' ? 'rgba(45, 46, 48, 0.6)' : note.color) 
          : (note.color === '#ffffff' ? 'rgba(255, 255, 255, 0.6)' : note.color) 
      }}
    >
      {/* Content Section */}
      <div className="p-4 flex-1">
        {note.title && (
          <h3 className="font-medium text-lg mb-2 text-gray-900 dark:text-white pr-8">
            {note.title}
          </h3>
        )}
        {note.content && (
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">
            {note.content}
          </p>
        )}
        {note.audioUrl && (
          <div className="mt-3">
            <audio controls src={note.audioUrl} className="w-full h-8" />
          </div>
        )}
      </div>

      {/* Pin Button (Top Right) */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onUpdate(note._id, { isPinned: !note.isPinned })}
          className={`p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
            note.isPinned ? 'opacity-100 bg-black/5 dark:bg-white/5' : ''
          }`}
        >
          <Pin 
            size={18} 
            className={`${note.isPinned ? "fill-current text-scribblePink" : "text-gray-500"}`} 
          />
        </button>
      </div>

      {/* Action Toolbar (Bottom) */}
      <div className="px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
        <button
          onClick={() => onDelete(note._id)}
          className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
          title="Delete Note"
        >
          <Trash2 size={16} />
        </button>
        
        {/* Added a Palette icon placeholder since you imported it */}
        <button
          className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-scribbleBlue hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
          title="Change Color"
        >
          <Palette size={16} />
        </button>
      </div>
    </motion.div>
  );
}