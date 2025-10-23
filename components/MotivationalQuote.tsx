
import React, { useState, useCallback } from 'react';
import { getMotivationalQuote } from '../services/geminiService';

export const MotivationalQuote: React.FC = () => {
    const [quote, setQuote] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchQuote = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setQuote('');
        try {
            const newQuote = await getMotivationalQuote();
            setQuote(newQuote);
        } catch (err) {
            setError('Failed to fetch a quote. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-200">Need a Boost?</h2>
            {isLoading && (
                 <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                 </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {quote && (
                <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 dark:text-slate-300">
                    <p>"{quote}"</p>
                </blockquote>
            )}
            <button
                onClick={fetchQuote}
                disabled={isLoading}
                className="mt-4 w-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-bold py-2 px-4 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors duration-200 disabled:opacity-50"
            >
                {isLoading ? 'Thinking...' : 'Get Motivated'}
            </button>
        </div>
    );
};
