export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export class ApiError extends Error {
    public status: number;
    public errors: any[];

    constructor(message: string, status: number, errors: any[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.name = 'ApiError';
    }
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Parse response as JSON (if there is content)
    let data;
    try {
        data = await response.json();
    } catch {
        data = null; // Some responses might be empty 204s, etc.
    }

    if (!response.ok) {
        // Backend API Contract ensures errors are shaped like:
        // { status: "error", message: string, errors: [{ field, message, code }] }
        const message = data?.message || 'An unexpected error occurred';
        const errors = data?.errors || [];
        throw new ApiError(message, response.status, errors);
    }

    // Success responses are shaped like:
    // { status: "success", data: T, meta: { ... } }
    return data?.data as T;
}
