import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import {AuthProvider} from "./src/context/AuthContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePushToken } from './src/hooks/usePushToken';

const queryClient = new QueryClient();

function AppContent() {
    usePushToken();
    return <AppNavigator />;
}

export default function App() {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}