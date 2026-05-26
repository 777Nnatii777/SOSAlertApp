import { ReportList } from '../../components/emergencyActions/ReportList';
import {
    useDispatcherActions,
    useVolunteerActions,
} from '../../hooks/useEmergencyActions';
import { EmergencyActionStatus } from '../../types/emergencyAction';

type Props = {
    isDispatcher: boolean;
    onItemPress: (id: string) => void;
};

export function ListView({ isDispatcher, onItemPress }: Props) {
    const dispatcherQuery = useDispatcherActions();
    const volunteerQuery = useVolunteerActions();
    const query = isDispatcher ? dispatcherQuery : volunteerQuery;

    const data = query.data?.filter(
        (a) => a.status === EmergencyActionStatus.WaitingForVolunteers,
    );

    return (
        <ReportList
            data={data}
            isLoading={query.isLoading}
            isRefetching={query.isRefetching}
            error={query.error}
            emptyText={
                isDispatcher
                    ? 'Brak otwartych zgłoszeń.'
                    : 'Brak otwartych zgłoszeń w Twoim regionie.'
            }
            onItemPress={onItemPress}
            onRefresh={query.refetch}
        />
    );
}