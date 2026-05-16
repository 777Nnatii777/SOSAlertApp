import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type HomeTab = 'map' | 'list';

type Props = {
    active: HomeTab;
    onChange: (tab: HomeTab) => void;
    onAddReport: () => void;
};

export function BottomBar({ active, onChange, onAddReport }: Props) {
    return (
        <View className="flex-row items-center border-t border-neutral-200 bg-white h-16">
            <TabButton
                label="Zgłoszenia"
                icon="list-outline"
                active={active === 'list'}
                onPress={() => onChange('list')}
            />
            <TabButton
                label="Mapa"
                icon="map-outline"
                active={active === 'map'}
                onPress={() => onChange('map')}
            />
        </View>
    );
}

function TabButton({
                       label,
                       icon,
                       active,
                       onPress,
                   }: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    active: boolean;
    onPress: () => void;
}) {
    const color = active ? '#c90a02' : '#737373';
    return (
        <Pressable
            onPress={onPress}
            className="flex-1 items-center justify-center h-full gap-0.5"
        >
            <Ionicons name={icon} size={22} color={color} />
            <Text
                className={`text-xs ${active ? 'text-brand font-medium' : 'text-neutral-500'}`}
            >
                {label}
            </Text>
        </Pressable>
    );
}