import styles from './page.module.css';
import { LOGIN_CONSTANTS } from 'src/constants';
import { Logo, EmailIcon, PasswordIcon } from 'src/assets';


const renderLogo = () =>
  <div className={styles.brand}>
    <div className={styles.logo}>
      <Logo />
    </div>
    <h1 className={styles.title}>{LOGIN_CONSTANTS.IRON_LOG_TITLE}</h1>
  </div>


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
        />
      </div>
    </div>
)


const renderPasswordField = () => (
  <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={styles.label}>{LOGIN_CONSTANTS.PASSWORD_LABEL}</label>
        <a href="#" className={styles.forgot}>{LOGIN_CONSTANTS.FORGOT_PASSWORD}</a>
      </div>
      <div className={styles.inputWrapper}>
        <PasswordIcon />
        <input
          id={LOGIN_CONSTANTS.PASSWORD}
          name={LOGIN_CONSTANTS.PASSWORD}
          type={LOGIN_CONSTANTS.PASSWORD}
          placeholder={LOGIN_CONSTANTS.PASSWORD_PLACEHOLDER}
          className={styles.input}
        />
      </div>
    </div>
)


const renderSubmitButton = () => 
  <button type="submit" className={styles.button}>
      <span>{LOGIN_CONSTANTS.SIGN_IN}</span>
    </button>

const renderForm = () => (
  <form className={styles.form}>
    {renderEmailField()}
    {renderPasswordField()}
    {renderSubmitButton()}
  </form>
)


const renderFooter = () => 
  <div className={styles.footer}>
    <div className={styles.divider}></div>
    <a href="#" className={styles.signup}>{LOGIN_CONSTANTS.CREATE_ACCOUNT}</a>
  </div>


export default function Login() {
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
