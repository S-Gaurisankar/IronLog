import styles from './page.module.css';

export function ProfileSkeleton() {
    return (
        <>
            <div className={`${styles.skeleton} ${styles.skeletonHeroCard}`} />
            <div className={styles.skeletonActivityRow}>
                <div className={`${styles.skeleton} ${styles.skeletonActivityCard}`} />
                <div className={`${styles.skeleton} ${styles.skeletonActivityCard}`} />
            </div>
            <div className={styles.skeletonPrContainer}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`${styles.skeleton} ${styles.skeletonPrItem}`}
                    />
                ))}
            </div>
        </>
    );
}
