import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    onClose: () => void;
};

export function AddReportScreen({ onClose }: Props) {
    return (
        <View className="flex-1 bg-white">
            <View className="flex-row items-center px-4 h-14 border-b border-neutral-200 gap-3">
                <Pressable onPress={onClose} hitSlop={8}>
                    <Ionicons name="arrow-back" size={24} color="#171717" />
                </Pressable>
                <Text className="text-base font-medium text-neutral-900">
                    Nowe zgłoszenie
                </Text>
            </View>

            <View className="flex-1 items-center justify-center p-4">
                <Text className="text-sm text-neutral-400 text-center">
                    Formularz zgłoszenia – do uzupełnienia.
                </Text>
            </View>
        </View>
    );
}