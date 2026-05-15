import { Pressable, Text, type PressableProps } from 'react-native';

type Props = PressableProps & {
    loading?: boolean;
    label?: string;
};

export function LogInButton({ loading, disabled, label = 'Log in', ...rest }: Props) {
    const isDisabled = disabled || loading;
    return (
        <Pressable
            {...rest}
            disabled={isDisabled}
            className={`h-11 rounded items-center justify-center bg-brand active:bg-brand-dark ${
                isDisabled ? 'opacity-50' : ''
            }`}
        >
            <Text className="text-white text-base font-medium">
                {loading ? 'Logging in…' : label}
            </Text>
        </Pressable>
    );
}