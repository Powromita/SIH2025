import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Pulse City Assist!!
          </p>
          <nav>
            <Link to="/login" className="App-link">Login</Link> |{' '}
            <Link to="/signup" className="App-link">Signup</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<p className="text-center">Home - Navigate to Login or Signup</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;