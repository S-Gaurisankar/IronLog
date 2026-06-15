'use client';

import { Suspense } from 'react';
import styles from './page.module.css';
import { PlusCircleSolidIcon, CheckCircleSolidIcon, DumbbellIcon } from 'src/assets';
import { TRACK_CONSTANTS } from 'src/constants';
import { useTrackSession } from './useTrackSession';
import MuscleGroupCard from './MuscleGroupCard';
import ConfirmModal from './ConfirmModal';
import { TrackSkeleton } from './TrackSkeleton';


//Props
interface CreateSessionHeaderProps {
    getDateHeader: () => string;
    handleAddMuscleGroup: () => void;
    isEdit: boolean;
}

interface AddMuscleGroupBtnProps {
    handleAddMuscleGroup: () => void;
}

interface EmptyStateProps {
    onAdd: () => void;
}


//Components
const AddMuscleGroupBtn = ({ handleAddMuscleGroup }: AddMuscleGroupBtnProps) => (
    <button className={styles.addMuscleGroupBtn} onClick={handleAddMuscleGroup}>
        <span className={styles.addExerciseIcon}><PlusCircleSolidIcon /></span>
        {TRACK_CONSTANTS.ADD_MUSCLE_GROUP_BTN}
    </button>
);

const CreateSessionHeader = ({
    getDateHeader,
    handleAddMuscleGroup,
    isEdit,
}: CreateSessionHeaderProps) => (
    <header className={styles.header}>
        <div className={styles.headerTextWrapper}>
            <h1 className={styles.dateTitle}>{isEdit ? TRACK_CONSTANTS.EDIT_HEADING : getDateHeader()}</h1>
            <span className={styles.subtitle}>
                {isEdit ? TRACK_CONSTANTS.EDIT_SUBTITLE : TRACK_CONSTANTS.SUBTITLE}
            </span>
        </div>
        <AddMuscleGroupBtn handleAddMuscleGroup={handleAddMuscleGroup} />
    </header>
);

const EmptyState = ({ onAdd }: EmptyStateProps) => (
    <div className={styles.emptyState}>
        <span className={styles.emptyIcon}><DumbbellIcon /></span>
        <p className={styles.emptyTitle}>{TRACK_CONSTANTS.EMPTY_STATE_HEADING}</p>
        <p className={styles.emptySubtitle}>
            {TRACK_CONSTANTS.EMPTY_STATE_SUBHEADING}
        </p>
        <AddMuscleGroupBtn handleAddMuscleGroup={onAdd} />
    </div>
);


function TrackSessionContent() {
    const {
        muscleGroups,
        modalConfig,
        setModalConfig,
        handleUpdateMuscleGroup,
        handleUpdateExercise,
        handleRemoveExercise,
        handleAddMuscleGroup,
        handleAddExercise,
        handleUpdateSet,
        handleAddSet,
        handleRemoveSet,
        confirmModalAction,
        getModalText,
        getDateHeader,
        submitSession,
        isSubmitting,
        submitError,
        isLoading,
        isEdit,
    } = useTrackSession();

    if (isLoading) {
        return <TrackSkeleton />;
    }

    if (!muscleGroups.length) {
        return (
            <div className={styles.page}>
                <CreateSessionHeader
                    getDateHeader={getDateHeader}
                    handleAddMuscleGroup={handleAddMuscleGroup}
                    isEdit={isEdit}
                />
                <EmptyState onAdd={handleAddMuscleGroup} />
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <CreateSessionHeader
                getDateHeader={getDateHeader}
                handleAddMuscleGroup={handleAddMuscleGroup}
                isEdit={isEdit}
            />

            {
                muscleGroups.map((mg) => (
                    <MuscleGroupCard
                        key={mg.id}
                        mg={mg}
                        onUpdateName={handleUpdateMuscleGroup}
                        onRemoveRequest={(mgId) => setModalConfig({ type: 'muscleGroup', mgId })}
                        onUpdateExercise={handleUpdateExercise}
                        onRemoveExercise={handleRemoveExercise}
                        handleAddExercise={handleAddExercise}
                        handleUpdateSet={handleUpdateSet}
                        handleAddSet={handleAddSet}
                        handleRemoveSet={handleRemoveSet}
                    />
                ))
            }

            <div className={styles.floatingActionContainer}>
                {submitError && (
                    <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                        {submitError}
                    </p>
                )}
                <button
                    className={styles.finalizeBtn}
                    onClick={submitSession}
                    disabled={isSubmitting}
                >
                    <span className={styles.finalizeIcon}><CheckCircleSolidIcon /></span>
                    {isSubmitting ? 'Saving…' : (isEdit ? TRACK_CONSTANTS.UPDATE_FINALIZE_BTN : TRACK_CONSTANTS.FINALIZE_BTN)}
                </button>
            </div>

            {modalConfig && (
                <ConfirmModal
                    title={getModalText().title}
                    text={getModalText().text}
                    onCancel={() => setModalConfig(null)}
                    onConfirm={confirmModalAction}
                />
            )}
        </div>
    );
}

export default function TrackSessionPage() {
    return (
        <Suspense fallback={<TrackSkeleton />}>
            <TrackSessionContent />
        </Suspense>
    );
}
