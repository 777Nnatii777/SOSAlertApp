import { View, Text, Pressable } from 'react-native';
import {
    EmergencyActionStatus,
    type EmergencyAction,
} from '../../types/emergencyAction';

type Props = {
    action: EmergencyAction;
    onAccept: () => void;
    onReject: () => void;
    isPending: boolean;
};

export function DispatcherActions({ action, onAccept, onReject, isPending }: Props) {
    const isOpen = action.status === EmergencyActionStatus.WaitingForVolunteers;
    if (!isOpen) return null;

    return (
        <View className="p-4 gap-2">
            <Pressable
                onPress={onAccept}
                disabled={isPending}
                className="h-12 rounded-lg bg-brand active:bg-brand-dark items-center justify-center disabled:opacity-50"
            >
                <Text className="text-white font-medium">Akceptuj zgłoszenie</Text>
            </Pressable>
            <Pressable
                onPress={onReject}
                disabled={isPending}
                className="h-12 rounded-lg border border-neutral-300 active:border-neutral-900 items-center justify-center disabled:opacity-50"
            >
                <Text className="text-neutral-900 font-medium">Odrzuć</Text>
            </Pressable>
        </View>
    );
}