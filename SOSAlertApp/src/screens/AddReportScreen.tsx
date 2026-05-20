import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { AddReportForm } from '../components/emergencyActions/AddReportForm';

type Props = {
    onClose: () => void;
};

export function AddReportScreen({ onClose }: Props) {

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScreenHeader title="Nowe zgłoszenie" onBack={onClose} />
            <AddReportForm onSuccess={onClose} />
        </KeyboardAvoidingView>
    );
}

