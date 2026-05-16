import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    onPress: () => void;
    label?: string;
};

export function AddReportButton({ onPress, label = 'Dodaj zgłoszenie' }: Props) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center justify-center gap-2 h-12 mx-4 mb-2 rounded-lg bg-brand active:bg-brand-dark"
        >
            <Ionicons name="add" size={20} color="#ffffff" />
            <Text className="text-sm font-medium text-white">{label}</Text>
        </Pressable>
    );
}