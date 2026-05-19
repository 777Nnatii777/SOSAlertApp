const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error(
        'Brak EXPO_PUBLIC_API_BASE_URL. Skopiuj .env.example do .env i ustaw adres API.',
    );
}

export { API_BASE_URL };