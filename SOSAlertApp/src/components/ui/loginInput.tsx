import { View, Text, TextInput, type TextInputProps } from 'react-native';

type Props = TextInputProps & {
    label: string;
    error?: string;
};

export function LoginInput({ label, error, ...rest }: Props) {
    return (
        <View>
            <Text className="text-sm text-neutral-900 mb-1">{label}</Text>
            <TextInput
                {...rest}
                placeholderTextColor="#a3a3a3"
                className={`h-11 px-3 border rounded bg-white text-base ${
                    error ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-900'
                }`}
            />
            {error && <Text className="text-xs text-red-600 mt-1">{error}</Text>}
        </View>
    );
}