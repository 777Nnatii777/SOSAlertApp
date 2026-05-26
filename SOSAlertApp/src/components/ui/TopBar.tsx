import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {LogoutButton} from "./LogoutButton";
import { Roles, type Role } from '../../types/auth';


type Props = {
    role?: Role;
    onLogout: () => void;
};

const ROLE_CONFIG: Record<Role, { label: string; icon: keyof typeof Ionicons.glyphMap }> = {
    [Roles.Volunteer]: { label: 'Ochotnik', icon: 'person-outline' },
    [Roles.Dispatcher]: { label: 'Operator', icon: 'headset-outline' },
    [Roles.Admin]: { label: 'Administrator', icon: 'shield-outline' },
};

export function TopBar({ role, onLogout }: Props) {
    const { label, icon } = ROLE_CONFIG[role];

    return (
        <View className="flex-row items-center justify-between px-4 h-14 bg-white border-b border-neutral-200">
            <View className="flex-row items-center gap-2">
                <Ionicons name={icon} size={20} color="#171717" />
                <Text className="text-base font-medium text-neutral-900">{label}</Text>
            </View>
            <LogoutButton onPress={onLogout}/>
        </View>
    );
}