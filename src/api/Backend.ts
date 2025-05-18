const { VITE_BACKEND_BASE_URL, VITE_API_KEY } = import.meta.env;
if (!VITE_BACKEND_BASE_URL || !VITE_API_KEY) {
  throw new Error('Missing required environment variables!');
}
  
// Fetch data and return either the data or an empty array
export async function fetchWatchListNextEps(profileName: string) {
    try {
        const res = await fetch(`${VITE_BACKEND_BASE_URL}/watchListNextEps/${profileName}`, {
            headers: {
                    'x-api-key': VITE_API_KEY
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