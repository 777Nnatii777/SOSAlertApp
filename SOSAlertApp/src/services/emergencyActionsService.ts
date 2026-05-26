import { apiFetch } from './apiClient';
import type {
    CreateEmergencyActionRequest,
    EmergencyAction, EmergencyActionHistory, EmergencyActionResponseDto, SetCommentRequest, VolunteerEmergencyAction,
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
    if (response.status === 404) {
        throw new Error('Nie znaleziono zgłoszenia.');
    }
    throw new Error(`Błąd serwera (${response.status})`);
}

export async function getDispatcherActions(): Promise<EmergencyAction[]> {
    const response = await apiFetch(BASE_PATH);
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

export async function acceptEmergencyAction(actionId: string): Promise<void> {
    const response = await apiFetch(`${BASE_PATH}/${actionId}/accept`, {
        method: 'POST',
    });
    await handleErrors(response);
}

export async function rejectEmergencyAction(actionId: string): Promise<void> {
    const response = await apiFetch(`${BASE_PATH}/${actionId}/reject`, {
        method: 'POST',
    });
    await handleErrors(response);
}

export async function getResponses(
    actionId: string,
): Promise<EmergencyActionResponseDto[]> {
    const response = await apiFetch(`${BASE_PATH}/${actionId}/responses`);
    await handleErrors(response);
    return response.json();
}

export async function getActionHistory(
    actionId: string,
): Promise<EmergencyActionHistory[]> {
    const response = await apiFetch(`${BASE_PATH}/${actionId}/history`);
    await handleErrors(response);
    return response.json();
}

export async function getVolunteerRegionActions(): Promise<VolunteerEmergencyAction[]> {
    const response = await apiFetch(`${BASE_PATH}/my-region`);
    await handleErrors(response);
    return response.json();
}

export async function getVolunteerHistory(): Promise<VolunteerEmergencyAction[]> {
    const response = await apiFetch(`${BASE_PATH}/my-history`);
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

export async function setComment(
    actionId: string,
    body: SetCommentRequest,
): Promise<void> {
    const response = await apiFetch(`${BASE_PATH}/${actionId}/comment`, {
        method: 'PUT',
        body: JSON.stringify(body),
    });
    await handleErrors(response);
}