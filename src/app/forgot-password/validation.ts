import { FORGOT_PASSWORD_VALIDATION } from 'src/constants';

export interface ForgotPasswordFormData {
    email: string;
}

export type ForgotPasswordErrors = Partial<Record<keyof ForgotPasswordFormData, string>>;

export interface ForgotPasswordValidationResult {
    errors: ForgotPasswordErrors;
    isValid: boolean;
}

export function validateForgotPassword(formData: ForgotPasswordFormData): ForgotPasswordValidationResult {
    const errors: ForgotPasswordErrors = {};

    if (formData.email.trim().length === 0) {
        errors.email = FORGOT_PASSWORD_VALIDATION.EMAIL_REQUIRED;
    } else if (!FORGOT_PASSWORD_VALIDATION.EMAIL_PATTERN.test(formData.email)) {
        errors.email = FORGOT_PASSWORD_VALIDATION.EMAIL_PATTERN_ERROR;
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
}
