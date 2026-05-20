export const EmergencyActionStatus = {
    WaitingForVolunteers: 1,
    Accepted: 2,
    Rejected: 3,
    Completed: 4,
    Cancelled: 5,
} as const;

export type EmergencyActionStatusValue =
    (typeof EmergencyActionStatus)[keyof typeof EmergencyActionStatus];

export type EmergencyAction = {
    id: string;
    title: string;
    eventType: string;
    description: string;
    locationText: string;
    region: string;
    status: EmergencyActionStatusValue;
    createdAt: string; // ISO datetime
};

export type CreateEmergencyActionRequest = {
    title: string;
    eventType: string;
    description: string;
    locationText: string;
    region: string;
};

export const STATUS_LABELS: Record<EmergencyActionStatusValue, string> = {
    [EmergencyActionStatus.WaitingForVolunteers]: 'Czeka na ochotników',
    [EmergencyActionStatus.Accepted]: 'Zaakceptowane',
    [EmergencyActionStatus.Rejected]: 'Odrzucone',
    [EmergencyActionStatus.Completed]: 'Zakończone',
    [EmergencyActionStatus.Cancelled]: 'Anulowane',
};

export const EmergencyActionResponseStatus = {
    Accepted: 1,
    Rejected: 2,
} as const;

export type EmergencyActionResponseStatusValue =
    (typeof EmergencyActionResponseStatus)[keyof typeof EmergencyActionResponseStatus];

export type EmergencyActionResponseDto = {
    responseId: string;
    volunteerUserId: string;
    firstName: string;
    lastName: string;
    region: string;
    status: EmergencyActionResponseStatusValue;
    respondedAt: string; // ISO datetime
};

