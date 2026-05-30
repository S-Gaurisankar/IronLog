import { CREATE_ACCOUNT_VALIDATION } from 'src/constants';

export interface CreateAccountFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type CreateAccountErrors = Partial<Record<keyof CreateAccountFormData, string>>;

export interface CreateAccountValidationResult {
    errors: CreateAccountErrors;
    isValid: boolean;
}

export function validateCreateAccount(formData: CreateAccountFormData): CreateAccountValidationResult {
    const errors: CreateAccountErrors = {};

    if (formData.firstName.trim().length === 0) {
        errors.firstName = CREATE_ACCOUNT_VALIDATION.FIRST_NAME_REQUIRED;
    }

    if (formData.lastName.trim().length === 0) {
        errors.lastName = CREATE_ACCOUNT_VALIDATION.LAST_NAME_REQUIRED;
    }

    if (formData.username.trim().length === 0) {
        errors.username = CREATE_ACCOUNT_VALIDATION.USERNAME_REQUIRED;
    } else if (formData.username.trim().length < CREATE_ACCOUNT_VALIDATION.USERNAME_MIN_LENGTH) {
        errors.username = CREATE_ACCOUNT_VALIDATION.USERNAME_MIN_LENGTH_ERROR;
    } else if (!CREATE_ACCOUNT_VALIDATION.USERNAME_PATTERN.test(formData.username)) {
        errors.username = CREATE_ACCOUNT_VALIDATION.USERNAME_PATTERN_ERROR;
    }

    if (formData.email.trim().length === 0) {
        errors.email = CREATE_ACCOUNT_VALIDATION.EMAIL_REQUIRED;
    } else if (!CREATE_ACCOUNT_VALIDATION.EMAIL_PATTERN.test(formData.email)) {
        errors.email = CREATE_ACCOUNT_VALIDATION.EMAIL_PATTERN_ERROR;
    }

    if (formData.password.length === 0) {
        errors.password = CREATE_ACCOUNT_VALIDATION.PASSWORD_REQUIRED;
    } else if (formData.password.length < CREATE_ACCOUNT_VALIDATION.PASSWORD_MIN_LENGTH) {
        errors.password = CREATE_ACCOUNT_VALIDATION.PASSWORD_MIN_LENGTH_ERROR;
    }

    if (formData.confirmPassword.length === 0) {
        errors.confirmPassword = CREATE_ACCOUNT_VALIDATION.CONFIRM_PASSWORD_REQUIRED;
    } else if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = CREATE_ACCOUNT_VALIDATION.CONFIRM_PASSWORD_MISMATCH;
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
}
