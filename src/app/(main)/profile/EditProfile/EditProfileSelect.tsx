import styles from '@/app/(main)/profile/page.module.css';

interface Option {
    value: string;
    label: string;
}

interface EditProfileSelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
}

export default function EditProfileSelect({
    id,
    label,
    value,
    onChange,
    options
}: EditProfileSelectProps) {
    return (
        <div className={styles.fieldGroup}>
            <label htmlFor={id} className={styles.fieldLabel}>
                {label}
            </label>
            <select
                id={id}
                className={`${styles.fieldInput} ${styles.fieldSelect}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}
