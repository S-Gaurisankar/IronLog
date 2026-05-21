import styles from '@/app/(main)/profile/page.module.css';

interface EditProfileInputProps {
    id: string;
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    min?: number;
    max?: number;
}

export default function EditProfileInput({
    id,
    label,
    value,
    onChange,
    type = "text",
    placeholder,
    min,
    max
}: EditProfileInputProps) {
    return (
        <div className={styles.fieldGroup}>
            <label htmlFor={id} className={styles.fieldLabel}>
                {label}
            </label>
            <input
                id={id}
                className={styles.fieldInput}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete="off"
                min={min}
                max={max}
            />
        </div>
    );
}
