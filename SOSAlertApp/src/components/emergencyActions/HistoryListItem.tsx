import { View, Text } from 'react-native';
import type { EmergencyActionHistory } from '../../types/emergencyAction';
import { formatDate } from '../../utils/formatDate';

type Props = {
    item: EmergencyActionHistory;
};

export function HistoryListItem({ item }: Props) {
    return (
        <View className="px-4 py-2 border-b border-neutral-100">
            <Text className="text-sm text-neutral-900">{item.message}</Text>
            <Text className="text-xs text-neutral-400 mt-0.5">
                {formatDate(item.createdAt)}
            </Text>
        </View>
    );
}