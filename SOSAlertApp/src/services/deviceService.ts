import { apiFetch } from './apiClient';

type RegisterPushTokenRequest = {
    token: string;
    platform: 'ios' | 'android' | 'web';
};

export async function registerPushToken(
    body: RegisterPushTokenRequest,
): Promise<void> {
    const response = await apiFetch('/api/devices/register-push-token', {
        method: 'POST',
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        if (response.status === 404) {
            console.warn('[push] Endpoint /api/devices/register-push-token nie istnieje jeszcze w backendzie.');
            return;
        }
        throw new Error(`Nie udało się zarejestrować tokena (${response.status})`);
    }
}