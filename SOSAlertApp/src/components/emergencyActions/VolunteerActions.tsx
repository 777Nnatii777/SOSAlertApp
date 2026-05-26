import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    EmergencyActionResponseStatus,
    EmergencyActionStatus,
    type VolunteerEmergencyAction,
} from '../../types/emergencyAction';

type Props = {
    action: VolunteerEmergencyAction;
    onRespond: (status: number) => void;
    isPending: boolean;
};

export function VolunteerActions({ action, onRespond, isPending }: Props) {
    const isOpen = action.status === EmergencyActionStatus.WaitingForVolunteers;

    if (action.hasResponded) {
        return <RespondedBanner status={action.myResponseStatus} />;
    }

    if (!isOpen) {
        return <ClosedBanner />;
    }

    return (
        <View className="p-4 gap-2">
            <Pressable
                onPress={() => onRespond(EmergencyActionResponseStatus.Accepted)}
                disabled={isPending}
                className="h-12 rounded-lg bg-brand active:bg-brand-dark items-center justify-center disabled:opacity-50"
            >
                <Text className="text-white font-medium">Pomogę</Text>
            </Pressable>
            <Pressable
                onPress={() => onRespond(EmergencyActionResponseStatus.Rejected)}
                disabled={isPending}
                className="h-12 rounded-lg border border-neutral-300 active:border-neutral-900 items-center justify-center disabled:opacity-50"
            >
                <Text className="text-neutral-900 font-medium">Nie mogę</Text>
            </Pressable>
        </View>
    );
}

function RespondedBanner({ status }: { status: number | null }) {
    const isAccepted = status === EmergencyActionResponseStatus.Accepted;
    return (
        <View className="m-4 flex-row items-center gap-2 bg-neutral-50 rounded-lg p-3">
            <Ionicons
                name={isAccepted ? 'checkmark-circle' : 'close-circle'}
                size={20}
                color={isAccepted ? '#16a34a' : '#737373'}
            />
            <Text className="text-sm text-neutral-700">
                {isAccepted ? 'Zadeklarowałeś pomoc' : 'Odmówiłeś pomocy'}
            </Text>
        </View>
    );
}

function ClosedBanner() {
    return (
        <View className="m-4 flex-row items-center gap-2 bg-neutral-50 rounded-lg p-3">
            <Ionicons name="lock-closed" size={20} color="#737373" />
            <Text className="text-sm text-neutral-700">
                Zgłoszenie zostało zamknięte przez operatora.
            </Text>
        </View>
    );
}