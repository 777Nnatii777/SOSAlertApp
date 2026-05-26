import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    STATUS_LABELS,
    EmergencyActionResponseStatus,
    type EmergencyAction,
    type VolunteerEmergencyAction,
} from '../../types/emergencyAction';

type Props = {
    action: EmergencyAction | VolunteerEmergencyAction;
    onPress: () => void;
};

export function ReportListItem({ action, onPress }: Props) {
    const isVolunteerAction = 'hasResponded' in action;
    const hasResponded = isVolunteerAction && action.hasResponded;
    const myStatus = isVolunteerAction ? action.myResponseStatus : null;

    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center px-4 py-3 border-b border-neutral-100 bg-white active:bg-neutral-50"
        >
            <View className="flex-1 gap-1">
                <View className="flex-row items-center gap-2">
                    <Text className="text-base font-medium text-neutral-900 flex-1" numberOfLines={1}>
                        {action.title}
                    </Text>
                    <Text className="text-xs text-neutral-500">
                        {STATUS_LABELS[action.status]}
                    </Text>
                </View>

                <Text className="text-xs text-neutral-500" numberOfLines={1}>
                    {action.eventType} · {action.region}
                </Text>

                <Text className="text-xs text-neutral-400" numberOfLines={1}>
                    {action.locationText}
                </Text>

                {hasResponded && (
                    <View className="flex-row items-center gap-1 mt-0.5">
                        <Ionicons
                            name={
                                myStatus === EmergencyActionResponseStatus.Accepted
                                    ? 'checkmark-circle'
                                    : 'close-circle'
                            }
                            size={14}
                            color={
                                myStatus === EmergencyActionResponseStatus.Accepted
                                    ? '#16a34a'
                                    : '#737373'
                            }
                        />
                        <Text className="text-xs text-neutral-500">
                            {myStatus === EmergencyActionResponseStatus.Accepted
                                ? 'Zadeklarowałeś pomoc'
                                : 'Odmówiłeś'}
                        </Text>
                    </View>
                )}
            </View>

            <Ionicons name="chevron-forward" size={20} color="#a3a3a3" />
        </Pressable>
    );
}