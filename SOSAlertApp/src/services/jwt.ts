import { jwtDecode } from 'jwt-decode';
import type { DecodedAuth, Role } from '../types/auth';

const MS_ROLE_CLAIM =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

export function decodeAuth(token: string): DecodedAuth {
    const payload = jwtDecode<Record<string, unknown>>(token);

    const rawRole = payload['role'] ?? payload[MS_ROLE_CLAIM];

    let roles: Role[] = [];
    if (Array.isArray(rawRole)) {
        roles = rawRole as Role[];
    } else if (typeof rawRole === 'string') {
        roles = [rawRole as Role];
    }

    return {
        roles,
        exp: typeof payload['exp'] === 'number' ? payload['exp'] : undefined,
    };
}

export function isTokenExpired(exp?: number): boolean {
    if (!exp) return false;
    return Date.now() >= exp * 1000;
}