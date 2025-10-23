
import type { Settings, AttendanceRecord } from '../types';

/**
 * Calculates per-hour and per-minute rates based on settings.
 */
export const calculateRates = (settings: Settings) => {
  if (settings.workingDaysPerMonth <= 0 || settings.workHoursPerDay <= 0) {
    return { perHour: 0, perMinute: 0 };
  }
  const perHour = settings.monthlySalary / (settings.workingDaysPerMonth * settings.workHoursPerDay);
  const perMinute = perHour / 60;
  return { perHour, perMinute };
};

/**
 * Calculates the earning for a given number of minutes worked.
 */
export const calculateDailyEarning = (
  minutesWorked: number,
  perMinuteRate: number,
  capHours: boolean,
  standardHours: number
) => {
  const standardMinutes = standardHours * 60;
  const minutesToCalculate = capHours ? Math.min(minutesWorked, standardMinutes) : minutesWorked;
  return minutesToCalculate * perMinuteRate;
};

/**
 * Calculates the total earnings for the current month from attendance records.
 */
export const calculateMonthlyTotal = (records: AttendanceRecord[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return records
    .filter(record => {
      const recordDate = new Date(record.dateMillisUTC);
      return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
    })
    .reduce((total, record) => total + record.dailyEarning, 0);
};
