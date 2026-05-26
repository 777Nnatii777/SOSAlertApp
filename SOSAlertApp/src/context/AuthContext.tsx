import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/authService';
import { decodeAuth, isTokenExpired } from '../services/jwt';
import {pushTokenStorage, tokenStorage} from '../services/tokenStorage';
import type { Role } from '../types/auth';
import {unregisterPushToken} from "../services/deviceService";

type AuthState = {
    isLoading: boolean;
    isAuthenticated: boolean;
    roles: Role[];
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [roles, setRoles] = useState<Role[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const token = await tokenStorage.get();
                if (token) {
                    const { roles: decodedRoles, exp } = decodeAuth(token);
                    if (isTokenExpired(exp)) {
                        await tokenStorage.remove();
                    } else {
                        setRoles(decodedRoles);
                        setIsAuthenticated(true);
                    }
                }
            } catch {
                await tokenStorage.remove();
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const signIn = async (email: string, password: string) => {
        const result = await apiLogin(email, password);
        const { roles: decodedRoles } = decodeAuth(result.token);
        setRoles(decodedRoles);
        setIsAuthenticated(true);
    };

    const signOut = async () => {
        console.log('[signOut] start');
        try {
            const pushToken = await pushTokenStorage.get();
            console.log('[signOut] pushToken z SecureStore:', pushToken);
            if (pushToken) {
                console.log('[signOut] wysyłam unregister');
                await unregisterPushToken({ token: pushToken });
                await pushTokenStorage.remove();
                console.log('[signOut] unregister OK');
            } else {
                console.log('[signOut] brak tokena w SecureStore — pomijam unregister');
            }
        } catch (err) {
            console.warn('[push] Wypisanie tokena się nie udało:', err);
        }
        await apiLogout();
        setRoles([]);
        setIsAuthenticated(false);
        console.log('[signOut] koniec');
    };

    return (
        <AuthContext.Provider
            value={{ isLoading, isAuthenticated, roles, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthState {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth musi być użyte wewnątrz <AuthProvider>');
    }
    return ctx;
}