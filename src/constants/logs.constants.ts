export const LOGS_CONSTANTS = {
    DAYS_OF_WEEK: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    // Calendar navigation
    PREV_MONTH_BTN_ID: 'prev-month-btn',
    NEXT_MONTH_BTN_ID: 'next-month-btn',
    PREV_MONTH_ARIA_LABEL: 'Previous month',
    NEXT_MONTH_ARIA_LABEL: 'Next month',
    CALENDAR_ARIA_LABEL: 'Workout calendar',
    CALENDAR_DAYS_ARIA_LABEL: 'Calendar days',

    // Workout detail
    WORKOUT_DETAIL_ARIA_LABEL: 'Workout details',
    EDIT_WORKOUT_BTN_ID: 'edit-workout-btn',
    LOADING_ARIA_LABEL: 'Loading workout data',
    EMPTY_STATE_ARIA_LABEL: 'No workout logged',
    EMPTY_ICON: '🛌',
    EMPTY_TITLE: 'Rest Day',
    EMPTY_SUBTITLE_LINE_1: 'No workout logged for this date.',
    EMPTY_SUBTITLE_LINE_2: 'Embrace the recovery!',

    // Locale
    DATE_LOCALE: 'en-US',
    MONTH_FORMAT_OPTIONS: { month: 'long' } as const,
    DISPLAY_DATE_FORMAT_OPTIONS: {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    } as const,

    //Sets & PR
    SETS_COUNT_LABEL: 'Sets',
    PR_LABEL: 'PR',
    EDIT_BTN: '✏️ Edit',
    EDIT_TRACK_ROUTE: '/track?edit=true',
};

