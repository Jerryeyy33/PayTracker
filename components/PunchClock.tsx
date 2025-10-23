
import React, { useState, useEffect } from 'react';

interface PunchClockProps {
  onPunchIn: () => void;
  onPunchOut: () => void;
  punchInTime: number | null;
}

export const PunchClock: React.FC<PunchClockProps> = ({ onPunchIn, onPunchOut, punchInTime }) => {
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    let interval: number | undefined;
    if (punchInTime) {
      interval = window.setInterval(() => {
        const now = Date.now();
        const diff = now - punchInTime;
        const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    } else {
      setElapsedTime('00:00:00');
    }

    return () => clearInterval(interval);
  }, [punchInTime]);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-200">Time Clock</h2>
      {punchInTime && (
        <div className="text-center mb-4 p-3 bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-md">
          <p className="text-sm text-green-700 dark:text-green-300">Punched in at {new Date(punchInTime).toLocaleTimeString()}</p>
          <p className="text-2xl font-mono font-bold text-green-800 dark:text-green-200">{elapsedTime}</p>
        </div>
      )}
      <div className="flex space-x-4">
        <button
          onClick={onPunchIn}
          disabled={!!punchInTime}
          className="flex-1 bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Punch In
        </button>
        <button
          onClick={onPunchOut}
          disabled={!punchInTime}
          className="flex-1 bg-red-500 text-white font-bold py-3 px-4 rounded-md hover:bg-red-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Punch Out
        </button>
      </div>
    </div>
  );
};
