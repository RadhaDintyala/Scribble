import Home from './pages/Home';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    }
  }, []);

  const handleSetDarkMode = (val) => {
    setDarkMode(val);
    localStorage.setItem('darkMode', val);
    if (val) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen relative z-0">
      <AnimatedBackground isDark={darkMode} />
      <Navbar darkMode={darkMode} setDarkMode={handleSetDarkMode} />
      <Home />
    </div>
  );
}

export default App;
