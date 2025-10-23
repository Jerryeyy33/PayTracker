
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-slate-800 mt-8 py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>&copy; {new Date().getFullYear()} PayTracker. Built with React & Tailwind CSS.</p>
            </div>
        </footer>
    );
};
