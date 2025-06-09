import { Clock, AlarmClock, TimerReset, Timer } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <div className="logo">Waylay</div>
        <ul className="nav-list">
          <li>
            <NavLink to="/current-time" className="nav-btn">
              <Clock size={16} /> Current Time
            </NavLink>
          </li>
          <li>
            <NavLink to="/alarm" className="nav-btn">
              <AlarmClock size={16} /> Alarm
            </NavLink>
          </li>
          <li>
            <NavLink to="/stopwatch" className="nav-btn">
              <TimerReset size={16} /> Stopwatch
            </NavLink>
          </li>
          <li>
            <NavLink to="/timer" className="nav-btn">
              <Timer size={16} /> Timer
            </NavLink>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  )
}

export default Navbar