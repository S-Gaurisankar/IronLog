import React from 'react';
import { TrashIcon, CloseIcon, PlusIcon } from 'src/assets';
import { CREATE_CONSTANTS } from 'src/constants';
import { WeightRepsField, Exercise } from './types';
import styles from './page.module.css';


// Props
interface ExerciseCardProps {
    mgId: string;
    exercise: Exercise;
    onUpdateName: (mgId: string, exId: string, name: string) => void;
    onRemove: (mgId: string, exId: string) => void;
    onUpdateSet: (mgId: string, exId: string, setId: string, field: WeightRepsField['key'], value: string) => void;
    onRemoveSet: (mgId: string, exId: string, setId: string) => void;
    onAddSet: (mgId: string, exId: string) => void;
}

interface RenderExerciseCardHeaderProps {
    onRemove: (mgId: string, exId: string) => void;
    onUpdateName: (mgId: string, exId: string, name: string) => void;
    mgId: string;
    exercise: Exercise;
}

interface RenderExerciseCardTableProps {
    exercise: Exercise;
    onUpdateSet: (mgId: string, exId: string, setId: string, field: WeightRepsField['key'], value: string) => void;
    onRemoveSet: (mgId: string, exId: string, setId: string) => void;
    onAddSet: (mgId: string, exId: string) => void;
    mgId: string;
}


// Config
const weightRepsFields: WeightRepsField[] = [
    { key: 'kg', placeholder: '0', label: CREATE_CONSTANTS.KG_LABEL },
    { key: 'reps', placeholder: '0', label: CREATE_CONSTANTS.REPS_LABEL }
];


// Render
const RenderExerciseCardHeader = ({ onRemove, onUpdateName, mgId, exercise }: RenderExerciseCardHeaderProps) => (
    <div className={styles.inputGroup}>
        <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{CREATE_CONSTANTS.EXERCISE_NAME_LABEL}</span>
            <button
                className={styles.iconButton}
                aria-label={CREATE_CONSTANTS.ARIA_REMOVE_EXERCISE}
                onClick={() => onRemove(mgId, exercise.id)}
            >
                <TrashIcon />
            </button>
        </div>

        <input
            type="text"
            className={styles.inputField}
            value={exercise.name}
            onChange={(e) => onUpdateName(mgId, exercise.id, e.target.value)}
            placeholder={CREATE_CONSTANTS.PLACEHOLDER_EXERCISE}
        />
    </div>
)


const RenderExerciseCardTable = ({ exercise, onUpdateSet, onRemoveSet, onAddSet, mgId }: RenderExerciseCardTableProps) => (
    <div className={styles.setsTable}>
        <div className={styles.tableHeader}>
            <span>{CREATE_CONSTANTS.SET_LABEL}</span>
            {weightRepsFields.map(({ key, label }) => (
                <span key={key}>{label}</span>
            ))}
        </div>

        {exercise.sets.map((set, index) => (
            <div key={set.id} className={styles.setRow}>
                <div className={styles.setNumber}>{index + 1}</div>
                {weightRepsFields.map(({ key, placeholder }) => (
                    <input
                        key={key}
                        type="number"
                        min="0"
                        className={styles.numberInput}
                        placeholder={placeholder}
                        value={set[key]}
                        onChange={(e) =>
                            onUpdateSet(mgId, exercise.id, set.id, key, e.target.value)
                        }
                    />
                ))}
                <button
                    className={styles.removeSetBtn}
                    aria-label={CREATE_CONSTANTS.ARIA_REMOVE_SET}
                    onClick={() => onRemoveSet(mgId, exercise.id, set.id)}
                >
                    <CloseIcon />
                </button>
            </div>
        ))}

        <button
            className={styles.addSetButton}
            onClick={() => onAddSet(mgId, exercise.id)}
        >
            <PlusIcon /> {CREATE_CONSTANTS.ADD_SET_BTN}
        </button>
    </div>
)


export default function ExerciseCard({
    mgId,
    exercise,
    onUpdateName,
    onRemove,
    onUpdateSet,
    onRemoveSet,
    onAddSet
}: ExerciseCardProps) {
    return (
        <div className={styles.exerciseCard}>

            <RenderExerciseCardHeader
                onRemove={onRemove}
                onUpdateName={onUpdateName}
                mgId={mgId}
                exercise={exercise} />

            <RenderExerciseCardTable
                exercise={exercise}
                onUpdateSet={onUpdateSet}
                onRemoveSet={onRemoveSet}
                onAddSet={onAddSet}
                mgId={mgId} />
        </div>
    );
}
