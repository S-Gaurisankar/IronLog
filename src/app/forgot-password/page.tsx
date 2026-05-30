'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';
import { FORGOT_PASSWORD_CONSTANTS } from 'src/constants';
import { Logo, EmailIcon, ArrowLeftIcon, MailSentIcon } from 'src/assets';
import { validateForgotPassword, type ForgotPasswordFormData, type ForgotPasswordErrors } from './validation';

// ─── Static renderers ──────────────────────────────────────────────────────

const renderLogo = () => (
    <div className={styles.brand}>
        <div className={styles.logo}>
            <Logo />
        </div>
        <h1 className={styles.title}>{FORGOT_PASSWORD_CONSTANTS.IRON_LOG_TITLE}</h1>
    </div>
);

const renderPageHeader = () => (
    <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>{FORGOT_PASSWORD_CONSTANTS.PAGE_TITLE}</h2>
        <p className={styles.pageSubtitle}>{FORGOT_PASSWORD_CONSTANTS.PAGE_SUBTITLE}</p>
    </div>
);

const renderBackLink = () => (
    <Link href="/login" className={styles.backLink}>
        <ArrowLeftIcon />
        <span>{FORGOT_PASSWORD_CONSTANTS.BACK_TO_LOGIN}</span>
    </Link>
);

// ─── Field renderer ────────────────────────────────────────────────────────

interface EmailFieldProps {
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const renderEmailField = ({ value, error, onChange, onBlur }: EmailFieldProps) => (
    <div className={styles.field}>
        <label className={styles.label}>{FORGOT_PASSWORD_CONSTANTS.EMAIL_LABEL}</label>
        <div className={styles.inputWrapper}>
            <EmailIcon />
            <input
                id={FORGOT_PASSWORD_CONSTANTS.EMAIL}
                name={FORGOT_PASSWORD_CONSTANTS.EMAIL}
                type={FORGOT_PASSWORD_CONSTANTS.EMAIL}
                autoComplete={FORGOT_PASSWORD_CONSTANTS.EMAIL}
                placeholder={FORGOT_PASSWORD_CONSTANTS.EMAIL_PLACEHOLDER}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
        {error && <span className={styles.fieldError}>{error}</span>}
    </div>
);

// ─── Submit button with per-error tooltip ──────────────────────────────────

const renderSubmitButton = (disabled: boolean, errors: ForgotPasswordErrors) => {
    const errorMessages = Object.values(errors).filter(Boolean) as string[];
    return (
        <div className={styles.submitContainer}>
            <button type="submit" className={styles.button} disabled={disabled}>
                <span>{FORGOT_PASSWORD_CONSTANTS.SUBMIT_BUTTON}</span>
            </button>
            {disabled && errorMessages.length > 0 && (
                <div className={styles.tooltip}>
                    {errorMessages.map((msg, i) => (
                        <div key={i}>{'- '}{msg}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Success state ─────────────────────────────────────────────────────────

function SuccessState({ onResend }: { onResend: () => void }) {
    return (
        <div className={styles.successState}>
            <div className={styles.successIconWrapper}>
                <MailSentIcon />
            </div>
            <h2 className={styles.successTitle}>{FORGOT_PASSWORD_CONSTANTS.SUCCESS_TITLE}</h2>
            <p className={styles.successMessage}>{FORGOT_PASSWORD_CONSTANTS.SUCCESS_MESSAGE}</p>
            <p className={styles.resendRow}>
                {FORGOT_PASSWORD_CONSTANTS.RESEND_LABEL}{' '}
                <button type="button" onClick={onResend} className={styles.resendBtn}>
                    {FORGOT_PASSWORD_CONSTANTS.RESEND_LINK}
                </button>
            </p>
            {renderBackLink()}
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ForgotPassword() {
    const [formData, setFormData] = useState<ForgotPasswordFormData>({ email: '' });
    const [touched, setTouched] = useState<Partial<Record<keyof ForgotPasswordFormData, boolean>>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const { errors, isValid } = validateForgotPassword(formData);

    const visibleErrors: ForgotPasswordErrors = Object.fromEntries(
        Object.entries(errors).filter(([field]) => touched[field as keyof ForgotPasswordFormData])
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        setSubmitted(true);
    };

    const handleResend = () => {
        setFormData({ email: '' });
        setTouched({});
        setSubmitted(false);
    };

    if (submitted)
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    {renderLogo()}
                    <SuccessState onResend={handleResend} />
                </div>
            </div>
        );

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {renderLogo()}
                {renderPageHeader()}
                <form className={styles.form} onSubmit={handleSubmit}>
                    {renderEmailField({
                        value: formData.email,
                        error: visibleErrors.email,
                        onChange: handleChange,
                        onBlur: handleBlur,
                    })}
                    {renderSubmitButton(!isValid, errors)}
                </form>
                <div className={styles.footer}>
                    <div className={styles.divider} />
                    {renderBackLink()}
                </div>
            </div>
        </div>
    );
}
