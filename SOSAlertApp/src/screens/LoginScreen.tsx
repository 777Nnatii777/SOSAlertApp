import { View } from 'react-native';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';


export function LoginScreen() {
    const { signIn } = useAuth();

    return (
        <View className="flex-1 justify-center bg-white">
            <LoginForm
                onSubmit={async (email, password) => {
                    if (!email || !password) {
                        throw new Error('Wpisz login i hasło');
                    }
                    await signIn(email, password);
                }}
            />
        </View>
    );
}