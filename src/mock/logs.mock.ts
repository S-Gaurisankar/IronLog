// ─────────────────────────────────────────────────────────────────────────────
// Mock data layer — mirrors the API-Contract.md shape exactly.
// Replace `fetchLogsData()` with a real fetch() call when the backend is ready.
// ─────────────────────────────────────────────────────────────────────────────

import type { Exercise, WorkoutSession, CalendarSummary, LogsData } from 'src/types';

// Re-export so existing imports from this module don't break during migration.
export type { Exercise, MuscleGroup, WorkoutSession, CalendarSummary, LogsData } from 'src/types';

// ─── Mock calendar generation ─────────────────────────────────────────────────
// Generates a plausible active/missed day distribution for any month.
// This lets the calendar show coloured states on any month during local dev.

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
}

function generateMonthData(year: number, month: number) {
    const total = getDaysInMonth(year, month);
    const today = new Date();
    const cutoff = year === today.getFullYear() && month === today.getMonth() + 1
        ? today.getDate()
        : total;

    const active: number[] = [];
    const missed: number[] = [];

    for (let d = 1; d <= cutoff; d++) {
        const dow = new Date(year, month - 1, d).getDay();
        const isWeekend = dow === 0 || dow === 6;
        // ~75 % chance of working out on weekdays, ~40 % on weekends
        const rand = (((d * 7 + month * 13 + year) % 100) / 100); // deterministic pseudo-random
        if (rand < (isWeekend ? 0.4 : 0.75)) {
            active.push(d);
        } else {
            missed.push(d);
        }
    }
    return { active, missed };
}

const MONTH_NAMES = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
];

const MOCK_SESSION_TEMPLATE: WorkoutSession = {
    session_id: 'ws_99283',
    display_date: '', // filled in at call-time
    muscle_groups: [
        {
            group_name: 'CHEST',
            exercises: [
                { name: 'Incline Dumbbell Press', sets_count: 3, pr_value: '105 lbs', unit: 'lbs' },
                { name: 'Flat Barbell Bench',     sets_count: 4, pr_value: '225 lbs', unit: 'lbs' },
                { name: 'Cable Crossover',         sets_count: 3, pr_value: '60 lbs',  unit: 'lbs' },
            ],
        },
        {
            group_name: 'BACK',
            exercises: [
                { name: 'Barbell Row',        sets_count: 4, pr_value: '185 lbs',   unit: 'lbs' },
                { name: 'Weighted Pull-ups',  sets_count: 3, pr_value: 'BW+45 lbs', is_bodyweight_plus: true },
                { name: 'Lat Pulldown',       sets_count: 3, pr_value: '140 lbs',   unit: 'lbs' },
            ],
        },
        {
            group_name: 'LEGS',
            exercises: [
                { name: 'Bulgarian Split Squat', sets_count: 3, pr_value: '60 lbs',  unit: 'lbs' },
                { name: 'Leg Press',             sets_count: 4, pr_value: '450 lbs', unit: 'lbs' },
                { name: 'Seated Calf Raise',     sets_count: 4, pr_value: '90 lbs',  unit: 'lbs' },
            ],
        },
    ],
};

// ─── Simulated async fetch ────────────────────────────────────────────────────

/**
 * Simulates an API call.
 * @param date  ISO date string "YYYY-MM-DD" — the selected calendar date.
 *
 * TODO: Replace with:
 *   const res = await fetch(`/api/logs?date=${date}`);
 *   return res.json() as LogsData;
 */
export async function fetchLogsData(date: string): Promise<LogsData> {
    // Artificial network delay so loading states are visible during dev.
    await new Promise((r) => setTimeout(r, 350));

    const [year, month, day] = date.split('-').map(Number);
    const { active, missed } = generateMonthData(year, month);
    const isActive = active.includes(day);

    const displayDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
        weekday: 'short', day: 'numeric', month: 'short',
    });

    return {
        user_id: 'alex_01',
        view_date: date,
        calendar_summary: {
            month: MONTH_NAMES[month - 1],
            year,
            active_days: active,
            missed_days: missed,
        },
        workout_session: isActive
            ? { ...MOCK_SESSION_TEMPLATE, display_date: displayDate }
            : null,
    };
}
