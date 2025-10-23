
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white dark:bg-slate-800 shadow-md">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    PayTracker <span role="img" aria-label="wave">👋</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Your daily work & earnings log</p>
            </div>
        </header>
    );
};
