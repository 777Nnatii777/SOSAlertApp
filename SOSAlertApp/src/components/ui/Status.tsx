import { View, Text, ActivityIndicator } from 'react-native';

export function Loading() {
    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
        </View>
    );
}

export function ErrorMessage({ message }: { message: string }) {
    return (
        <View className="flex-1 items-center justify-center p-4">
            <Text className="text-sm text-red-600 text-center">{message}</Text>
        </View>
    );
}