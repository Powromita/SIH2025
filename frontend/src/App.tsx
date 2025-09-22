import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TrackProgress from './pages/TrackProgress'; // Assuming this exists or will be added

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <header className="w-full bg-white shadow-md p-4 flex justify-center">
          <div className="flex items-center space-x-4">
            <img src={logo} className="h-12" alt="Pulse City Assist Logo" />
            <h1 className="text-2xl font-bold text-gray-800">Pulse City Assist</h1>
          </div>
        </header>
        <nav className="mt-6 space-x-4">
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login</Link>
          <span className="text-gray-300">|</span>
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">Signup</Link>
          <span className="text-gray-300">|</span>
          <Link to="/track" className="text-blue-600 hover:text-blue-800 font-medium">Track</Link>
        </nav>
        <main className="flex-grow flex items-center justify-center w-full p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/track" element={<TrackProgress />} />
            <Route path="/" element={<p className="text-center text-gray-600">Home - Navigate to Login, Signup, or Track</p>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;