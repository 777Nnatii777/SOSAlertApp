import { ScrollView } from 'react-native';
import { ActionInfo } from '../../components/emergencyActions/ActionInfo';
import { VolunteerActions } from '../../components/emergencyActions/VolunteerActions';
import { Loading, ErrorMessage } from '../../components/ui/Status';
import {
    useRespondToEmergencyAction,
    useVolunteerActions,
} from '../../hooks/useEmergencyActions';
import {EmergencyActionStatus} from "../../types/emergencyAction";
import {SectionHeader} from "../../components/ui/SectionHeader";
import {CommentSection} from "../../components/emergencyActions/CommentSection";

type Props = {
    actionId: string;
};

export function VolunteerDetails({ actionId }: Props) {
    const { data, isLoading, error } = useVolunteerActions();
    const respondMutation = useRespondToEmergencyAction();

    const action = data?.find((a) => a.id === actionId);

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!action) return <ErrorMessage message="Nie znaleziono zgłoszenia." />;

    return (
        <ScrollView className="flex-1">
            <ActionInfo action={action} />
            <VolunteerActions
                action={action}
                onRespond={(status) => respondMutation.mutate({ actionId, status })}
                isPending={respondMutation.isPending}
            />
            {action.status !== EmergencyActionStatus.WaitingForVolunteers && action.comment && (
                <>
                    <SectionHeader title="Komentarz dyspozytora" />
                    <CommentSection
                        actionId={actionId}
                        initialComment={action.comment}
                        canEdit={false}
                    />
                </>
            )}


        </ScrollView>
    );
}