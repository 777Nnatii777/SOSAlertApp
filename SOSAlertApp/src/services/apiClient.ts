import { API_BASE_URL } from '../config/api';
import { tokenStorage } from './tokenStorage';

type ApiOptions = RequestInit & { auth?: boolean };

export async function apiFetch(
    path: string,
    options: ApiOptions = {},
): Promise<Response> {
    const { auth = true, headers, ...rest } = options;

    const finalHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        accept: '*/*',
        ...(headers as Record<string, string>),
    };

    if (auth) {
        const token = await tokenStorage.get();
        if (token) {
            finalHeaders['Authorization'] = `Bearer ${token}`;
        }
    }

    let response: Response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            ...rest,
            headers: finalHeaders,
        });
    } catch {
        throw new Error('Nie można połączyć się z serwerem.');
    }

    return response;
}