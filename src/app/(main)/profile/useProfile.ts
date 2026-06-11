'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserProfile, EditableProfileFields } from 'src/types';
import { profileApi } from 'src/api/profile';

export function useProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editFields, setEditFields] = useState<EditableProfileFields | null>(null);

    useEffect(() => {
        profileApi.getProfile()
            .then((data) => {
                setProfile(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const startEditing = useCallback(() => {
        if (!profile) return;
        setEditFields({
            display_name: profile.display_name,
            username: profile.username,
            age: profile.age != null ? String(profile.age) : '',
            gender: profile.gender ?? '',
            weight: profile.weight != null ? String(profile.weight) : '',
            weight_unit: profile.weight_unit,
            height: profile.height ?? '',
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
            const updated = await profileApi.updateProfile(editFields);
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
