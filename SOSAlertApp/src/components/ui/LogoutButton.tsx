import { Pressable, Text, type PressableProps } from 'react-native';

type Props = PressableProps & {
    label?: string;
};

export function LogoutButton({ label = 'Wyloguj się', ...rest }: Props) {
    return (
        <Pressable
            {...rest}
            className="h-10 px-3 rounded border border-neutral-300 items-center justify-center active:border-neutral-900"
        >
            <Text className="text-sm text-neutral-900">{label}</Text>
        </Pressable>
    );
}