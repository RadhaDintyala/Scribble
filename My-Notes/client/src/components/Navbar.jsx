import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Moon, Sun, Mic } from 'lucide-react';

export default function Navbar({ user, setUser, darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-3 border-b border-white/40 dark:border-white/10 bg-white/70 dark:bg-[#202124]/70 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-darkCard rounded-full transition-colors">
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-yellow-400 p-1.5 rounded-md">
            <Mic size={20} className="text-white" />
          </div>
          <span className="text-xl font-medium hidden sm:block">Voice Keep</span>
        </Link>
      </div>

      {user && (
        <div className="flex-1 max-w-2xl px-4 hidden md:block">
          <div className="flex items-center bg-gray-100 dark:bg-darkCard px-4 py-2.5 rounded-lg focus-within:shadow-md transition-shadow">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none w-full ml-3 text-gray-700 dark:text-gray-200"
            />
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-darkCard rounded-full transition-colors"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-medium text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-darkCard rounded-md transition-colors"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-2">
            <Link to="/login" className="px-4 py-2 font-medium text-sm hover:bg-gray-100 dark:hover:bg-darkCard rounded-md transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 font-medium text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
