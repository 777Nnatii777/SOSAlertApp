import { View, Text } from 'react-native';

type Props = {
    title: string;
};

export function SectionHeader({ title }: Props) {
    return (
        <View className="px-4 pt-4 pb-2 bg-neutral-50">
            <Text className="text-xs font-medium text-neutral-500 uppercase">{title}</Text>
        </View>
    );
}