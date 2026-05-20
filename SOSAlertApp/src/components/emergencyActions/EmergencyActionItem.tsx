import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    EmergencyActionResponseStatus,
    EmergencyActionStatus,
    STATUS_LABELS,
    type EmergencyAction,
} from '../../types/emergencyAction';
import { useRespondToEmergencyAction } from '../../hooks/useEmergencyActions';
import type { Role } from '../../types/auth';

type Props = {
    action: EmergencyAction;
    role: Role;
};

function statusColor(status: EmergencyAction['status']): string {
    switch (status) {
        case EmergencyActionStatus.WaitingForVolunteers:
            return 'bg-amber-100 text-amber-800';
        case EmergencyActionStatus.Accepted:
            return 'bg-green-100 text-green-800';
        case EmergencyActionStatus.Completed:
            return 'bg-blue-100 text-blue-800';
        case EmergencyActionStatus.Rejected:
        case EmergencyActionStatus.Cancelled:
            return 'bg-neutral-200 text-neutral-700';
    }
}

function formatDate(iso: string): string {
    const date = new Date(iso);
    return date.toLocaleString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function EmergencyActionItem({ action, role }: Props) {
    const respond = useRespondToEmergencyAction();

    const canRespond =
        role === 'Volunteer' &&
        action.status === EmergencyActionStatus.WaitingForVolunteers;

    return (
        <View className="px-4 py-3 border-b border-neutral-200 bg-white">
            <View className="flex-row items-start justify-between gap-2 mb-1">
                <Text
                    className="text-base font-medium text-neutral-900 flex-1"
                    numberOfLines={1}
                >
                    {action.title}
                </Text>
                <Text
                    className={`text-xs px-2 py-0.5 rounded ${statusColor(action.status)}`}
                >
                    {STATUS_LABELS[action.status]}
                </Text>
            </View>

            <Text className="text-xs text-neutral-500 mb-1">
                {action.eventType} · {action.region}
            </Text>

            {action.description ? (
                <Text
                    className="text-sm text-neutral-700 mb-1"
                    numberOfLines={2}
                >
                    {action.description}
                </Text>
            ) : null}

            <View className="flex-row items-center gap-1">
                <Ionicons name="location-outline" size={12} color="#737373" />
                <Text className="text-xs text-neutral-500 flex-1" numberOfLines={1}>
                    {action.locationText}
                </Text>
                <Text className="text-xs text-neutral-400">
                    {formatDate(action.createdAt)}
                </Text>
            </View>

            {canRespond && (
                <View className="flex-row gap-2 mt-2">
                    <Pressable
                        onPress={() =>
                            respond.mutate({
                                actionId: action.id,
                                status: EmergencyActionResponseStatus.Accepted,
                            })
                        }
                        disabled={respond.isPending}
                        className="flex-1 h-9 rounded-lg items-center justify-center bg-green-600 disabled:bg-neutral-300"
                    >
                        <Text className="text-white text-sm font-medium">Akceptuję</Text>
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            respond.mutate({
                                actionId: action.id,
                                status: EmergencyActionResponseStatus.Rejected,
                            })
                        }
                        disabled={respond.isPending}
                        className="flex-1 h-9 rounded-lg items-center justify-center bg-neutral-600 disabled:bg-neutral-300"
                    >
                        <Text className="text-white text-sm font-medium">Odrzucam</Text>
                    </Pressable>
                </View>
            )}

            {respond.isError && (
                <Text className="text-xs text-red-600 mt-1">
                    {respond.error instanceof Error
                        ? respond.error.message
                        : 'Błąd odpowiedzi'}
                </Text>
            )}
        </View>
    );
}