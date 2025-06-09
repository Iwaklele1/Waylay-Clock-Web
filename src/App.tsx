import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CurrentTime from './pages/CurrentTime';
import Alarm from './pages/Alarm';
import Stopwatch from './pages/Stopwatch';
import Timer from './pages/Timer';
import './index.css'

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to="/current-time" replace />} />
          <Route path="/current-time" element={<CurrentTime />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App
