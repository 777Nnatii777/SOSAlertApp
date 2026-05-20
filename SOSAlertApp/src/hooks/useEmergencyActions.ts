import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import {
    createEmergencyAction,
    getDispatcherActions,
    getVolunteerRegionActions,
} from '../services/emergencyActionsService';
import type { CreateEmergencyActionRequest } from '../types/emergencyAction';
import { respondToEmergencyAction } from '../services/emergencyActionsService';

const KEYS = {
    dispatcherList: ['emergencyActions', 'dispatcher'] as const,
    volunteerList: ['emergencyActions', 'volunteer', 'my-region'] as const,
};

export function useDispatcherActions() {
    return useQuery({
        queryKey: KEYS.dispatcherList,
        queryFn: getDispatcherActions,
    });
}

export function useVolunteerActions() {
    return useQuery({
        queryKey: KEYS.volunteerList,
        queryFn: getVolunteerRegionActions,
    });
}

export function useCreateEmergencyAction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CreateEmergencyActionRequest) =>
            createEmergencyAction(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['emergencyActions'] });
        },
    });
}

export function useRespondToEmergencyAction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ actionId, status }: { actionId: string; status: number }) =>
            respondToEmergencyAction(actionId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['emergencyActions'] });
        },
    });
}