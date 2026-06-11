import { apiClient } from './client';
import { API_CONSTANTS } from 'src/constants';

// You can add proper types for sessions here later if they exist in src/types
export const sessionsApi = {
    createSession: (data: any) => 
        apiClient(API_CONSTANTS.SESSIONS, {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        
    getSessions: (page = 1, limit = 20) => 
        apiClient(`${API_CONSTANTS.SESSIONS}?page=${page}&limit=${limit}`),
        
    getSession: (id: string) => 
        apiClient(`${API_CONSTANTS.SESSIONS}/${id}`),
        
    updateSession: (id: string, data: any) => 
        apiClient(`${API_CONSTANTS.SESSIONS}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
        
    deleteSession: (id: string) => 
        apiClient(`${API_CONSTANTS.SESSIONS}/${id}`, {
            method: 'DELETE',
        }),
};
