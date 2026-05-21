'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserProfile, EditableProfileFields } from 'src/types';
import { fetchProfileData, updateProfileData } from 'src/mock/profile.mock';

export function useProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editFields, setEditFields] = useState<EditableProfileFields | null>(null);

    useEffect(() => {
        fetchProfileData().then((data) => {
            setProfile(data);
            setLoading(false);
        });
    }, []);

    const startEditing = useCallback(() => {
        if (!profile) return;
        setEditFields({
            display_name: profile.display_name,
            username: profile.username,
            age: String(profile.age),
            gender: profile.gender,
            weight: String(profile.weight),
            weight_unit: profile.weight_unit,
            height: profile.height,
        });
        setIsEditing(true);
    }, [profile]);

    const cancelEditing = useCallback(() => {
        setIsEditing(false);
        setEditFields(null);
    }, []);

    const updateField = useCallback(
        (key: keyof EditableProfileFields, value: string) => {
            setEditFields((prev) => (prev ? { ...prev, [key]: value } : prev));
        },
        []
    );

    const saveProfile = useCallback(async () => {
        if (!editFields) return;
        setIsSaving(true);
        try {
            const updated = await updateProfileData({
                display_name: editFields.display_name,
                username: editFields.username,
                age: Number(editFields.age),
                gender: editFields.gender,
                weight: Number(editFields.weight),
                weight_unit: editFields.weight_unit,
                height: editFields.height,
            });
            setProfile(updated);
            setIsEditing(false);
            setEditFields(null);
        } finally {
            setIsSaving(false);
        }
    }, [editFields]);

    return {
        profile,
        loading,
        isEditing,
        isSaving,
        editFields,
        startEditing,
        cancelEditing,
        updateField,
        saveProfile,
    };
}
