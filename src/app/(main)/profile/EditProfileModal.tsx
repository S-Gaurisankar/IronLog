'use client';

import type { EditableProfileFields } from 'src/types';
import { PROFILE_CONSTANTS } from 'src/constants';
import styles from './page.module.css';
import EditProfileInput from './EditProfile/EditProfileInput';
import EditProfileSelect from './EditProfile/EditProfileSelect';
import EditProfileWeight from './EditProfile/EditProfileWeight';

interface EditProfileModalProps {
    fields: EditableProfileFields;
    isSaving: boolean;
    saveError: string | null;
    onFieldChange: (key: keyof EditableProfileFields, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export default function EditProfileModal({
    fields,
    isSaving,
    saveError,
    onFieldChange,
    onSave,
    onCancel,
}: EditProfileModalProps) {
    const genderOptions = [
        { value: PROFILE_CONSTANTS.GENDER_MALE, label: PROFILE_CONSTANTS.GENDER_MALE },
        { value: PROFILE_CONSTANTS.GENDER_FEMALE, label: PROFILE_CONSTANTS.GENDER_FEMALE },
        { value: PROFILE_CONSTANTS.GENDER_NON_BINARY, label: PROFILE_CONSTANTS.GENDER_NON_BINARY },
        { value: PROFILE_CONSTANTS.GENDER_OTHER, label: PROFILE_CONSTANTS.GENDER_OTHER },
    ];

    return (
        <div
            className={styles.modalOverlay}
            onClick={(e) => e.target === e.currentTarget && onCancel()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={PROFILE_CONSTANTS.EDIT_MODAL_ARIA}
        >
            <div className={styles.editModal}>
                <div className={styles.modalHeader}>
                    <h2 id={PROFILE_CONSTANTS.EDIT_MODAL_ARIA} className={styles.modalTitle}>
                        {PROFILE_CONSTANTS.EDIT_MODAL_TITLE}
                    </h2>
                    <button
                        className={styles.modalCloseBtn}
                        onClick={onCancel}
                        aria-label={PROFILE_CONSTANTS.EDIT_MODAL_CLOSE_ARIA}
                    >
                        {PROFILE_CONSTANTS.EDIT_MODAL_CLOSE_ICON}
                    </button>
                </div>

                <form
                    className={styles.editForm}
                    onSubmit={(e) => { e.preventDefault(); onSave(); }}
                >
                    <EditProfileInput
                        id="edit-display-name"
                        label={PROFILE_CONSTANTS.FIELD_DISPLAY_NAME}
                        value={fields.display_name}
                        onChange={(val) => onFieldChange('display_name', val)}
                        placeholder={PROFILE_CONSTANTS.PLACEHOLDER_NAME}
                    />

                    <EditProfileInput
                        id="edit-username"
                        label={PROFILE_CONSTANTS.FIELD_USERNAME}
                        value={fields.username}
                        onChange={(val) => onFieldChange('username', val)}
                        placeholder={PROFILE_CONSTANTS.PLACEHOLDER_USERNAME}
                    />

                    <div className={styles.fieldRow}>
                        <EditProfileInput
                            id="edit-age"
                            label={PROFILE_CONSTANTS.FIELD_AGE}
                            value={fields.age}
                            onChange={(val) => onFieldChange('age', val)}
                            type="number"
                            min={10}
                            max={120}
                        />
                        <EditProfileSelect
                            id="edit-gender"
                            label={PROFILE_CONSTANTS.FIELD_GENDER}
                            value={fields.gender}
                            onChange={(val) => onFieldChange('gender', val)}
                            options={genderOptions}
                        />
                    </div>

                    <EditProfileWeight
                        weightValue={fields.weight}
                        unitValue={fields.weight_unit}
                        onWeightChange={(val) => onFieldChange('weight', val)}
                        onUnitChange={(val) => onFieldChange('weight_unit', val)}
                    />

                    <EditProfileInput
                        id="edit-height"
                        label={PROFILE_CONSTANTS.FIELD_HEIGHT}
                        value={fields.height}
                        onChange={(val) => onFieldChange('height', val)}
                        placeholder={PROFILE_CONSTANTS.PLACEHOLDER_HEIGHT}
                    />

                    <div className={styles.modalActions}>
                        {saveError && (
                            <p className={styles.saveError}>{saveError}</p>
                        )}
                        <div className={styles.modalActionBtns}>
                            <button
                                type="button"
                                id="edit-cancel-btn"
                                className={styles.cancelBtn}
                                onClick={onCancel}
                                disabled={isSaving}
                            >
                                {PROFILE_CONSTANTS.BTN_CANCEL}
                            </button>
                            <button
                                type="submit"
                                id="edit-save-btn"
                                className={styles.saveBtn}
                                disabled={isSaving}
                            >
                                {isSaving ? PROFILE_CONSTANTS.BTN_SAVING : PROFILE_CONSTANTS.BTN_SAVE}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
