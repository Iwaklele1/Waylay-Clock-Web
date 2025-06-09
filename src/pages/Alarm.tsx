import React from 'react'
import { useState } from 'react';
import { AlarmClock } from 'lucide-react';

interface Preset {
  time: string;
  label: string;
  repeat: string;
}

const presets: Preset[] = [
  { time: '07:00', label: 'Wake Up', repeat: 'daily' },
  { time: '12:00', label: 'Lunch Break', repeat: 'once' },
  { time: '18:00', label: 'Evening Exercise', repeat: 'weekdays' },
];

const Alarm = () => {
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmLabel, setAlarmLabel] = useState('');
  const [alarmRepeat, setAlarmRepeat] = useState('once');

  const handlePreset = (preset: Preset) => {
    setAlarmTime(preset.time);
    setAlarmLabel(preset.label);
    setAlarmRepeat(preset.repeat);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alarmTime) {
      alert('Please enter a valid alarm time.');
      return;
    }

    alert(`Alarm set for ${alarmTime}${alarmLabel ? ` (${alarmLabel})` : ''}. Repeat: ${alarmRepeat}`);
    setAlarmTime('');
    setAlarmLabel('');
    setAlarmRepeat('once');
  };

  return (
    <section className="page alarm-page">
      <h1 className="page-title">
        <AlarmClock size={28} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
        Alarm
      </h1>
      <p>Set a new alarm below or choose from presets.</p>

      <div className="alarm-presets">
        {presets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePreset(preset)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="alarm-form">
        <label htmlFor="alarm-time">Alarm Time</label>
        <input
          type="time"
          id="alarm-time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          required
        />

        <label htmlFor="alarm-label">Label (optional)</label>
        <input
          type="text"
          id="alarm-label"
          value={alarmLabel}
          onChange={(e) => setAlarmLabel(e.target.value)}
          placeholder="Wake up, Meeting, etc."
        />

        <label htmlFor="alarm-repeat">Repeat</label>
        <select
          id="alarm-repeat"
          value={alarmRepeat}
          onChange={(e) => setAlarmRepeat(e.target.value)}
        >
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekdays">Weekdays</option>
          <option value="weekends">Weekends</option>
        </select>

        <button type="submit">Set Alarm</button>
      </form>
    </section>
  );
}

export default Alarm