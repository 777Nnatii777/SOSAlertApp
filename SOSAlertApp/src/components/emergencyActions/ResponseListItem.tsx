import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    EmergencyActionResponseStatus,
    type EmergencyActionResponseDto,
} from '../../types/emergencyAction';
import { formatDate } from '../../utils/formatDate';

type Props = {
    response: EmergencyActionResponseDto;
};

export function ResponseListItem({ response }: Props) {
    const isAccepted = response.status === EmergencyActionResponseStatus.Accepted;

    return (
        <View className="px-4 py-2 border-b border-neutral-100">
            <View className="flex-row items-center gap-2">
                <Ionicons
                    name={isAccepted ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={isAccepted ? '#16a34a' : '#737373'}
                />
                <Text className="text-sm text-neutral-900 flex-1">
                    {response.firstName} {response.lastName}
                </Text>
                <Text className="text-xs text-neutral-400">
                    {formatDate(response.respondedAt)}
                </Text>
            </View>
        </View>
    );
}