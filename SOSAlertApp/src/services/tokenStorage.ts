import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
    async save(token: string): Promise<void> {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    },

    async get(): Promise<string | null> {
        return SecureStore.getItemAsync(TOKEN_KEY);
    },

    async remove(): Promise<void> {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    },
};

const PUSH_TOKEN_KEY = 'push_token';

export const pushTokenStorage = {
    async save(token: string): Promise<void> {
        await SecureStore.setItemAsync(PUSH_TOKEN_KEY, token);
    },
    async get(): Promise<string | null> {
        return SecureStore.getItemAsync(PUSH_TOKEN_KEY);
    },
    async remove(): Promise<void> {
        await SecureStore.deleteItemAsync(PUSH_TOKEN_KEY);
    },
};