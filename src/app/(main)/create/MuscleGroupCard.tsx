import React from 'react';
import styles from './page.module.css';
import { TrashIcon, PlusIcon } from 'src/assets';
import { CREATE_CONSTANTS } from 'src/constants';
import { MuscleGroup } from './types';
import ExerciseCard from './ExerciseCard';


// Props
interface MuscleGroupCardProps {
    mg: MuscleGroup;
    onUpdateName: (mgId: string, name: string) => void;
    onRemoveRequest: (mgId: string) => void;
    onUpdateExercise: (mgId: string, exId: string, name: string) => void;
    onRemoveExercise: (mgId: string, exId: string) => void;
    handleAddExercise: (mgId: string) => void;
    handleUpdateSet: (mgId: string, exId: string, setId: string, field: 'kg' | 'reps', value: string) => void;
    handleAddSet: (mgId: string, exId: string) => void;
    handleRemoveSet: (mgId: string, exId: string, setId: string) => void;
}

interface MuscleGroupCardHeaderProps {
    mg: MuscleGroup;
    onUpdateName: (mgId: string, name: string) => void;
    onRemoveRequest: (mgId: string) => void;
}


//Render
const MuscleGroupHeader = ({ onRemoveRequest, onUpdateName, mg }: MuscleGroupCardHeaderProps) => (

    <div className={styles.inputGroup}>
        <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{CREATE_CONSTANTS.MUSCLE_GROUP_LABEL}</span>
            <button
                className={`${styles.iconButton} ${styles.parentTrashBtn}`}
                aria-label={CREATE_CONSTANTS.ARIA_REMOVE_MUSCLE_GROUP}
                onClick={() => onRemoveRequest(mg.id)}
            >
                <TrashIcon />
            </button>
        </div>

        <input
            type="text"
            className={styles.inputField}
            value={mg.name}
            onChange={(e) => onUpdateName(mg.id, e.target.value)}
            placeholder={CREATE_CONSTANTS.PLACEHOLDER_MUSCLE_GROUP}
        />
    </div>
)


export default function MuscleGroupCard({
    mg,
    onUpdateName,
    onRemoveRequest,
    onUpdateExercise,
    onRemoveExercise,
    handleAddExercise,
    handleUpdateSet,
    handleAddSet,
    handleRemoveSet
}: MuscleGroupCardProps) {
    return (
        <div className={styles.card}>

            <MuscleGroupHeader
                onRemoveRequest={onRemoveRequest}
                onUpdateName={onUpdateName}
                mg={mg}
            />

            {mg.exercises.map(ex => (
                <ExerciseCard
                    key={ex.id}
                    mgId={mg.id}
                    exercise={ex}
                    onUpdateName={onUpdateExercise}
                    onRemove={onRemoveExercise}
                    onUpdateSet={handleUpdateSet}
                    onRemoveSet={handleRemoveSet}
                    onAddSet={handleAddSet}
                />
            ))}

            <button
                className={styles.addInnerExerciseBtn}
                onClick={() => handleAddExercise(mg.id)}
            >
                <PlusIcon /> {CREATE_CONSTANTS.ADD_EXERCISE_BTN}
            </button>
        </div>
    );
}
