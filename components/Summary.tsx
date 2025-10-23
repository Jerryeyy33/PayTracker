
import React from 'react';

interface SummaryProps {
    rates: {
        perHour: number;
        perMinute: number;
    };
    monthlyTotal: number;
}

export const Summary: React.FC<SummaryProps> = ({ rates, monthlyTotal }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md space-y-4">
            <div>
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Calculated Rates</h3>
                <div className="flex justify-between items-baseline mt-2">
                    <span className="text-slate-500 dark:text-slate-400">Per Hour:</span>
                    <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        ₹{rates.perHour.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between items-baseline">
                    <span className="text-slate-500 dark:text-slate-400">Per Minute:</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        ₹{rates.perMinute.toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                 <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Total This Month</h3>
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
                    ₹{monthlyTotal.toFixed(2)}
                </p>
            </div>
        </div>
    );
};
