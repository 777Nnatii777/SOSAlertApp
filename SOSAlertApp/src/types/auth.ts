export const Roles = {
    Admin: 'Admin',
    Dispatcher: 'Dispatcher',
    Volunteer: 'Volunteer',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export type LoginResponse = {
    succeeded: boolean;
    message: string;
    userId: string;
    email: string;
    token: string;
};

type JwtPayload = {
    role?: string | string[];
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string | string[];
    exp?: number;
    [key: string]: unknown;
};

export type DecodedAuth = {
    roles: Role[];
    exp?: number;
};