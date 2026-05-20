import { View, Text, TextInput } from 'react-native';

type Props = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    multiline?: boolean;
};

export function Field({ label, value, onChangeText, placeholder, multiline }: Props) {
    return (
        <View className="mb-3">
            <Text className="text-xs text-neutral-600 mb-1">{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={multiline}
                className={`border border-neutral-300 rounded-lg px-3 py-2 text-base text-neutral-900 ${
                    multiline ? 'min-h-[80px]' : ''
                }`}
                textAlignVertical={multiline ? 'top' : 'auto'}
            />
        </View>
    );
}