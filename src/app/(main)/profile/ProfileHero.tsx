'use client';

import { useRouter } from 'next/navigation';
import type { UserProfile } from 'src/types';
import { PROFILE_CONSTANTS } from 'src/constants';
import { authApi } from 'src/api/auth';
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

export default function ProfileHero({ profile, onEditClick }: ProfileHeroProps) {
    const router = useRouter();

    const stats = [
        { label: PROFILE_CONSTANTS.STAT_AGE, value: profile.age ?? '—' },
        { label: PROFILE_CONSTANTS.STAT_GENDER, value: profile.gender ?? '—' },
        { label: PROFILE_CONSTANTS.STAT_WEIGHT, value: profile.weight ?? '—', unit: profile.weight ? profile.weight_unit : undefined },
        { label: PROFILE_CONSTANTS.STAT_HEIGHT, value: profile.height ?? '—' },
    ];

    async function handleLogout() {
        try {
            await authApi.logout();
        } catch {
            // Best-effort — clear local state regardless
        }
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className={styles.heroCard}>
            <div className={styles.heroTop}>
                {/* Avatar */}
                <div className={styles.avatarWrapper}>
                    <div className={styles.avatar}>
                        <span className={styles.avatarInitials}>
                            {getInitials(profile.display_name)}
                        </span>
                    </div>
                </div>

                {/* Name */}
                <div className={styles.heroInfo}>
                    <h1 className={styles.displayName}>{profile.display_name}</h1>
                    <span className={styles.username}>@{profile.username}</span>
                </div>

                {/* Edit button */}
                <button
                    id="edit-profile-btn"
                    className={styles.editProfileBtn}
                    onClick={onEditClick}
                    aria-label={PROFILE_CONSTANTS.EDIT_BTN_ARIA}
                >
                    {PROFILE_CONSTANTS.EDIT_BTN}
                </button>

                {/* Logout button */}
                <button
                    id="logout-btn"
                    className={styles.logoutBtn}
                    onClick={handleLogout}
                    aria-label={PROFILE_CONSTANTS.LOGOUT_BTN_ARIA}
                >
                    {/* Power-off icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                        <line x1="12" y1="2" x2="12" y2="12" />
                    </svg>
                </button>
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
