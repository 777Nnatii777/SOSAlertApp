import { ReportList } from '../../components/emergencyActions/ReportList';
import {
    useDispatcherActions,
    useVolunteerHistory,
} from '../../hooks/useEmergencyActions';
import { EmergencyActionStatus } from '../../types/emergencyAction';

type Props = {
    isDispatcher: boolean;
    onItemPress: (id: string) => void;
};

export function HistoryView({ isDispatcher, onItemPress }: Props) {
    const volunteerQuery = useVolunteerHistory();
    const dispatcherQuery = useDispatcherActions();

    if (isDispatcher) {
        const filtered = dispatcherQuery.data?.filter(
            (a) =>
                a.status === EmergencyActionStatus.Accepted ||
                a.status === EmergencyActionStatus.Rejected ||
                a.status === EmergencyActionStatus.Completed ||
                a.status === EmergencyActionStatus.Cancelled,
        );

        return (
            <ReportList
                data={filtered}
                isLoading={dispatcherQuery.isLoading}
                isRefetching={dispatcherQuery.isRefetching}
                error={dispatcherQuery.error}
                emptyText="Brak zgłoszeń w historii."
                onItemPress={onItemPress}
                onRefresh={dispatcherQuery.refetch}
            />
        );
    }

    return (
        <ReportList
            data={volunteerQuery.data}
            isLoading={volunteerQuery.isLoading}
            isRefetching={volunteerQuery.isRefetching}
            error={volunteerQuery.error}
            emptyText="Nie odpowiedziałeś jeszcze na żadne zgłoszenie."
            onItemPress={onItemPress}
            onRefresh={volunteerQuery.refetch}
        />
    );
}