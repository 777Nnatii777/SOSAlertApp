import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { useAuth } from '../context/AuthContext';
import { registerPushToken } from '../services/deviceService';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function getExpoPushToken(): Promise<string | null> {
    if (!Device.isDevice) {
        console.warn('[push] Push notifications działają tylko na fizycznym urządzeniu.');
        return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.warn('[push] Użytkownik nie zgodził się na powiadomienia.');
        return null;
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'Domyślne',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#c90a02',
        });
    }

    const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;

    if (!projectId) {
        console.warn('[push] Brak projectId w app.json (extra.eas.projectId).');
        return null;
    }

    try {
        const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
        return tokenData.data;
    } catch (err) {
        console.error('[push] Błąd pobierania tokena:', err);
        return null;
    }
}

export function usePushToken() {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) return;

        (async () => {
            const token = await getExpoPushToken();
            if (!token) return;

            console.log('[push] Expo Push Token:', token);

            try {
                await registerPushToken({
                    token,
                    platform: Platform.OS as 'ios' | 'android' | 'web',
                });
                console.log('[push] Token zarejestrowany w backendzie.');
            } catch (err) {
                console.error('[push] Błąd rejestracji w backendzie:', err);
            }
        })();
    }, [isAuthenticated]);
}