export interface WorkoutSet {
    id: string;
    kg: string;
    reps: string;
}

export interface Exercise {
    id: string;
    name: string;
    sets: WorkoutSet[];
}

export interface MuscleGroup {
    id: string;
    name: string;
    exercises: Exercise[];
}

export type ModalType = 'muscleGroup' | 'lastExercise' | 'lastSet';

export interface ModalConfig {
    type: ModalType;
    mgId: string;
    exId?: string;
}

export interface WeightRepsField {
    key: 'kg' | 'reps';
    label: string;
    placeholder: string;
}

