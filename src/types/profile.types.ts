// ─── Profile domain types ─────────────────────────────────────────────────────

export type WeightUnit = 'lbs' | 'kg';
export type HeightUnit = 'ft' | 'cm';

export interface PersonalRecord {
    muscle_group: string;
    exercise: string;
    value: number;
    unit: WeightUnit;
    reps?: number;
}

export interface UserProfile {
    username: string;
    display_name: string;
    age: number | null;
    gender: string | null;
    weight: number | null;
    weight_unit: WeightUnit;
    height: string | null; // e.g. "6'1\"" or "185 cm"
    avatar_url?: string;
    personal_records: PersonalRecord[];
    total_workouts: number;
    total_exercises: number;
}

export interface EditableProfileFields {
    display_name: string;
    username: string;
    age: string;
    gender: string;
    weight: string;
    weight_unit: WeightUnit;
    height: string;
}
