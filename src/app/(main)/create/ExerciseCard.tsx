import React from 'react';
import { TrashIcon, CloseIcon, PlusIcon } from 'src/assets';
import { CREATE_CONSTANTS } from 'src/constants';
import { WeightRepsField, Exercise, WorkoutSet } from './types';
import styles from './page.module.css';

//Props
interface ExerciseCardProps {
    mgId: string;
    exercise: Exercise;
    onUpdateName: (mgId: string, exId: string, name: string) => void;
    onRemove: (mgId: string, exId: string) => void;
    onUpdateSet: (mgId: string, exId: string, setId: string, field: WeightRepsField['key'], value: string) => void;
    onRemoveSet: (mgId: string, exId: string, setId: string) => void;
    onAddSet: (mgId: string, exId: string) => void;
}

interface SetRowProps {
    index: number;
    set: WorkoutSet;
    onUpdate: (key: WeightRepsField['key'], value: string) => void;
    onRemove: () => void;
}

interface SetsTableProps {
    exercise: Exercise;
    onUpdateSet: (setId: string, key: WeightRepsField['key'], value: string) => void;
    onRemoveSet: (setId: string) => void;
    onAddSet: () => void;
}


//Config
const weightRepsFields: WeightRepsField[] = [
    { key: 'kg', placeholder: '0', label: CREATE_CONSTANTS.KG_LABEL },
    { key: 'reps', placeholder: '0', label: CREATE_CONSTANTS.REPS_LABEL },
];


//Render
const ExerciseHeader = ({ onRemove }: { onRemove: () => void }) => (
    <div className={styles.exerciseCardHeader}>
        <span className={styles.exerciseName}>{CREATE_CONSTANTS.EXERCISE_NAME_LABEL}</span>
        <button
            className={styles.iconButton}
            aria-label={CREATE_CONSTANTS.ARIA_REMOVE_EXERCISE}
            onClick={onRemove}
        >
            <TrashIcon />
        </button>
    </div>
);

const ExerciseInput = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
    <input
        type="text"
        className={styles.inputField}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={CREATE_CONSTANTS.PLACEHOLDER_EXERCISE}
    />
);

const SetRow = ({ index, set, onUpdate, onRemove }: SetRowProps) => (
    <div className={styles.setRow}>
        <div className={styles.setNumber}>{index + 1}</div>
        {weightRepsFields.map(({ key, placeholder }) => (
            <input
                key={key}
                type="number"
                min="0"
                className={styles.numberInput}
                placeholder={placeholder}
                value={set[key]}
                onChange={(e) => onUpdate(key, e.target.value)}
            />
        ))}
        <button
            className={styles.removeSetBtn}
            aria-label={CREATE_CONSTANTS.ARIA_REMOVE_SET}
            onClick={onRemove}
        >
            <CloseIcon />
        </button>
    </div>
);

const SetsTable = ({ exercise, onUpdateSet, onRemoveSet, onAddSet }: SetsTableProps) => (
    <div className={styles.setsTable}>
        <div className={styles.tableHeader}>
            <span>{CREATE_CONSTANTS.SET_LABEL}</span>
            {weightRepsFields.map(({ key, label }) => (
                <span key={key}>{label}</span>
            ))}
            <span />
        </div>

        {exercise.sets.map((set, index) => (
            <SetRow
                key={set.id}
                index={index}
                set={set}
                onUpdate={(key, value) => onUpdateSet(set.id, key, value)}
                onRemove={() => onRemoveSet(set.id)}
            />
        ))}

        <button
            className={styles.addSetButton}
            onClick={onAddSet}
        >
            <PlusIcon /> {CREATE_CONSTANTS.ADD_SET_BTN}
        </button>
    </div>
);

export default function ExerciseCard({
    mgId,
    exercise,
    onUpdateName,
    onRemove,
    onUpdateSet,
    onRemoveSet,
    onAddSet,
}: ExerciseCardProps) {
    return (
        <div className={styles.exerciseCard}>
            <ExerciseHeader onRemove={() => onRemove(mgId, exercise.id)} />
            <ExerciseInput
                value={exercise.name}
                onChange={(val) => onUpdateName(mgId, exercise.id, val)}
            />
            <SetsTable
                exercise={exercise}
                onUpdateSet={(setId, key, value) => onUpdateSet(mgId, exercise.id, setId, key, value)}
                onRemoveSet={(setId) => onRemoveSet(mgId, exercise.id, setId)}
                onAddSet={() => onAddSet(mgId, exercise.id)}
            />
        </div>
    );
}
