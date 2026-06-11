'use client';

import { useState, useRef, useEffect } from 'react';
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
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedLabel = options.find(o => o.value === value)?.label ?? '— Select —';

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open]);

    return (
        <div className={styles.fieldGroup} ref={containerRef}>
            <label htmlFor={id} className={styles.fieldLabel}>
                {label}
            </label>
            <div className={styles.customSelectWrapper}>
                <button
                    id={id}
                    type="button"
                    className={`${styles.fieldInput} ${styles.customSelectTrigger}`}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    onClick={() => setOpen(prev => !prev)}
                >
                    <span className={value ? styles.customSelectValue : styles.customSelectPlaceholder}>
                        {selectedLabel}
                    </span>
                    <svg
                        className={`${styles.customSelectChevron} ${open ? styles.customSelectChevronOpen : ''}`}
                        width="12" height="12" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {open && (
                    <ul
                        className={styles.customSelectDropdown}
                        role="listbox"
                        aria-labelledby={id}
                    >
                        <li
                            key=""
                            role="option"
                            aria-selected={value === ''}
                            className={`${styles.customSelectOption} ${value === '' ? styles.customSelectOptionActive : ''}`}
                            onMouseDown={() => { onChange(''); setOpen(false); }}
                        >
                        </li>
                        {options.map(opt => (
                            <li
                                key={opt.value}
                                role="option"
                                aria-selected={value === opt.value}
                                className={`${styles.customSelectOption} ${value === opt.value ? styles.customSelectOptionActive : ''}`}
                                onMouseDown={() => { onChange(opt.value); setOpen(false); }}
                            >
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
