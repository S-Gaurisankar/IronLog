export const CREATE_ACCOUNT_VALIDATION = {
    FIRST_NAME_REQUIRED: 'First name is required.',
    LAST_NAME_REQUIRED: 'Last name is required.',
    USERNAME_REQUIRED: 'Username is required.',
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MIN_LENGTH_ERROR: 'Username must be at least 3 characters.',
    USERNAME_PATTERN: /^[a-zA-Z0-9_]+$/,
    USERNAME_PATTERN_ERROR: 'Only letters, numbers, and underscores allowed.',
    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    EMAIL_PATTERN_ERROR: 'Enter a valid email address.',
    PASSWORD_REQUIRED: 'Password is required.',
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MIN_LENGTH_ERROR: 'Password must be at least 8 characters.',
    CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password.',
    CONFIRM_PASSWORD_MISMATCH: 'Passwords do not match.',
};

export const FORGOT_PASSWORD_VALIDATION = {
    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    EMAIL_PATTERN_ERROR: 'Enter a valid email address.',
};
