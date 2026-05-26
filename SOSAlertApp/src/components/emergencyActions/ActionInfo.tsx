import { View, Text } from 'react-native';
import {
    STATUS_LABELS,
    type EmergencyAction,
    type VolunteerEmergencyAction,
} from '../../types/emergencyAction';
import { formatDate } from '../../utils/formatDate';

type Props = {
    action: EmergencyAction | VolunteerEmergencyAction;
};

export function ActionInfo({ action }: Props) {
    return (
        <View className="p-4 gap-2 border-b border-neutral-200">
            <Text className="text-xl font-medium text-neutral-900">{action.title}</Text>

            <View className="flex-row items-center gap-2">
                <Text className="text-xs text-neutral-500">
                    {action.eventType} · {action.region}
                </Text>
                <Text className="text-xs px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                    {STATUS_LABELS[action.status]}
                </Text>
            </View>

            <Text className="text-sm text-neutral-700 mt-1">{action.locationText}</Text>

            {action.description ? (
                <Text className="text-sm text-neutral-600 mt-2">{action.description}</Text>
            ) : null}

            <Text className="text-xs text-neutral-400 mt-1">
                Utworzono: {formatDate(action.createdAt)}
            </Text>
        </View>
    );
}