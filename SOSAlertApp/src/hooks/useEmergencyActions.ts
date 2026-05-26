import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import {
    createEmergencyAction,
    getDispatcherActions,
    getVolunteerRegionActions,
    acceptEmergencyAction,
    rejectEmergencyAction,
    getResponses,
    getActionHistory,
    getVolunteerHistory, setComment,
} from '../services/emergencyActionsService';
import type {CreateEmergencyActionRequest, SetCommentRequest} from '../types/emergencyAction';
import { respondToEmergencyAction } from '../services/emergencyActionsService';

const KEYS = {
    dispatcherList: ['emergencyActions', 'dispatcher'] as const,
    volunteerList: ['emergencyActions', 'volunteer', 'my-region'] as const,
    volunteerHistory: ['emergencyActions', 'volunteer', 'my-history'] as const,
    responses: (id: string) => ['emergencyActions', id, 'responses'] as const,
    history: (id: string) => ['emergencyActions', id, 'history'] as const,
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

export function useVolunteerHistory() {
    return useQuery({
        queryKey: KEYS.volunteerHistory,
        queryFn: getVolunteerHistory,
    });
}

export function useResponses(actionId: string) {
    return useQuery({
        queryKey: KEYS.responses(actionId),
        queryFn: () => getResponses(actionId),
        enabled: !!actionId,
    });
}

export function useActionHistory(actionId: string) {
    return useQuery({
        queryKey: KEYS.history(actionId),
        queryFn: () => getActionHistory(actionId),
        enabled: !!actionId,
    });
}

export function useAcceptEmergencyAction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (actionId: string) => acceptEmergencyAction(actionId),
        onSuccess: (_, actionId) => {
            queryClient.invalidateQueries({ queryKey: ['emergencyActions'] });
            queryClient.invalidateQueries({ queryKey: KEYS.history(actionId) });
        },
    });
}

export function useRejectEmergencyAction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (actionId: string) => rejectEmergencyAction(actionId),
        onSuccess: (_, actionId) => {
            queryClient.invalidateQueries({queryKey: ['emergencyActions']});
            queryClient.invalidateQueries({queryKey: KEYS.history(actionId)});
        },
    });
}
    export function useSetComment() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({
                             actionId,
                             body,
                         }: {
                actionId: string;
                body: SetCommentRequest;
            }) => setComment(actionId, body),
            onSuccess: (_, { actionId }) => {
                queryClient.invalidateQueries({ queryKey: ['emergencyActions'] });
                queryClient.invalidateQueries({ queryKey: KEYS.history(actionId) });
            },
        });
    }
