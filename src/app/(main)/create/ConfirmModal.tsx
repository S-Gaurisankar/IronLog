import React from 'react';
import styles from './page.module.css';
import { CREATE_CONSTANTS } from 'src/constants';

interface ConfirmModalProps {
    title: string;
    text: string;
    onCancel: () => void;
    onConfirm: () => void;
}

function renderModalActions({ onCancel, onConfirm }) {
    return (
        <div className={styles.modalActions}>
            <button className={styles.modalCancelBtn} onClick={onCancel}>
                {CREATE_CONSTANTS.MODAL_CANCEL_BTN}
            </button>
            <button className={styles.modalDeleteBtn} onClick={onConfirm}>
                {CREATE_CONSTANTS.MODAL_CONFIRM_BTN}
            </button>
        </div>
    )
}

export default function ConfirmModal({ title, text, onCancel, onConfirm }: ConfirmModalProps) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>{title}</h2>
                <p className={styles.modalText}>{text}</p>
                {renderModalActions({ onCancel, onConfirm })}
            </div>
        </div>
    );
}
