import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VOIVODESHIPS } from '../../constants/regions';

type Props = {
    value: string;
    onChange: (region: string) => void;
    label?: string;
};

export function RegionPicker({ value, onChange, label = 'Region *' }: Props) {
    const [pickerOpen, setPickerOpen] = useState(false);


    const displayValue = value || 'Wybierz region';

    const handleSelect = (region: string) => {
        setPickerOpen(false);
        onChange(region);

    };

    return (
        <View className="mb-3">
            <Text className="text-xs text-neutral-600 mb-1">{label}</Text>

            <Pressable
                onPress={() => setPickerOpen(true)}
                className="border border-neutral-300 rounded-lg px-3 py-2 flex-row items-center justify-between"
            >
                <Text
                    className={`text-base ${value ? 'text-neutral-900' : 'text-neutral-400'}`}
                >
                    {displayValue}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#737373" />
            </Pressable>


            <Modal
                visible={pickerOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setPickerOpen(false)}
            >
                <Pressable
                    onPress={() => setPickerOpen(false)}
                    className="flex-1 bg-black/50 justify-end"
                >
                    <Pressable
                        onPress={(e) => e.stopPropagation()}
                        className="bg-white rounded-t-2xl max-h-[70%]"
                    >
                        <View className="px-4 py-3 border-b border-neutral-200">
                            <Text className="text-base font-medium text-neutral-900">
                                Wybierz region
                            </Text>
                        </View>
                        <ScrollView>
                            {VOIVODESHIPS.map((region) => (
                                <Pressable
                                    key={region}
                                    onPress={() => handleSelect(region)}
                                    className="px-4 py-3 border-b border-neutral-100"
                                >
                                    <Text className="text-base text-neutral-900">
                                        {region}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}