
import React from 'react';
import type { AttendanceRecord } from '../types';

interface AttendanceTableProps {
  attendanceRecords: AttendanceRecord[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ attendanceRecords }) => {

  const formatTime = (millis: number | null) => {
    if (millis === null) return 'N/A';
    return new Date(millis).toLocaleTimeString();
  };

  const formatHoursWorked = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-200">This Month's Log</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
            <tr>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Punch In</th>
              <th scope="col" className="px-6 py-3">Punch Out</th>
              <th scope="col" className="px-6 py-3">Hours Worked</th>
              <th scope="col" className="px-6 py-3">Earning (₹)</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.length > 0 ? (
                [...attendanceRecords].sort((a,b) => b.dateMillisUTC - a.dateMillisUTC).map((record) => (
                <tr key={record.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/50">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                    {new Date(record.dateMillisUTC).toLocaleDateString()}
                  </th>
                  <td className="px-6 py-4">{formatTime(record.entryTimeMillis)}</td>
                  <td className="px-6 py-4">{formatTime(record.exitTimeMillis)}</td>
                  <td className="px-6 py-4">{formatHoursWorked(record.minutesWorked)}</td>
                  <td className="px-6 py-4 font-semibold text-green-600 dark:text-green-400">
                    {record.dailyEarning.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8 text-slate-500 dark:text-slate-400">
                  No records for this month yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
