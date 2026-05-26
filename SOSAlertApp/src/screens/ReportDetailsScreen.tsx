import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { Roles } from '../types/auth';
import {DispatcherDetails} from "./details/DispatcherDetails";
import {VolunteerDetails} from "./details/VolunteerDetails";

type Props = {
    actionId: string;
    onClose: () => void;
};

export function ReportDetailsScreen({ actionId, onClose }: Props) {
    const { roles } = useAuth();
    const isDispatcher = roles.includes(Roles.Dispatcher);

    return (
        <View className="flex-1 bg-white">
            <Header onClose={onClose} />
            {isDispatcher ? (
                <DispatcherDetails actionId={actionId} />
            ) : (
                <VolunteerDetails actionId={actionId} />
            )}
        </View>
    );
}

function Header({ onClose }: { onClose: () => void }) {
    return (
        <View className="flex-row items-center px-4 h-14 border-b border-neutral-200 gap-3">
            <Pressable onPress={onClose} hitSlop={8}>
                <Ionicons name="arrow-back" size={24} color="#171717" />
            </Pressable>
            <Text className="text-base font-medium text-neutral-900">
                Szczegóły zgłoszenia
            </Text>
        </View>
    );
}

