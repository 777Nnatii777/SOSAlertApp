import { useState } from 'react';
import { Text, Pressable, ScrollView } from 'react-native';
import { Field } from './Field';
import { RegionPicker } from './RegionPicker';
import { useCreateEmergencyAction } from '../../hooks/useEmergencyActions';

type Props = {
    onSuccess: () => void;
};

export function AddReportForm({ onSuccess }: Props) {
    const [title, setTitle] = useState('');
    const [eventType, setEventType] = useState('');
    const [description, setDescription] = useState('');
    const [locationText, setLocationText] = useState('');
    const [region, setRegion] = useState('');
    const [formError, setFormError] = useState<string>();

    const createMutation = useCreateEmergencyAction();

    const handleSubmit = async () => {
        setFormError(undefined);

        if (!title || !eventType || !locationText || !region) {
            setFormError('Wypełnij wymagane pola.');
            return;
        }

        try {
            await createMutation.mutateAsync({
                title,
                eventType,
                description,
                locationText,
                region,
            });
            onSuccess();
        } catch (err) {
            setFormError(
                err instanceof Error
                    ? err.message
                    : 'Nie udało się zapisać zgłoszenia.',
            );
        }
    };

    return (
        <ScrollView className="flex-1 p-4" keyboardShouldPersistTaps="handled">
            <Field label="Tytuł *" value={title} onChangeText={setTitle} />
            <Field
                label="Typ zdarzenia *"
                value={eventType}
                onChangeText={setEventType}
                placeholder="np. Pożar, Wypadek, Powódź"
            />
            <Field
                label="Opis"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Field
                label="Lokalizacja *"
                value={locationText}
                onChangeText={setLocationText}
                placeholder="np. ul. Floriańska 5, Kraków"
            />
            <RegionPicker value={region} onChange={setRegion} />

            {formError && (
                <Text className="text-xs text-red-600 mb-3">{formError}</Text>
            )}

            <Pressable
                onPress={handleSubmit}
                disabled={createMutation.isPending}
                className={`h-12 rounded-lg items-center justify-center ${
                    createMutation.isPending ? 'bg-neutral-300' : 'bg-brand'
                }`}
            >
                <Text className="text-white font-medium">
                    {createMutation.isPending ? 'Zapisywanie...' : 'Zapisz zgłoszenie'}
                </Text>
            </Pressable>
        </ScrollView>
    );
}