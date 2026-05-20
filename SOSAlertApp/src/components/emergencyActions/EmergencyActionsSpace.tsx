import { FlatList, RefreshControl, View, Text, ActivityIndicator } from 'react-native';
import {
    useDispatcherActions,
    useVolunteerActions,
} from '../../hooks/useEmergencyActions';
import { EmergencyActionItem } from './EmergencyActionItem';
import type { Role } from '../../types/auth';

type Props = {
    role: Role;
};

export function EmergencyActionsSpace({ role }: Props) {
    const dispatcher = useDispatcherActions();
    const volunteer = useVolunteerActions();

    const query = role === 'Dispatcher' ? dispatcher : volunteer;
    const isActive = role === 'Dispatcher' || role === 'Volunteer';

    if (!isActive) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Text className="text-sm text-neutral-400 text-center">
                    Brak dostępu do listy zgłoszeń dla tej roli.
                </Text>
            </View>
        );
    }

    if (query.isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (query.isError) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Text className="text-sm text-red-600 text-center">
                    {query.error instanceof Error
                        ? query.error.message
                        : 'Nie udało się wczytać zgłoszeń.'}
                </Text>
            </View>
        );
    }

    const data = query.data ?? [];

    if (data.length === 0) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Text className="text-sm text-neutral-400 text-center">
                    Brak zgłoszeń.
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            style={{ flex: 1, width: '100%' }}
            contentContainerStyle={{ flexGrow: 1 }}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EmergencyActionItem action={item} role={role}/>}
            refreshControl={
                <RefreshControl
                    refreshing={query.isFetching && !query.isLoading}
                    onRefresh={() => query.refetch()}
                />
            }
        />
    );}