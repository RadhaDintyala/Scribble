import { Link } from 'react-router-dom';
import { Moon, Sun, PenLine, Menu, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import AuthModal from './AuthModal';

export default function Navbar({ darkMode, setDarkMode, token, setToken }) {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.75)' }
    );
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setMenuOpen(false);
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <div ref={navRef} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl flex justify-between items-center px-6 py-4 rounded-3xl" style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        background: darkMode ? 'rgba(28, 22, 14, 0.65)' : 'rgba(255, 252, 245, 0.72)',
        border: darkMode ? '1.5px solid rgba(255, 255, 255, 0.10)' : '1.5px solid rgba(255, 255, 255, 0.75)',
        boxShadow: darkMode
          ? '0 2px 0 1px rgba(255,255,255,0.07) inset, 0 -1px 0 1px rgba(0,0,0,0.25) inset, 0 8px 32px rgba(0,0,0,0.38), 0 2px 8px rgba(0,0,0,0.22)'
          : '0 2px 0 1px rgba(255,255,255,0.60) inset, 0 -1px 0 1px rgba(0,0,0,0.06) inset, 0 8px 32px rgba(80,40,10,0.13), 0 2px 8px rgba(80,40,10,0.09)'
      }}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl transition-transform group-hover:scale-110"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)',
              boxShadow: darkMode ? 'inset 0 1px 0 rgba(255,255,255,0.2)' : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 5px rgba(0,0,0,0.05)',
            }}
          >
            <PenLine size={20} className={darkMode ? 'text-amber-300' : 'text-amber-600'} />
          </div>
          <span
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
            className={darkMode ? 'text-white' : 'text-stone-800'}
          >
            Scribble
          </span>
        </Link>

        <div className="flex items-center gap-3 relative">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative overflow-hidden w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
              border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.8)',
              boxShadow: darkMode ? 'inset 0 1px 0 rgba(255,255,255,0.1)' : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 5px rgba(0,0,0,0.05)',
            }}
          >
            {darkMode ? (
              <Sun size={20} className="text-amber-300" />
            ) : (
              <Moon size={20} className="text-amber-700" />
            )}
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative overflow-hidden w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
              border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.8)',
              boxShadow: darkMode ? 'inset 0 1px 0 rgba(255,255,255,0.1)' : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 5px rgba(0,0,0,0.05)',
            }}
          >
            <Menu size={20} className={darkMode ? 'text-amber-300' : 'text-amber-700'} />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-14 right-0 mt-2 w-48 rounded-xl shadow-lg py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 overflow-hidden">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => openAuth('login')}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                  >
                    <LogIn size={18} /> Login
                  </button>
                  <button
                    onClick={() => openAuth('signup')}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors border-t border-stone-100 dark:border-stone-700"
                  >
                    <UserPlus size={18} /> Sign Up
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        setToken={setToken}
      />
    </>
  );
}