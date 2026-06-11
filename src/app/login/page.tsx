'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { LOGIN_CONSTANTS } from 'src/constants';
import { Logo, EmailIcon, PasswordIcon } from 'src/assets';
import { useAuth } from 'src/contexts/AuthContext';
import { ApiError } from 'src/api/client';

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get(LOGIN_CONSTANTS.EMAIL) as string;
    const password = formData.get(LOGIN_CONSTANTS.PASSWORD) as string;

    try {
      await login({ email, password });
      // Redirect happens in AuthContext
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderLogo = () => (
    <div className={styles.brand}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <h1 className={styles.title}>{LOGIN_CONSTANTS.IRON_LOG_TITLE}</h1>
    </div>
  );

  const renderEmailField = () => (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={styles.label}>{LOGIN_CONSTANTS.EMAIL_LABEL}</label>
      </div>

      <div className={styles.inputWrapper}>
        <EmailIcon />
        <input
          id={LOGIN_CONSTANTS.EMAIL}
          name={LOGIN_CONSTANTS.EMAIL}
          type={LOGIN_CONSTANTS.EMAIL}
          placeholder={LOGIN_CONSTANTS.EMAIL_PLACEHOLDER}
          className={styles.input}
          required
        />
      </div>
    </div>
  );

  const renderPasswordField = () => (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={styles.label}>{LOGIN_CONSTANTS.PASSWORD_LABEL}</label>
        <Link href={LOGIN_CONSTANTS.FORGOT_PASSWORD_URL} className={styles.forgot}>
          {LOGIN_CONSTANTS.FORGOT_PASSWORD}
        </Link>
      </div>
      <div className={styles.inputWrapper}>
        <PasswordIcon />
        <input
          id={LOGIN_CONSTANTS.PASSWORD}
          name={LOGIN_CONSTANTS.PASSWORD}
          type={LOGIN_CONSTANTS.PASSWORD}
          placeholder={LOGIN_CONSTANTS.PASSWORD_PLACEHOLDER}
          className={styles.input}
          required
        />
      </div>
    </div>
  );

  const renderSubmitButton = () => (
    <button type="submit" className={styles.button} disabled={loading}>
      <span>{loading ? 'Signing in...' : LOGIN_CONSTANTS.SIGN_IN}</span>
    </button>
  );

  const renderForm = () => (
    <form className={styles.form} onSubmit={handleSubmit}>
      {renderEmailField()}
      {renderPasswordField()}
      {error && <div style={{ color: 'red', marginTop: '10px', fontSize: '0.9rem' }}>{error}</div>}
      {renderSubmitButton()}
    </form>
  );

  const renderFooter = () => (
    <div className={styles.footer}>
      <div className={styles.divider}></div>
      <Link href={LOGIN_CONSTANTS.SIGN_UP_URL} className={styles.signup}>
        {LOGIN_CONSTANTS.CREATE_ACCOUNT}
      </Link>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {renderLogo()}
        {renderForm()}
        {renderFooter()}
      </div>
    </div>
  );
}
