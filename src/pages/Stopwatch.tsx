import { useEffect, useRef, useState } from "react";
import { TimerReset } from "lucide-react";

const presets = [
  { label: "30s", duration: 30_000 },
  { label: "1m", duration: 60_000 },
  { label: "5m", duration: 300_000 },
];

const Stopwatch = () => {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (running) {
      const start = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - start);
      }, 31);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    const milliseconds = ms % 1000;

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0") +
      "." +
      String(milliseconds).padStart(3, "0")
    );
  };

  const handlePreset = (duration: number) => {
    setElapsed(0);
    setRunning(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const diff = Date.now() - start;
      setElapsed(diff);
    }, 31);
    timeoutRef.current = setTimeout(() => {
      setRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, duration);
  };

  const handleStart = () => setRunning(true);
  const handleStop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
  const handleReset = () => setElapsed(0);

  return (
    <section className="page stopwatch-page">
      <h1 className="page-title">
        <TimerReset
          size={28}
          style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
        />
        Stopwatch
      </h1>
      <p>Start, stop, and reset the stopwatch, or use preset durations.</p>

      <div className="stopwatch-presets">
        {presets.map((preset, idx) => (
          <button key={idx} onClick={() => handlePreset(preset.duration)}>
            {preset.label}
          </button>
        ))}
      </div>

      <div className="timer-display" aria-live="polite">
        {formatTime(elapsed)}
      </div>

      <div className="controls">
        <button onClick={handleStart} disabled={running}>
          Start
        </button>
        <button onClick={handleStop} disabled={!running}>
          Stop
        </button>
        <button onClick={handleReset} disabled={elapsed === 0}>
          Reset
        </button>
      </div>
    </section>
  );
};

export default Stopwatch;
