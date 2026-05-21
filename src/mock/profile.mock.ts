// ─── Profile mock data ────────────────────────────────────────────────────────
// Mirrors the expected API shape. Replace fetchProfileData() with a real call.

import type { UserProfile } from 'src/types';

const MOCK_PROFILE: UserProfile = {
    display_name: 'Alex Miller',
    age: 28,
    gender: 'Male',
    weight: 195,
    weight_unit: 'lbs',
    height: "6'1\"",
    personal_records: [
        { muscle_group: 'Chest', exercise: 'Barbell Bench Press', value: 225, unit: 'lbs', reps: 5 },
        { muscle_group: 'Back', exercise: 'Deadlift', value: 405, unit: 'lbs', reps: 1 },
        { muscle_group: 'Legs', exercise: 'Squat', value: 315, unit: 'lbs', reps: 3 },
    ],
    total_workouts: 156,
    total_exercises: 1420,
};

export async function fetchProfileData(): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_PROFILE;
}

export async function updateProfileData(fields: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 400));
    return { ...MOCK_PROFILE, ...fields };
}
