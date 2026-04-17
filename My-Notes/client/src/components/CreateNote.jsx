import { useState } from 'react';
import { Mic, Image as ImageIcon, Square, CheckSquare, Palette, MoreVertical } from 'lucide-react';
import axios from 'axios';
import VoiceRecorder from './VoiceRecorder';

export default function CreateNote({ onNoteCreated }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [showPalette, setShowPalette] = useState(false);

  const colors = ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'];

  const handleSave = async () => {
    if (!title.trim() && !content.trim() && !audioUrl) {
      setIsExpanded(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/notes`, {
        title, content, color, audioUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onNoteCreated(res.data);
      setTitle('');
      setContent('');
      setAudioUrl('');
      setColor('#ffffff');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error saving note', error);
    }
  };

  const handleAudioRecord = (base64Audio) => {
    setAudioUrl(base64Audio);
  };

  const handleTranscript = (text) => {
    if(text) {
      setContent(prev => prev ? prev + ' ' + text : text);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 relative">
      <div 
        className="bg-white/70 dark:bg-[#202124]/70 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 dark:border-white/10 overflow-visible transition-all duration-300"
        style={{ backgroundColor: document.body.classList.contains('dark') ? (color === '#ffffff' ? 'rgba(45, 46, 48, 0.7)' : color) : (color === '#ffffff' ? 'rgba(255, 255, 255, 0.7)' : color) }}
      >
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 pt-4 pb-2 text-lg font-medium bg-transparent outline-none dark:text-white placeholder-gray-500"
          />
        )}
        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={() => setIsExpanded(true)}
          className={`w-full px-4 bg-transparent outline-none dark:text-white placeholder-gray-500 resize-none ${isExpanded ? 'min-h-[100px] py-2' : 'py-3'}`}
          rows={isExpanded ? 3 : 1}
        />

        {audioUrl && (
          <div className="px-4 py-2">
            <audio controls src={audioUrl} className="w-full h-8" />
          </div>
        )}

        {isExpanded && (
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-1 relative">
              <VoiceRecorder onRecord={handleAudioRecord} onTranscript={handleTranscript} />
              
              <div className="relative">
                <button 
                  onClick={() => setShowPalette(!showPalette)}
                  className="p-2 text-gray-500 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <Palette size={18} />
                </button>
                
                {showPalette && (
                  <div className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-darkCard rounded-lg shadow-lg border dark:border-darkBorder flex flex-wrap gap-1 w-32 z-50">
                    {colors.map(c => (
                      <button
                        key={c}
                        onClick={() => { setColor(c); setShowPalette(false); }}
                        className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={handleSave}
              className="px-6 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors dark:text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
