import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBar } from '../components/ui/TopBar';
import { BottomBar, type HomeTab } from '../components/ui/BottomBar';
import { AddReportButton } from '../components/ui/AddReportButton';
import { AddReportScreen } from './AddReportScreen';
import { useAuth } from '../context/AuthContext';
import {Roles} from "../types/auth";
import {ReportDetailsScreen} from "./ReportDetailsScreen";
import {MapView} from "./home/MapView";
import {ListView} from "./home/ListView";
import {HistoryView} from "./home/HistoryView";


export function HomeScreen() {
    const { roles, signOut } = useAuth();
    const isDispatcher = roles.includes(Roles.Dispatcher);
    const role = isDispatcher ? Roles.Dispatcher : Roles.Volunteer;

    const [tab, setTab] = useState<HomeTab>('list');
    const [addingReport, setAddingReport] = useState(false);
    const [selectedActionId, setSelectedActionId] = useState<string | null>(null);


    if (addingReport) {
        return (
            <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
                <AddReportScreen onClose={() => setAddingReport(false)} />
            </SafeAreaView>
        );
    }

    if (selectedActionId) {
        return (
            <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
                <ReportDetailsScreen
                    actionId={selectedActionId}
                    onClose={() => setSelectedActionId(null)}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <TopBar role={role} onLogout={signOut} />

            <View className="flex-1">
                {tab === 'map' && <MapView />}
                {tab === 'list' && (
                    <ListView
                        isDispatcher={isDispatcher}
                        onItemPress={setSelectedActionId}
                    />
                )}
                {tab === 'history' && (
                    <HistoryView
                        isDispatcher={isDispatcher}
                        onItemPress={setSelectedActionId}
                    />
                )}
            </View>

            {tab === 'list' && isDispatcher && (
                <AddReportButton onPress={() => setAddingReport(true)} />
            )}

            <BottomBar
                active={tab}
                onChange={setTab}
            />
        </SafeAreaView>
    );
}