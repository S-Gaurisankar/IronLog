// ─── Calendar hook return types ───────────────────────────────────────────────

export interface CalendarGrid {
    monthName: string;
    daysInMonth: number;
    leadingBlanks: number[];
    trailingBlanks: number[];
}

export interface CalendarHandlers {
    onDayClick: (day: number) => void;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onLeadingFillerClick: (day: number) => void;
    onTrailingFillerClick: (day: number) => void;
}

export interface UseCalendarReturn {
    // State
    viewYear: number;
    viewMonth: number;
    selectedDay: number;
    todayDay: number;
    todayMonth: number;
    todayYear: number;
    // Derived
    isCurrentMonth: boolean;
    nextViewMonth: number;
    nextViewYear: number;
    grid: CalendarGrid;
    // Handlers
    handlers: CalendarHandlers;
    // Helpers
    isTrailingDayFuture: (day: number) => boolean;
}
