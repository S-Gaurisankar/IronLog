import { apiClient } from './client';
import type { UserProfile, EditableProfileFields } from 'src/types';
import { API_CONSTANTS } from 'src/constants';

export const profileApi = {
    getProfile: () => 
        apiClient<UserProfile>(API_CONSTANTS.USERS_ME),
        
    updateProfile: (data: EditableProfileFields) => {
        // Build payload — only include optional fields when they have a real value.
        // The backend uses model_dump(exclude_unset=True) and validates gender
        // with min_length=1, so empty strings / nulls must be omitted entirely.
        const payload: Record<string, unknown> = {
            display_name: data.display_name,
            weight_unit: data.weight_unit,
        };

        if (data.age) payload.age = Number(data.age);
        if (data.weight) payload.weight = Number(data.weight);
        if (data.gender?.trim()) payload.gender = data.gender.trim();
        if (data.height?.trim()) payload.height = data.height.trim();

        return apiClient<UserProfile>(API_CONSTANTS.USERS_ME, {
            method: 'PUT',
            body: JSON.stringify(payload),
        });
    },
};
