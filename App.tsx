
import React from 'react';
import { SettingsForm } from './components/SettingsForm';
import { PunchClock } from './components/PunchClock';
import { AttendanceTable } from './components/AttendanceTable';
import { Summary } from './components/Summary';
import { MotivationalQuote } from './components/MotivationalQuote';
import { WorkAnalytics } from './components/WorkAnalytics';
import { usePayTracker } from './hooks/usePayTracker';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const {
    settings,
    saveSettings,
    attendance,
    punchIn,
    punchOut,
    punchInTime,
    rates,
    monthlyTotal,
  } = usePayTracker();

  const currentMonthAttendance = attendance.filter(record => {
    const recordDate = new Date(record.dateMillisUTC);
    const today = new Date();
    return recordDate.getFullYear() === today.getFullYear() && recordDate.getMonth() === today.getMonth();
  });

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <SettingsForm initialSettings={settings} onSave={saveSettings} />
            <PunchClock onPunchIn={punchIn} onPunchOut={punchOut} punchInTime={punchInTime} />
            <Summary rates={rates} monthlyTotal={monthlyTotal} />
            <WorkAnalytics attendanceRecords={currentMonthAttendance} />
            <MotivationalQuote />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <AttendanceTable attendanceRecords={currentMonthAttendance} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
