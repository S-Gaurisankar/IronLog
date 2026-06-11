export interface LoginData {
    email?: string;
    password?: string;
}

export interface SignupData {
    email?: string;
    username?: string;
    password?: string;
    display_name?: string;
}

export interface AuthResponse {
    status: string;
    data: {
        access_token: string;
        token_type: string;
        user: {
            id: string;
            email: string;
            username: string;
            display_name: string;
        };
    };
}
