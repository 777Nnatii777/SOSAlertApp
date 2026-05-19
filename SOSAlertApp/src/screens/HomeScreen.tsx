import { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBar } from '../components/ui/TopBar';
import { BottomBar, type HomeTab } from '../components/ui/BottomBar';
import { AddReportButton } from '../components/ui/AddReportButton';
import { AddReportScreen } from './AddReportScreen';
import { useAuth } from '../context/AuthContext';


export function HomeScreen() {
    const { roles, signOut } = useAuth();
    const [tab, setTab] = useState<HomeTab>('list');
    const [addingReport, setAddingReport] = useState(false);

    const role = roles[0];


    if (addingReport) {
        return (
            <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
                <AddReportScreen onClose={() => setAddingReport(false)} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <TopBar role={role} onLogout={signOut} />

            <View className="flex-1 items-center justify-center">
                {tab === 'map' ? (
                    <Text className="text-sm text-neutral-400">Mapa – do uzupełnienia.</Text>
                ) : (
                    <Text className="text-sm text-neutral-400">Lista zgłoszeń – pusta.</Text>
                )}
            </View>

            {tab === 'list' && (
                <AddReportButton onPress={() => setAddingReport(true)} />
            )}

            <BottomBar
                active={tab}
                onChange={setTab}
            />
        </SafeAreaView>
    );
}