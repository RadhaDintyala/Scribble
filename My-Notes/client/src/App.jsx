import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
      <Navbar user={user} setUser={setUser} darkMode={darkMode} setDarkMode={handleSetDarkMode} />
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
