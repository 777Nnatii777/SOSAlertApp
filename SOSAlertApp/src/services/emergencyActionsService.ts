import { apiFetch } from './apiClient';
import type {
    CreateEmergencyActionRequest,
    EmergencyAction,
} from '../types/emergencyAction';

const BASE_PATH = '/api/EmergencyActions';

async function handleErrors(response: Response): Promise<void> {
    if (response.ok) return;

    if (response.status === 401) {
        throw new Error('Sesja wygasła. Zaloguj się ponownie.');
    }
    if (response.status === 403) {
        throw new Error('Brak uprawnień.');
    }
    throw new Error(`Błąd serwera (${response.status})`);
}

export async function getDispatcherActions(): Promise<EmergencyAction[]> {
    const response = await apiFetch(BASE_PATH);
    await handleErrors(response);
    return response.json();
}

export async function getVolunteerRegionActions(): Promise<EmergencyAction[]> {
    const response = await apiFetch(`${BASE_PATH}/my-region`);
    await handleErrors(response);
    return response.json();
}

export async function createEmergencyAction(
    body: CreateEmergencyActionRequest,
): Promise<EmergencyAction> {
    const response = await apiFetch(BASE_PATH, {
        method: 'POST',
        body: JSON.stringify(body),
    });
    await handleErrors(response);
    return response.json();
}

export async function respondToEmergencyAction(
    actionId: string,
    status: number,
): Promise<void> {
    const response = await apiFetch(`${BASE_PATH}/${actionId}/respond`, {
        method: 'POST',
        body: JSON.stringify({ status }),
    });
    await handleErrors(response);
}