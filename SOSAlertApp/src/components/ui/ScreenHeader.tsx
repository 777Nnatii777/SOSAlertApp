import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    title: string;
    onBack: () => void;
};

export function ScreenHeader({ title, onBack }: Props) {
    return (
        <View className="flex-row items-center px-4 h-14 border-b border-neutral-200 gap-3">
            <Pressable onPress={onBack} hitSlop={8}>
                <Ionicons name="arrow-back" size={24} color="#171717" />
            </Pressable>
            <Text className="text-base font-medium text-neutral-900">{title}</Text>
        </View>
    );
}