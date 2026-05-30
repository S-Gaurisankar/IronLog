'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';
import { CREATE_ACCOUNT_CONSTANTS } from 'src/constants';
import { validateCreateAccount, type CreateAccountFormData, type CreateAccountErrors } from './validation';
import {
    Logo,
    EmailIcon,
    UserIcon,
    UsernameIcon,
    PasswordIcon,
    EyeIcon,
    EyeOffIcon,
} from 'src/assets';

// ─── Static renderers ──────────────────────────────────────────────────────

const renderLogo = () => (
    <div className={styles.brand}>
        <div className={styles.logo}>
            <Logo />
        </div>
        <h1 className={styles.title}>{CREATE_ACCOUNT_CONSTANTS.IRON_LOG_TITLE}</h1>
    </div>
);

const renderFooter = () => (
    <div className={styles.footer}>
        <div className={styles.divider} />
        <p className={styles.footerText}>
            {CREATE_ACCOUNT_CONSTANTS.ALREADY_HAVE_ACCOUNT}{' '}
            <Link href="/login" className={styles.link}>
                {CREATE_ACCOUNT_CONSTANTS.SIGN_IN_LINK}
            </Link>
        </p>
    </div>
);

// ─── Field renderers ───────────────────────────────────────────────────────

interface InputFieldProps {
    id: string;
    name: string;
    label: string;
    type: string;
    autoComplete: string;
    placeholder: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
}

const renderInputField = ({
    id, name, label, type, autoComplete,
    placeholder, value, error, onChange, onBlur, icon,
}: InputFieldProps) => (
    <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrapper}>
            {icon}
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
        {error && <span className={styles.fieldError}>{error}</span>}
    </div>
);

interface NameRowProps {
    firstName: string;
    lastName: string;
    firstNameError?: string;
    lastNameError?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const renderNameRow = ({ firstName, lastName, firstNameError, lastNameError, onChange, onBlur }: NameRowProps) => (
    <div className={styles.fieldRow}>
        {renderInputField({
            id: CREATE_ACCOUNT_CONSTANTS.FIRST_NAME,
            name: CREATE_ACCOUNT_CONSTANTS.FIRST_NAME,
            label: CREATE_ACCOUNT_CONSTANTS.FIRST_NAME_LABEL,
            type: 'text',
            autoComplete: 'given-name',
            placeholder: CREATE_ACCOUNT_CONSTANTS.FIRST_NAME_PLACEHOLDER,
            value: firstName,
            error: firstNameError,
            onChange,
            onBlur,
            icon: <UserIcon />,
        })}
        {renderInputField({
            id: CREATE_ACCOUNT_CONSTANTS.LAST_NAME,
            name: CREATE_ACCOUNT_CONSTANTS.LAST_NAME,
            label: CREATE_ACCOUNT_CONSTANTS.LAST_NAME_LABEL,
            type: 'text',
            autoComplete: 'family-name',
            placeholder: CREATE_ACCOUNT_CONSTANTS.LAST_NAME_PLACEHOLDER,
            value: lastName,
            error: lastNameError,
            onChange,
            onBlur,
            icon: <UserIcon />,
        })}
    </div>
);

interface PasswordFieldProps {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    value: string;
    error?: string;
    hint?: string;
    autoComplete?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function PasswordInputField({
    id, name, label, placeholder, value, error,
    hint, autoComplete, onChange, onBlur,
}: PasswordFieldProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div className={styles.field}>
            <div className={styles.labelRow}>
                <label className={styles.label}>{label}</label>
                {hint && <span className={styles.hint}>{hint}</span>}
            </div>
            <div className={styles.inputWrapper}>
                <PasswordIcon />
                <input
                    id={id}
                    name={name}
                    type={visible ? 'text' : 'password'}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    className={`${styles.input} ${error ? styles.inputError : ''}`}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <button
                    type="button"
                    onClick={() => setVisible(v => !v)}
                    className={styles.eyeBtn}
                    aria-label={visible ? CREATE_ACCOUNT_CONSTANTS.HIDE_PASSWORD_ARIA : CREATE_ACCOUNT_CONSTANTS.SHOW_PASSWORD_ARIA}
                >
                    {visible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
            {error && <span className={styles.fieldError}>{error}</span>}
        </div>
    );
}

// ─── Submit button with per-error tooltip ──────────────────────────────────

const renderSubmitButton = (disabled: boolean, errors: CreateAccountErrors) => {
    const errorMessages = Object.values(errors).filter(Boolean) as string[];
    return (
        <div className={styles.submitContainer}>
            <button type="submit" className={styles.button} disabled={disabled}>
                <span>{CREATE_ACCOUNT_CONSTANTS.CREATE_BUTTON}</span>
            </button>
            {disabled && errorMessages.length > 0 && (
                <div className={styles.tooltip}>
                    {errorMessages.map((msg, i) => (
                        <div key={i}>{'· '}{msg}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Page ──────────────────────────────────────────────────────────────────

export default function CreateAccount() {
    const [formData, setFormData] = useState<CreateAccountFormData>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [touched, setTouched] = useState<Partial<Record<keyof CreateAccountFormData, boolean>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const { errors, isValid } = validateCreateAccount(formData);

    // Show an inline error only if that field has been blurred at least once
    const visibleErrors: CreateAccountErrors = Object.fromEntries(
        Object.entries(errors).filter(([field]) => touched[field as keyof CreateAccountFormData])
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        // Proceed with account creation logic
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {renderLogo()}
                <div className={styles.pageHeader}>
                    <h2 className={styles.pageTitle}>{CREATE_ACCOUNT_CONSTANTS.PAGE_TITLE}</h2>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {renderNameRow({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        firstNameError: visibleErrors.firstName,
                        lastNameError: visibleErrors.lastName,
                        onChange: handleChange,
                        onBlur: handleBlur,
                    })}
                    {renderInputField({
                        id: CREATE_ACCOUNT_CONSTANTS.USERNAME,
                        name: CREATE_ACCOUNT_CONSTANTS.USERNAME,
                        label: CREATE_ACCOUNT_CONSTANTS.USERNAME_LABEL,
                        type: 'text',
                        autoComplete: 'username',
                        placeholder: CREATE_ACCOUNT_CONSTANTS.USERNAME_PLACEHOLDER,
                        value: formData.username,
                        error: visibleErrors.username,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        icon: <UsernameIcon />,
                    })}
                    {renderInputField({
                        id: CREATE_ACCOUNT_CONSTANTS.EMAIL,
                        name: CREATE_ACCOUNT_CONSTANTS.EMAIL,
                        label: CREATE_ACCOUNT_CONSTANTS.EMAIL_LABEL,
                        type: 'email',
                        autoComplete: 'email',
                        placeholder: CREATE_ACCOUNT_CONSTANTS.EMAIL_PLACEHOLDER,
                        value: formData.email,
                        error: visibleErrors.email,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        icon: <EmailIcon />,
                    })}
                    <PasswordInputField
                        id={CREATE_ACCOUNT_CONSTANTS.PASSWORD}
                        name={CREATE_ACCOUNT_CONSTANTS.PASSWORD}
                        label={CREATE_ACCOUNT_CONSTANTS.PASSWORD_LABEL}
                        placeholder={CREATE_ACCOUNT_CONSTANTS.PASSWORD_PLACEHOLDER}
                        value={formData.password}
                        error={visibleErrors.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hint={CREATE_ACCOUNT_CONSTANTS.PASSWORD_HINT}
                        autoComplete="new-password"
                    />
                    <PasswordInputField
                        id={CREATE_ACCOUNT_CONSTANTS.CONFIRM_PASSWORD}
                        name={CREATE_ACCOUNT_CONSTANTS.CONFIRM_PASSWORD}
                        label={CREATE_ACCOUNT_CONSTANTS.CONFIRM_PASSWORD_LABEL}
                        placeholder={CREATE_ACCOUNT_CONSTANTS.CONFIRM_PASSWORD_PLACEHOLDER}
                        value={formData.confirmPassword}
                        error={visibleErrors.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="new-password"
                    />
                    {renderSubmitButton(!isValid, errors)}
                </form>
                {renderFooter()}
            </div>
        </div>
    );
}
