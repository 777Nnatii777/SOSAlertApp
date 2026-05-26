import { ScrollView, Text } from 'react-native';
import { ActionInfo } from '../../components/emergencyActions/ActionInfo';
import { DispatcherActions } from '../../components/emergencyActions/DispatcherActions';
import { ResponseListItem } from '../../components/emergencyActions/ResponseListItem';
import { HistoryListItem } from '../../components/emergencyActions/HistoryListItem';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Loading, ErrorMessage } from '../../components/ui/Status';
import {
    useAcceptEmergencyAction,
    useActionHistory,
    useDispatcherActions,
    useRejectEmergencyAction,
    useResponses,
} from '../../hooks/useEmergencyActions';

type Props = {
    actionId: string;
};

export function DispatcherDetails({ actionId }: Props) {
    const { data: actions, isLoading, error } = useDispatcherActions();
    const { data: responses } = useResponses(actionId);
    const { data: history } = useActionHistory(actionId);
    const acceptMutation = useAcceptEmergencyAction();
    const rejectMutation = useRejectEmergencyAction();

    const action = actions?.find((a) => a.id === actionId);

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!action) return <ErrorMessage message="Nie znaleziono zgłoszenia." />;

    const isPending = acceptMutation.isPending || rejectMutation.isPending;

    return (
        <ScrollView className="flex-1">
            <ActionInfo action={action} />

            <SectionHeader title={`Odpowiedzi (${responses?.length ?? 0})`} />
            {responses && responses.length > 0 ? (
                responses.map((r) => <ResponseListItem key={r.responseId} response={r} />)
            ) : (
                <Text className="px-4 py-3 text-sm text-neutral-400">Brak odpowiedzi.</Text>
            )}

            <DispatcherActions
                action={action}
                onAccept={() => acceptMutation.mutate(actionId)}
                onReject={() => rejectMutation.mutate(actionId)}
                isPending={isPending}
            />

            <SectionHeader title="Historia zdarzeń" />
            {history && history.length > 0 ? (
                history.map((h) => <HistoryListItem key={h.id} item={h} />)
            ) : (
                <Text className="px-4 py-3 text-sm text-neutral-400">Brak zdarzeń.</Text>
            )}
        </ScrollView>
    );
}