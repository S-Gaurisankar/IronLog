import styles from './page.module.css';

export function TrackSkeleton() {
    return (
        <div className={styles.page}>
            {/* Header skeleton */}
            <header className={styles.header}>
                <div className={styles.headerTextWrapper}>
                    <div className={`${styles.skeleton} ${styles.skeletonDateTitle}`} />
                    <div className={`${styles.skeleton} ${styles.skeletonSubtitle}`} />
                </div>
                <div className={`${styles.skeleton} ${styles.skeletonAddMgBtn}`} />
            </header>

            {/* Simulated Muscle Group Card Skeletons */}
            {[0, 1].map((i) => (
                <div key={i} className={styles.card}>
                    {/* Header line */}
                    <div className={styles.cardHeader}>
                        <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
                        <div className={`${styles.skeleton} ${styles.skeletonCardHeaderBtn}`} />
                    </div>

                    {/* Muscle group input skeleton */}
                    <div className={styles.inputGroup}>
                        <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
                    </div>

                    {/* Exercise Card list skeleton */}
                    <div className={styles.exerciseList}>
                        {[0].map((j) => (
                            <div key={j} className={styles.exerciseCard}>
                                <div className={styles.exerciseCardHeader}>
                                    <div className={`${styles.skeleton} ${styles.skeletonExerciseLabel}`} />
                                    <div className={`${styles.skeleton} ${styles.skeletonCardHeaderBtn}`} />
                                </div>
                                <div className={`${styles.skeleton} ${styles.skeletonExerciseInput}`} />
                                
                                {/* Sets rows skeleton */}
                                <div className={styles.setsTable}>
                                    <div className={`${styles.skeleton} ${styles.skeletonTableHeader}`} />
                                    <div className={`${styles.skeleton} ${styles.skeletonTableRow}`} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add exercise button skeleton */}
                    <div className={`${styles.skeleton} ${styles.skeletonAddExerciseBtn}`} />
                </div>
            ))}
        </div>
    );
}
