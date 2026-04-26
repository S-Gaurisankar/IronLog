'use client';

import styles from './page.module.css';
import { PlusCircleSolidIcon, CheckCircleSolidIcon } from 'src/assets';
import { CREATE_CONSTANTS } from 'src/constants';
import { useCreateSession } from './useCreateSession';
import MuscleGroupCard from './MuscleGroupCard';
import ConfirmModal from './ConfirmModal';


const AddMuscleGroupBtn = ({ handleAddMuscleGroup }: { handleAddMuscleGroup: () => void }) => {
    return (
        <button className={styles.addMuscleGroupBtn} onClick={handleAddMuscleGroup}>
            <span className={styles.addExerciseIcon}><PlusCircleSolidIcon /></span>
            {CREATE_CONSTANTS.ADD_MUSCLE_GROUP_BTN}
        </button>
    )
}

const CreateSessionHeader = ({ getDateHeader, handleAddMuscleGroup }: { getDateHeader: () => string, handleAddMuscleGroup: () => void }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerTextWrapper}>
                <h1 className={styles.dateTitle}>{getDateHeader()}</h1>
                <span className={styles.subtitle}>{CREATE_CONSTANTS.SUBTITLE}</span>
            </div>
            <AddMuscleGroupBtn handleAddMuscleGroup={handleAddMuscleGroup} />
        </header>
    )
}


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
        getDateHeader
    } = useCreateSession()

    return (
        <div className={styles.page}>
            <CreateSessionHeader getDateHeader={getDateHeader} handleAddMuscleGroup={handleAddMuscleGroup} />

            {muscleGroups.map(mg => (
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
            ))}


            <div className={styles.floatingActionContainer}>
                <button className={styles.finalizeBtn}>
                    {CREATE_CONSTANTS.FINALIZE_BTN}
                    <span className={styles.finalizeIcon}><CheckCircleSolidIcon /></span>
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
