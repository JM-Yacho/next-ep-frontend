const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || new Error('BACKEND_URL is required for the application to run!');
const API_KEY = import.meta.env.VITE_API_KEY || new Error('API_KEY is required for the application to run!');
  
// Fetch data and return either the data or an empty array
export async function fetchWatchListNextEps(profileName: string) {
    try {
        const res = await fetch(`${BACKEND_BASE_URL}/watchListNextEps/${profileName}`, {
            headers: {
                    'x-api-key': API_KEY
            }
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }        
};