import { apiClient } from './client';
import type { LoginData, SignupData, AuthResponse } from 'src/types';
import { API_CONSTANTS } from 'src/constants';

export const authApi = {
    login: (data: LoginData) => 
        apiClient<{ access_token: string, user: AuthResponse['data']['user'] }>(API_CONSTANTS.AUTH_LOGIN, {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        
    signup: (data: SignupData) => 
        apiClient<AuthResponse['data']['user']>(API_CONSTANTS.AUTH_SIGNUP, {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        
    logout: () => 
        apiClient(API_CONSTANTS.AUTH_LOGOUT, { method: 'POST' }),
};
