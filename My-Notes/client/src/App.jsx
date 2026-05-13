import Home from './pages/Home';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('dark');
    }
  }, []);

  const handleSetDarkMode = (val) => {
    setDarkMode(val);
    localStorage.setItem('darkMode', val);
    if (val) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar darkMode={darkMode} setDarkMode={handleSetDarkMode} />
      <Home />
    </div>
  );
}

export default App;
