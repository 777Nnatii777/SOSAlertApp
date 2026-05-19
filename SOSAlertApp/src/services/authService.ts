import { API_BASE_URL } from '../config/api';
import type { LoginResponse } from '../types/auth';
import { tokenStorage } from './tokenStorage';

export async function login(
    email: string,
    password: string,
): Promise<LoginResponse> {
    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
            },
            body: JSON.stringify({ email, password }),
        });
    } catch {
        throw new Error(
            'Nie można połączyć się z serwerem. Sprawdź sieć i adres API.',
        );
    }

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Nieprawidłowy login lub hasło');
        }
        throw new Error(`Błąd serwera (${response.status})`);
    }

    const data: LoginResponse = await response.json();

    if (!data.succeeded || !data.token) {
        throw new Error(data.message || 'Logowanie nie powiodło się');
    }

    await tokenStorage.save(data.token);
    return data;
}

export async function logout(): Promise<void> {
    await tokenStorage.remove();
}