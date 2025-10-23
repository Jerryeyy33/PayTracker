
import React, { useState, useCallback } from 'react';
import { getWorkAnalytics } from '../services/geminiService';
import type { AttendanceRecord } from '../types';

interface WorkAnalyticsProps {
  attendanceRecords: AttendanceRecord[];
}

export const WorkAnalytics: React.FC<WorkAnalyticsProps> = ({ attendanceRecords }) => {
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalysis = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setAnalysis('');
        try {
            const newAnalysis = await getWorkAnalytics(attendanceRecords);
            setAnalysis(newAnalysis);
        } catch (err) {
            setError('Failed to fetch analysis. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [attendanceRecords]);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-200">Your Work Insights</h2>
            {isLoading && (
                 <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                 </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {analysis && (
                <div className="border-l-4 border-indigo-500 pl-4 text-slate-600 dark:text-slate-300 space-y-2">
                    {analysis.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            )}
            <button
                onClick={fetchAnalysis}
                disabled={isLoading}
                className="mt-4 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50"
            >
                {isLoading ? 'Analyzing...' : 'Analyze My Month'}
            </button>
        </div>
    );
};
