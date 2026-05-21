import type { UserProfile } from 'src/types';
import { PROFILE_CONSTANTS } from 'src/constants';
import styles from './page.module.css';

interface ActivityStatsProps {
    profile: UserProfile;
}

export default function ActivityStats({ profile }: ActivityStatsProps) {
    const stats = [
        {
            ariaLabel: PROFILE_CONSTANTS.ACTIVITY_WORKOUTS_ARIA,
            icon: PROFILE_CONSTANTS.ACTIVITY_WORKOUTS_ICON,
            value: profile.total_workouts,
            label: PROFILE_CONSTANTS.ACTIVITY_WORKOUTS_LABEL,
        },
        {
            ariaLabel: PROFILE_CONSTANTS.ACTIVITY_EXERCISES_ARIA,
            icon: PROFILE_CONSTANTS.ACTIVITY_EXERCISES_ICON,
            value: profile.total_exercises,
            label: PROFILE_CONSTANTS.ACTIVITY_EXERCISES_LABEL,
        },
    ];

    return (
        <div className={styles.activityRow}>
            {stats.map((stat) => (
                <div key={stat.label} className={styles.activityCard} aria-label={stat.ariaLabel}>
                    <div className={styles.activityTop}>
                        <span className={styles.activityIcon}>{stat.icon}</span>
                        <span className={styles.activityValue}>
                            {stat.value.toLocaleString()}
                        </span>
                    </div>
                    <span className={styles.activityLabel}>{stat.label}</span>
                </div>
            ))}
        </div>
    );
}
