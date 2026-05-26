import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

type NotificationData = {
    actionId?: string;
    [key: string]: unknown;
};

type Props = {
    onActionPressed: (actionId: string) => void;
};


export function useNotificationResponse({ onActionPressed }: Props) {
    const handlerRef = useRef(onActionPressed);
    handlerRef.current = onActionPressed;

    useEffect(() => {
        Notifications.getLastNotificationResponseAsync().then((response) => {
            if (!response) return;
            const data = response.notification.request.content.data as NotificationData;
            if (data.actionId) {
                handlerRef.current(data.actionId);
            }
        });

        const subscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                const data = response.notification.request.content.data as NotificationData;
                if (data.actionId) {
                    handlerRef.current(data.actionId);
                }
            },
        );

        return () => subscription.remove();
    }, []);
}