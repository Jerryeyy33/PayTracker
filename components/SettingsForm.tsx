
import React, { useState, useEffect } from 'react';
import type { Settings } from '../types';

interface SettingsFormProps {
  initialSettings: Settings;
  onSave: (settings: Settings) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialSettings, onSave }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
    // Add a visual feedback, e.g., a toast notification
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-200">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="monthlySalary" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Monthly Salary (₹)</label>
          <input
            type="number"
            id="monthlySalary"
            name="monthlySalary"
            value={settings.monthlySalary}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="workingDaysPerMonth" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Working Days per Month</label>
          <input
            type="number"
            id="workingDaysPerMonth"
            name="workingDaysPerMonth"
            value={settings.workingDaysPerMonth}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="1"
            max="31"
          />
        </div>
        <div>
          <label htmlFor="workHoursPerDay" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Standard Work Hours per Day</label>
          <input
            type="number"
            id="workHoursPerDay"
            name="workHoursPerDay"
            value={settings.workHoursPerDay}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="1"
            max="24"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="capDailyToStandardHours"
            name="capDailyToStandardHours"
            checked={settings.capDailyToStandardHours}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 rounded bg-slate-100 dark:bg-slate-700"
          />
          <label htmlFor="capDailyToStandardHours" className="ml-2 block text-sm text-slate-600 dark:text-slate-300">Cap daily earning to standard hours</label>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
          Save Settings
        </button>
      </form>
    </div>
  );
};
