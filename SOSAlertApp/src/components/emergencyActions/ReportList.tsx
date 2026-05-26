import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { ReportListItem } from './ReportListItem';
import type {
    EmergencyAction,
    VolunteerEmergencyAction,
} from '../../types/emergencyAction';

type Props = {
    data: (EmergencyAction | VolunteerEmergencyAction)[] | undefined;
    isLoading: boolean;
    isRefetching: boolean;
    error: Error | null;
    emptyText: string;
    onItemPress: (id: string) => void;
    onRefresh: () => void;
};

export function ReportList({
                               data,
                               isLoading,
                               isRefetching,
                               error,
                               emptyText,
                               onItemPress,
                               onRefresh,
                           }: Props) {
    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Text className="text-sm text-red-600 text-center">{error.message}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={data ?? []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ReportListItem action={item} onPress={() => onItemPress(item.id)} />
            )}
            ListEmptyComponent={
                <View className="items-center justify-center p-8">
                    <Text className="text-sm text-neutral-400 text-center">{emptyText}</Text>
                </View>
            }
            refreshControl={
                <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
            }
        />
    );
}