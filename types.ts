
export interface Settings {
  monthlySalary: number;
  workingDaysPerMonth: number;
  workHoursPerDay: number;
  capDailyToStandardHours: boolean;
}

export interface AttendanceRecord {
  id: number; // Using timestamp as ID
  dateMillisUTC: number;
  entryTimeMillis: number;
  exitTimeMillis: number | null;
  minutesWorked: number;
  dailyEarning: number;
}
