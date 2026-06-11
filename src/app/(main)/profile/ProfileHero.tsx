import type { UserProfile } from 'src/types';
import { PROFILE_CONSTANTS } from 'src/constants';
import styles from './page.module.css';

interface ProfileHeroProps {
    profile: UserProfile;
    onEditClick: () => void;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

// Render Methods
function displayAvatar(name: string) {
    return (
        <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
                <span className={styles.avatarInitials}>
                    {getInitials(name)}
                </span>
            </div>
        </div>
    );
}

function displayNameHandle(name: string) {
    return (
        <div className={styles.heroInfo}>
            <h1 className={styles.displayName}>{name}</h1>
        </div>
    );
}


function editButton(onEditClick: () => void) {
    return (
        <button
            id="edit-profile-btn"
            className={styles.editProfileBtn}
            onClick={onEditClick}
            aria-label={PROFILE_CONSTANTS.EDIT_BTN_ARIA}
        >
            {PROFILE_CONSTANTS.EDIT_BTN}
        </button>
    );
}


export default function ProfileHero({ profile, onEditClick }: ProfileHeroProps) {
    const stats = [
        { label: PROFILE_CONSTANTS.STAT_AGE, value: profile.age ?? '—' },
        { label: PROFILE_CONSTANTS.STAT_GENDER, value: profile.gender ?? '—' },
        { label: PROFILE_CONSTANTS.STAT_WEIGHT, value: profile.weight ?? '—', unit: profile.weight ? profile.weight_unit : undefined },
        { label: PROFILE_CONSTANTS.STAT_HEIGHT, value: profile.height ?? '—' },
    ];

    return (
        <div className={styles.heroCard}>
            <div className={styles.heroTop}>

                {displayAvatar(profile.display_name)}

                {displayNameHandle(profile.display_name)}

                {editButton(onEditClick)}
            </div>

            {/* Stat pills */}
            <div className={styles.statsRow} aria-label={PROFILE_CONSTANTS.STATS_ARIA}>
                {stats.map((stat) => (
                    <div key={stat.label} className={styles.statItem}>
                        <span className={styles.statLabel}>{stat.label}</span>
                        <span className={styles.statValue}>
                            {stat.value}
                            {stat.unit && <span className={styles.statUnit}> {stat.unit}</span>}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
