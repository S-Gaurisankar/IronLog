import { PROFILE_CONSTANTS } from 'src/constants';
import styles from '@/app/(main)/profile/page.module.css';

interface EditProfileWeightProps {
    weightValue: string | number;
    unitValue: string;
    onWeightChange: (value: string) => void;
    onUnitChange: (value: string) => void;
}

export default function EditProfileWeight({
    weightValue,
    unitValue,
    onWeightChange,
    onUnitChange
}: EditProfileWeightProps) {
    return (
        <div className={styles.fieldGroup}>
            <label htmlFor="edit-weight" className={styles.fieldLabel}>
                {PROFILE_CONSTANTS.FIELD_WEIGHT}
            </label>
            <div className={styles.weightRow}>
                <input
                    id="edit-weight"
                    className={styles.fieldInput}
                    type="number"
                    min={0}
                    value={weightValue}
                    onChange={(e) => onWeightChange(e.target.value)}
                />
                <div className={styles.unitToggle} role="group" aria-label={PROFILE_CONSTANTS.WEIGHT_UNIT_ARIA}>
                    <button
                        type="button"
                        id="weight-unit-lbs"
                        className={`${styles.unitBtn} ${unitValue === PROFILE_CONSTANTS.UNIT_LBS ? styles.unitBtnActive : ''}`}
                        onClick={() => onUnitChange(PROFILE_CONSTANTS.UNIT_LBS)}
                    >
                        {PROFILE_CONSTANTS.UNIT_LBS}
                    </button>
                    <button
                        type="button"
                        id="weight-unit-kg"
                        className={`${styles.unitBtn} ${unitValue === PROFILE_CONSTANTS.UNIT_KG ? styles.unitBtnActive : ''}`}
                        onClick={() => onUnitChange(PROFILE_CONSTANTS.UNIT_KG)}
                    >
                        {PROFILE_CONSTANTS.UNIT_KG}
                    </button>
                </div>
            </div>
        </div>
    );
}
