import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { LoginInput } from './ui/loginInput';
import { LogInButton } from './ui/loginButton';

type Props = {
    onSubmit: (email: string, password: string) => Promise<void> | void;
};

export function LoginForm({ onSubmit }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError(undefined);
        setLoading(true);
        try {
            await onSubmit(email, password);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="w-full max-w-sm mx-auto gap-4 p-4">
            <Image
                source={require('../../assets/icon.png')}
                className="w-40 h-40 self-center"
                resizeMode="contain"
            />

            <LoginInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
            />
            <LoginInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
            />
            {error && <Text className="text-xs text-red-600">{error}</Text>}
            <LogInButton loading={loading} onPress={handleSubmit} />
        </View>
    );
}