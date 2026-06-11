'use client';

import styles from './page.module.css';
import { PlusCircleSolidIcon, CheckCircleSolidIcon, DumbbellIcon } from 'src/assets';
import { CREATE_CONSTANTS } from 'src/constants';
import { useCreateSession } from './useCreateSession';
import MuscleGroupCard from './MuscleGroupCard';
import ConfirmModal from './ConfirmModal';


//Props
interface CreateSessionHeaderProps {
    getDateHeader: () => string;
    handleAddMuscleGroup: () => void;
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
        {CREATE_CONSTANTS.ADD_MUSCLE_GROUP_BTN}
    </button>
);

const CreateSessionHeader = ({
    getDateHeader,
    handleAddMuscleGroup,
}: CreateSessionHeaderProps) => (
    <header className={styles.header}>
        <div className={styles.headerTextWrapper}>
            <h1 className={styles.dateTitle}>{getDateHeader()}</h1>
            <span className={styles.subtitle}>{CREATE_CONSTANTS.SUBTITLE}</span>
        </div>
        <AddMuscleGroupBtn handleAddMuscleGroup={handleAddMuscleGroup} />
    </header>
);

const EmptyState = ({ onAdd }: EmptyStateProps) => (
    <div className={styles.emptyState}>
        <span className={styles.emptyIcon}><DumbbellIcon /></span>
        <p className={styles.emptyTitle}>{CREATE_CONSTANTS.EMPTY_STATE_HEADING}</p>
        <p className={styles.emptySubtitle}>
            {CREATE_CONSTANTS.EMPTY_STATE_SUBHEADING}
        </p>
        <AddMuscleGroupBtn handleAddMuscleGroup={onAdd} />
    </div>
);


export default function CreateSessionPage() {
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
    } = useCreateSession();

    if (!muscleGroups.length) {
        return (
            <div className={styles.page}>
                <CreateSessionHeader getDateHeader={getDateHeader} handleAddMuscleGroup={handleAddMuscleGroup} />
                <EmptyState onAdd={handleAddMuscleGroup} />
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <CreateSessionHeader getDateHeader={getDateHeader} handleAddMuscleGroup={handleAddMuscleGroup} />

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
                    {isSubmitting ? 'Saving…' : CREATE_CONSTANTS.FINALIZE_BTN}
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
