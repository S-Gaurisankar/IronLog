import type { PersonalRecord } from 'src/types';
import { PROFILE_CONSTANTS } from 'src/constants';
import styles from './page.module.css';

interface PersonalRecordsProps {
    records: PersonalRecord[];
}

function RepsDisplay({ reps }: { reps: number }) {
    if (reps) {
        if (reps === 1)
            return <span className={styles.prReps}>{reps} {PROFILE_CONSTANTS.SINGLE_REP}</span>;

        return (
            <span className={styles.prReps}>
                {reps} {PROFILE_CONSTANTS.MULTIPLE_REPS}
            </span>
        );
    }
    return null;
}

export default function PersonalRecords({ records }: PersonalRecordsProps) {
    return (
        <>
            <span className={styles.sectionTitle}>{PROFILE_CONSTANTS.PR_SECTION_TITLE}</span>
            <div className={styles.prList} aria-label={PROFILE_CONSTANTS.PR_ARIA}>
                {records.map((pr) => (
                    <div key={pr.exercise} className={styles.prItem}>
                        <div className={styles.prLeft}>
                            <span className={styles.prMuscle}>{pr.muscle_group}</span>
                            <span className={styles.prExercise}>{pr.exercise}</span>
                        </div>
                        <div className={styles.prRight}>
                            <div className={styles.prMetric}>
                                <span className={styles.prValue}>{pr.value}</span>
                                <span className={styles.prUnit}>{pr.unit}</span>
                            </div>
                            <RepsDisplay reps={pr.reps} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
