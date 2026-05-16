import { View } from 'react-native';
import { LoginForm } from '../components/LoginForm';

type Props = {
    onLogin: () => void;
};

export function LoginScreen({ onLogin }: Props) {
    return (
        <View className="flex-1 justify-center bg-white">
            <LoginForm
                onSubmit={async (email, password) => {
                    if (!email || !password) {
                        throw new Error('Enter email and password');
                    }
                    // TODO: zrobić logowanie przez API
                    await new Promise((r) => setTimeout(r, 500));
                    onLogin();
                }}
            />
        </View>
    );
}