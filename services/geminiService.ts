
import { GoogleGenAI } from "@google/genai";
import type { AttendanceRecord } from '../types';

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
    // In a real app, you might want to handle this more gracefully.
    // For this example, we assume it's set.
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Fetches a short, motivational quote for a worker from the Gemini API.
 * @returns A promise that resolves to the motivational quote string.
 */
export async function getMotivationalQuote(): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Generate one short, encouraging, and motivational quote for someone at work. Make it concise and impactful. No intro or extra text, just the quote.',
            config: {
                temperature: 0.9,
                maxOutputTokens: 50,
            }
        });
        
        const text = response.text.trim().replace(/^"|"$/g, ''); // Clean up the response
        return text || "Keep up the great work!"; // Fallback quote
    } catch (error) {
        console.error("Error fetching motivational quote:", error);
        // Provide a meaningful fallback error message or a default quote
        throw new Error("Could not fetch a quote from the AI service.");
    }
}

/**
 * Generates work analytics and insights based on attendance records.
 * @param records - An array of attendance records for the month.
 * @returns A promise that resolves to a string with work insights.
 */
export async function getWorkAnalytics(records: AttendanceRecord[]): Promise<string> {
    if (records.length === 0) {
        return "Not enough data to analyze. Punch in and out for a few days to get your first insight!";
    }

    // Summarize data to create a concise prompt
    const totalDaysWorked = records.length;
    const totalMinutesWorked = records.reduce((sum, rec) => sum + rec.minutesWorked, 0);
    const totalEarnings = records.reduce((sum, rec) => sum + rec.dailyEarning, 0);
    const averageHoursPerDay = (totalMinutesWorked / totalDaysWorked / 60).toFixed(1);

    const prompt = `
        You are a friendly and encouraging productivity coach. Analyze the following work data for a user for the current month and provide brief, actionable insights.

        Data Summary:
        - Total Days Worked: ${totalDaysWorked}
        - Total Hours Worked: ${(totalMinutesWorked / 60).toFixed(1)}
        - Average Hours per Day: ${averageHoursPerDay}
        - Total Earnings: ₹${totalEarnings.toFixed(2)}

        Based on this data, provide 2-3 bullet points of encouragement and advice. Focus on consistency, potential burnout if hours are too high, or celebrating achievements. Keep the tone positive. Do not include any intro or sign-off, just the bullet points. For example:
        - Great job on your consistent work schedule!
        - Your earnings are on a great track this month.
        - Remember to take short breaks to stay refreshed.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.7,
                maxOutputTokens: 200,
            }
        });
        
        const text = response.text.trim();
        return text || "Could not generate insights at the moment. Please try again.";
    } catch (error) {
        console.error("Error fetching work analytics:", error);
        throw new Error("Could not fetch analytics from the AI service.");
    }
}
