import { apiClient } from './client';
import type { UserProfile, EditableProfileFields } from 'src/types';
import { API_CONSTANTS } from 'src/constants';

export const profileApi = {
    getProfile: () => 
        apiClient<UserProfile>(API_CONSTANTS.USERS_ME),
        
    updateProfile: (data: EditableProfileFields) => 
        apiClient<UserProfile>(API_CONSTANTS.USERS_ME, {
            method: 'PUT',
            body: JSON.stringify({
                ...data,
                age: data.age ? Number(data.age) : null,
                weight: data.weight ? Number(data.weight) : null,
            }),
        }),
};
