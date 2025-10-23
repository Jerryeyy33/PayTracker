
import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Settings, AttendanceRecord } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { calculateRates, calculateDailyEarning, calculateMonthlyTotal } from '../utils/calculations';

const DEFAULT_SETTINGS: Settings = {
  monthlySalary: 30000,
  workingDaysPerMonth: 26,
  workHoursPerDay: 8,
  capDailyToStandardHours: true,
};

export const usePayTracker = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('paytracker-settings', DEFAULT_SETTINGS);
  const [attendance, setAttendance] = useLocalStorage<AttendanceRecord[]>('paytracker-attendance', []);
  const [punchInTime, setPunchInTime] = useLocalStorage<number | null>('paytracker-punchintime', null);

  const rates = useMemo(() => calculateRates(settings), [settings]);
  
  const monthlyTotal = useMemo(() => calculateMonthlyTotal(attendance), [attendance]);

  const saveSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
  }, [setSettings]);

  const punchIn = useCallback(() => {
    if (!punchInTime) {
      setPunchInTime(Date.now());
    }
  }, [punchInTime, setPunchInTime]);

  const punchOut = useCallback(() => {
    if (punchInTime) {
      const exitTime = Date.now();
      const minutesWorked = Math.round((exitTime - punchInTime) / 60000);
      
      const dailyEarning = calculateDailyEarning(
        minutesWorked, 
        calculateRates(settings).perMinute, 
        settings.capDailyToStandardHours,
        settings.workHoursPerDay
      );
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const newRecord: AttendanceRecord = {
        id: exitTime,
        dateMillisUTC: today.getTime(),
        entryTimeMillis: punchInTime,
        exitTimeMillis: exitTime,
        minutesWorked,
        dailyEarning,
      };
      
      // Check if there is already a record for today
      const todayRecordIndex = attendance.findIndex(record => {
          const recordDate = new Date(record.dateMillisUTC);
          recordDate.setHours(0,0,0,0);
          return recordDate.getTime() === today.getTime();
      });

      if(todayRecordIndex > -1) {
          // Update today's record
          setAttendance(prev => {
              const updated = [...prev];
              const existingRecord = updated[todayRecordIndex];
              const combinedMinutes = existingRecord.minutesWorked + newRecord.minutesWorked;
              const combinedEarning = calculateDailyEarning(
                  combinedMinutes,
                  rates.perMinute,
                  settings.capDailyToStandardHours,
                  settings.workHoursPerDay
              );

              updated[todayRecordIndex] = {
                  ...existingRecord,
                  exitTimeMillis: newRecord.exitTimeMillis, // latest punch out
                  minutesWorked: combinedMinutes,
                  dailyEarning: combinedEarning
              };
              return updated;
          });
      } else {
          // Add new record for today
          setAttendance(prev => [...prev, newRecord]);
      }

      setPunchInTime(null);
    }
  }, [punchInTime, settings, setAttendance, setPunchInTime, attendance, rates.perMinute]);
  
  return {
    settings,
    saveSettings,
    attendance,
    punchIn,
    punchOut,
    punchInTime,
    rates,
    monthlyTotal,
  };
};
