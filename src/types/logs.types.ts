// ─── Domain types — mirror the API-Contract.md shape exactly ─────────────────
// When the backend is ready, replace the mock with a real fetch; these types stay.

export interface Exercise {
    name: string;
    sets_count: number;
    pr_value: string;
    unit?: string;
    is_bodyweight_plus?: boolean;
}

export interface MuscleGroup {
    group_name: string;
    exercises: Exercise[];
}

export interface WorkoutSession {
    session_id: string;
    display_date: string;
    muscle_groups: MuscleGroup[];
}

export interface CalendarSummary {
    month: string;
    year: number;
    active_days: number[];
    missed_days: number[];
}

export interface LogsData {
    user_id: string;
    view_date: string; // ISO "YYYY-MM-DD"
    calendar_summary: CalendarSummary;
    workout_session: WorkoutSession | null;
}

// ─── Hook return types ────────────────────────────────────────────────────────

export interface UseLogsDataReturn {
    data: LogsData | null;
    loading: boolean;
    load: (year: number, month: number, day: number) => void;
}
