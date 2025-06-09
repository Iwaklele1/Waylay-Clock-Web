import { useEffect, useRef, useState } from 'react';
import { Timer as IconTimer } from 'lucide-react';

const presets = [
  { label: '1m', seconds: 60 },
  { label: '5m', seconds: 300 },
  { label: '10m', seconds: 600 },
];

const Timer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePreset = (s: number) => {
    setTotalSeconds(s);
    setRemaining(s);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleStart = () => {
    if (remaining <= 0) return;
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRemaining(totalSeconds);
  };

  const handleInput = (min: string, sec: string) => {
    const m = parseInt(min || '0');
    const s = parseInt(sec || '0');
    const total = m * 60 + s;
    setTotalSeconds(total);
    setRemaining(total);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (remaining % 60).toString().padStart(2, '0');

  return (
    <section className="page timer-page">
      <h1 className="page-title">
        <IconTimer size={28} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
        Timer
      </h1>
      <p>Set a countdown timer or use presets.</p>

      <div className="timer-presets">
        {presets.map((p, idx) => (
          <button key={idx} onClick={() => handlePreset(p.seconds)}>{p.label}</button>
        ))}
      </div>

      <div className="manual-inputs">
        <label>
          Minutes: <input type="number" min="0" onChange={(e) => handleInput(e.target.value, (document.getElementById('sec') as HTMLInputElement)?.value || '0')} />
        </label>
        <label>
          Seconds: <input id="sec" type="number" min="0" max="59" onChange={(e) => handleInput((document.getElementById('min') as HTMLInputElement)?.value || '0', e.target.value)} />
        </label>
      </div>

      <div className="timer-display" aria-live="polite">{minutes}:{seconds}</div>

      <div className="controls">
        <button onClick={handleStart} disabled={running || remaining === 0}>Start</button>
        <button onClick={handleStop} disabled={!running}>Stop</button>
        <button onClick={handleReset} disabled={remaining === totalSeconds}>Reset</button>
      </div>
    </section>
  );
}

export default Timer