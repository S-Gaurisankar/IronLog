'use client';

import type { WorkoutSession } from 'src/types';
import { LOGS_CONSTANTS } from 'src/constants';
import styles from './page.module.css';

// ─── Sub-views ────────────────────────────────────────────────────────────────

function LoadingSkeleton() {
    return (
        <div className={styles.skeletonWrapper} aria-busy="true" aria-label={LOGS_CONSTANTS.LOADING_ARIA_LABEL}>
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeleton} ${styles.skeletonGroup}`} />
            <div className={`${styles.skeleton} ${styles.skeletonItem}`} />
            <div className={`${styles.skeleton} ${styles.skeletonItem}`} />
            <div className={`${styles.skeleton} ${styles.skeletonItem}`} />
        </div>
    );
}

function EmptyState() {
    return (
        <div className={styles.emptyState} aria-label={LOGS_CONSTANTS.EMPTY_STATE_ARIA_LABEL}>
            <div className={styles.emptyIcon}>{LOGS_CONSTANTS.EMPTY_ICON}</div>
            <p className={styles.emptyTitle}>{LOGS_CONSTANTS.EMPTY_TITLE}</p>
            <p className={styles.emptySubtitle}>
                {LOGS_CONSTANTS.EMPTY_SUBTITLE_LINE_1}
                <br />
                {LOGS_CONSTANTS.EMPTY_SUBTITLE_LINE_2}
            </p>
        </div>
    );
}

interface SessionViewProps {
    session: WorkoutSession;
}



function SessionView({ session }: SessionViewProps) {
    return (
        <>
            <h2 className={styles.sessionDate}>{session.display_date}</h2>
            {session.muscle_groups.map((group) => (
                <div key={group.group_name} className={styles.muscleGroup}>
                    <h3 className={styles.groupName}>{group.group_name}</h3>
                    <ul className={styles.exerciseList}>
                        {group.exercises.map((ex, idx) => (
                            <li key={idx} className={styles.exerciseItem}>
                                <span className={styles.exName}>{ex.name}</span>
                                <div className={styles.exMetaContainer}>
                                    <span className={styles.exBadge}>
                                        {ex.sets_count} {LOGS_CONSTANTS.SETS_COUNT_LABEL}
                                    </span>
                                    <span className={`${styles.exBadge} ${styles.exPrBadge}`}>
                                        {LOGS_CONSTANTS.PR_LABEL}: {ex.pr_value}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface WorkoutDetailProps {
    loading: boolean;
    session: WorkoutSession | null | undefined;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkoutDetail({ loading, session }: WorkoutDetailProps) {
    if (!loading) {
        if (!session)
            return <EmptyState />;
        return (
            <section className={styles.detail} aria-label={LOGS_CONSTANTS.WORKOUT_DETAIL_ARIA_LABEL}>
                <SessionView session={session} />
            </section>
        )
    }
    return <LoadingSkeleton />
}
