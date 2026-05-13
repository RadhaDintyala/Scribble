import { Link } from 'react-router-dom';
import { Moon, Sun, PenLine } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div
          style={{
            background: darkMode
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(30, 20, 10, 0.07)',
            border: darkMode
              ? '1px solid rgba(255,255,255,0.12)'
              : '1px solid rgba(30,20,10,0.12)',
            borderRadius: '14px',
            padding: '7px 9px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <PenLine
            size={18}
            className={darkMode ? 'text-amber-300' : 'text-amber-800'}
          />
        </div>
        <span
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
          className={darkMode ? 'text-white' : 'text-stone-800'}
        >
          Scribble
        </span>
      </Link>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          background: darkMode
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(30, 20, 10, 0.07)',
          border: darkMode
            ? '1px solid rgba(255,255,255,0.12)'
            : '1px solid rgba(30,20,10,0.12)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        className={
          darkMode
            ? 'text-amber-300 hover:bg-white/15'
            : 'text-amber-800 hover:bg-black/10'
        }
      >
        {darkMode ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    </div>
  );
}