import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react'


const timezones = [
  { value: 'local', label: 'Local Timezone' },
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'New York (Eastern Time)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Asia/Jakarta', label: 'Jakarta (WIB)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
];

const CurrentTime = () => {
  const [timezone, setTimezone] = useState('local');
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const formatted = timezone === 'local'
          ? now.toLocaleTimeString()
          : now.toLocaleTimeString('en-US', { timeZone: timezone });
        setTime(formatted);
      } catch {
        setTime('Invalid timezone');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <section className="page current-time-page">
      <h1 className="page-title">
        <Clock size={32} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
        Current Time
      </h1>
      <p>Select a location/timezone to see the current time.</p>

      <div className="time-display" aria-live="polite">{time}</div>

      <label htmlFor="timezone-select" className="label">Select Timezone:</label><br />
      <select
        id="timezone-select"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        className="select"
      >
        {timezones.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>
    </section>
  )
}

export default CurrentTime