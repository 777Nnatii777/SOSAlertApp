import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSetComment } from '../../hooks/useEmergencyActions';

type Props = {
    actionId: string;
    initialComment: string | null;
    canEdit: boolean;
};

export function CommentSection({ actionId, initialComment, canEdit }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(initialComment ?? '');
    const setCommentMutation = useSetComment();

    const handleSave = async () => {
        await setCommentMutation.mutateAsync({
            actionId,
            body: { comment: draft.trim() || null },
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDraft(initialComment ?? '');
        setIsEditing(false);
    };

    if (!canEdit) {
        return (
            <View className="p-4">
                {initialComment ? (
                    <Text className="text-sm text-neutral-700">{initialComment}</Text>
                ) : (
                    <Text className="text-sm text-neutral-400">Brak komentarza.</Text>
                )}
            </View>
        );
    }

    if (isEditing) {
        return (
            <View className="p-4 gap-2">
                <TextInput
                    value={draft}
                    onChangeText={setDraft}
                    placeholder="Opisz przebieg akcji, wnioski, uwagi..."
                    placeholderTextColor="#a3a3a3"
                    multiline
                    numberOfLines={4}
                    maxLength={2000}
                    className="min-h-24 p-3 border border-neutral-300 rounded text-sm text-neutral-900"
                    textAlignVertical="top"
                />
                <View className="flex-row gap-2">
                    <Pressable
                        onPress={handleSave}
                        disabled={setCommentMutation.isPending}
                        className="flex-1 h-10 rounded bg-brand active:bg-brand-dark items-center justify-center disabled:opacity-50"
                    >
                        <Text className="text-white text-sm font-medium">
                            {setCommentMutation.isPending ? 'Zapisywanie...' : 'Zapisz'}
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={handleCancel}
                        disabled={setCommentMutation.isPending}
                        className="flex-1 h-10 rounded border border-neutral-300 items-center justify-center"
                    >
                        <Text className="text-sm text-neutral-700">Anuluj</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View className="p-4">
            {initialComment ? (
                <View className="gap-2">
                    <Text className="text-sm text-neutral-700">{initialComment}</Text>
                    <Pressable
                        onPress={() => setIsEditing(true)}
                        className="flex-row items-center gap-1 self-start"
                    >
                        <Ionicons name="pencil" size={14} color="#737373" />
                        <Text className="text-xs text-neutral-500">Edytuj</Text>
                    </Pressable>
                </View>
            ) : (
                <Pressable
                    onPress={() => setIsEditing(true)}
                    className="flex-row items-center gap-2"
                >
                    <Ionicons name="add-circle-outline" size={18} color="#c90a02" />
                    <Text className="text-sm text-brand font-medium">Dodaj komentarz</Text>
                </Pressable>
            )}
        </View>
    );
}