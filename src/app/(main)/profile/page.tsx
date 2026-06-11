'use client';

import { useProfile } from './useProfile';
import ProfileHero from './ProfileHero';
import ActivityStats from './ActivityStats';
import PersonalRecords from './PersonalRecords';
import EditProfileModal from './EditProfileModal';
import { ProfileSkeleton } from './ProfileSkeleton';
import styles from './page.module.css';

export default function ProfilePage() {
    const {
        profile,
        loading,
        isEditing,
        isSaving,
        saveError,
        editFields,
        startEditing,
        cancelEditing,
        updateField,
        saveProfile,
    } = useProfile();

    if (loading || !profile) {
        return (
            <div className={styles.page}>
                <ProfileSkeleton />
            </div>
        )
    }


    return (
        <div className={styles.page}>
            <ProfileHero profile={profile} onEditClick={startEditing} />
            <ActivityStats profile={profile} />
            <PersonalRecords records={profile.personal_records} />

            {isEditing && editFields && (
                <EditProfileModal
                    fields={editFields}
                    isSaving={isSaving}
                    saveError={saveError}
                    onFieldChange={updateField}
                    onSave={saveProfile}
                    onCancel={cancelEditing}
                />
            )}
        </div>
    );
}
