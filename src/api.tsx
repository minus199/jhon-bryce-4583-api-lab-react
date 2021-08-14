import RecentSearch from "./data/RecentSearch";

// this file contains everything we need to communicate with server

export const baseURL = "http://localhost:8899/api/v2" // It's good practice to store the start of the api url in a variable so we can change it easily later on(no hard coding!)

// mock data - imagine we loaded it with the dates from local storage or the server.
export const fetchRecentSearches = async () => ["learn", "person", "disc", "act", "run", "object"]
    .map(s => new RecentSearch(s, new Date()));

export const fetchLangs = () => fetch(`${baseURL}/langs`)
    .then(res => res.json())

const validateSearchResponse = async (res: Response) => {
    const payload = await res.json();
    if (!res.ok || "message" in payload) { //The dictionary api sends a different json schema when error happens. But none 200 status code can also happen.
        throw payload // payload is already an object, so we use it as an exception. We could have defined a specific type for this excpeption, which would have been even better.
    }
    return payload
}

export const searchWordInDictionary = (langCode: string, word: string) =>
    fetch(`${baseURL}/entries/${langCode}/${word}`)
        .then(validateSearchResponse)