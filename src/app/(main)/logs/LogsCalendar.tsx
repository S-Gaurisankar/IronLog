'use client';

import type { CalendarSummary, UseCalendarReturn } from 'src/types';
import { LOGS_CONSTANTS } from 'src/constants';
import styles from './page.module.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildDayClassName(
    isActive: boolean,
    isMissed: boolean,
    isSelected: boolean,
    isToday: boolean,
    isFuture: boolean,
): string {
    return [
        styles.day,
        isActive ? styles.active : '',
        isMissed ? styles.missed : '',
        isSelected ? styles.selected : '',
        isToday ? styles.today : '',
        isFuture ? styles.future : '',
    ].join(' ');
}


// ─── Props ────────────────────────────────────────────────────────────────────

interface LogsCalendarProps {
    calendar: UseCalendarReturn;
    calendarSummary: CalendarSummary | undefined;
}

interface LogsCalendarHeaderProps {
    monthName: string;
    viewYear: number;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    isCurrentMonth: boolean;
}

interface FillerDayProps {
    day: number;
    prefix: string;
    onClick?: (day: number) => void;
}


interface DayButtonProps {
    day: number;
    monthName: string;
    calendarSummary: CalendarSummary | undefined;
    selectedDay: number;
    todayDay: number;
    todayMonth: number;
    todayYear: number;
    viewMonth: number;
    viewYear: number;
    onDayClick: (day: number) => void;
}

interface LeadingTrailingBlanksProps {
    Blanks: number[];
    prefix: string;
    onBlankClick: (day: number) => void;
}


// ─── Sub-components ───────────────────────────────────────────────────────────

function WeekdayHeaders() {
    return (
        <>
            {LOGS_CONSTANTS.DAYS_OF_WEEK.map((d, i) => (
                <span key={i} className={styles.weekday} role="columnheader">{d}</span>
            ))}
        </>
    );
}


function FillerDay({ day, prefix, onClick }: FillerDayProps) {
    if (onClick) {
        return (
            <button
                key={`${prefix}-${day}`}
                className={`${styles.day} ${styles.filler} ${styles.fillerClickable}`}
                onClick={() => onClick(day)}
                aria-label={`Go to ${day}`}
            >
                {day}
            </button>
        );
    }
    return (
        <span key={`${prefix}-${day}`} className={`${styles.day} ${styles.filler}`}>{day}</span>
    );
}

function DayButton({
    day,
    monthName,
    calendarSummary,
    selectedDay,
    todayDay,
    todayMonth,
    todayYear,
    viewMonth,
    viewYear,
    onDayClick,
}: DayButtonProps) {
    const isActive = calendarSummary?.active_days.includes(day) ?? false;
    const isMissed = calendarSummary?.missed_days.includes(day) ?? false;
    const isSelected = day === selectedDay;
    const isToday = day === todayDay && viewMonth === todayMonth && viewYear === todayYear;
    const isFuture = viewYear === todayYear && viewMonth === todayMonth
        ? day > todayDay
        : viewYear > todayYear || (viewYear === todayYear && viewMonth > todayMonth);

    return (
        <button
            id={`calendar-day-${day}`}
            className={buildDayClassName(isActive, isMissed, isSelected, isToday, isFuture)}
            onClick={() => !isFuture && onDayClick(day)}
            disabled={isFuture}
            aria-label={`${monthName} ${day}`}
            aria-pressed={isSelected}
            aria-disabled={isFuture}
        >
            {day}
        </button>
    );
}


function CalendarHeader({ monthName, viewYear, onPrevMonth, onNextMonth, isCurrentMonth }: LogsCalendarHeaderProps) {
    return (
        <div className={styles.calendarHeader}>
            <button
                id={LOGS_CONSTANTS.PREV_MONTH_BTN_ID}
                className={styles.chevron}
                onClick={onPrevMonth}
                aria-label={LOGS_CONSTANTS.PREV_MONTH_ARIA_LABEL}
            >
                {String.fromCharCode(0x2039)}
            </button>
            <span className={styles.monthLabel}>
                {monthName.toUpperCase()}&nbsp;{viewYear}
            </span>
            <button
                id={LOGS_CONSTANTS.NEXT_MONTH_BTN_ID}
                className={`${styles.chevron} ${isCurrentMonth ? styles.chevronDisabled : ''}`}
                onClick={onNextMonth}
                disabled={isCurrentMonth}
                aria-label={LOGS_CONSTANTS.NEXT_MONTH_ARIA_LABEL}
                aria-disabled={isCurrentMonth}
            >
                {String.fromCharCode(0x203a)}

            </button>
        </div>
    );
}


function LeadingTrailingBlanks({ Blanks, prefix, onBlankClick }: LeadingTrailingBlanksProps) {
    return (
        <>
            {
                Blanks.map((d) => {
                    return (
                        <FillerDay
                            key={`${prefix}-${d}`}
                            day={d}
                            prefix={prefix}
                            onClick={onBlankClick}
                        />
                    )
                })
            }
        </>
    )
}


// ─── Component ────────────────────────────────────────────────────────────────

export default function LogsCalendar({ calendar, calendarSummary }: LogsCalendarProps) {
    const {
        viewYear, viewMonth, selectedDay,
        todayDay, todayMonth, todayYear,
        isCurrentMonth, isTrailingDayFuture,
        grid: { monthName, daysInMonth, leadingBlanks, trailingBlanks },
        handlers: { onDayClick, onPrevMonth, onNextMonth, onLeadingFillerClick, onTrailingFillerClick },
    } = calendar;

    const trailingClickHandler = trailingBlanks.every(isTrailingDayFuture)
        ? undefined
        : onTrailingFillerClick;

    return (
        <section className={styles.calendarCard} aria-label={LOGS_CONSTANTS.CALENDAR_ARIA_LABEL}>
            <CalendarHeader {...{ monthName, viewYear, onPrevMonth, onNextMonth, isCurrentMonth }} />

            <div className={styles.calendarGrid} role="grid" aria-label={LOGS_CONSTANTS.CALENDAR_DAYS_ARIA_LABEL}>
                <WeekdayHeaders />

                <LeadingTrailingBlanks
                    Blanks={leadingBlanks}
                    prefix="l"
                    onBlankClick={onLeadingFillerClick}
                />

                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                    <DayButton
                        key={day}
                        day={day}
                        monthName={monthName}
                        calendarSummary={calendarSummary}
                        selectedDay={selectedDay}
                        todayDay={todayDay}
                        todayMonth={todayMonth}
                        todayYear={todayYear}
                        viewMonth={viewMonth}
                        viewYear={viewYear}
                        onDayClick={onDayClick}
                    />
                ))}

                <LeadingTrailingBlanks
                    Blanks={trailingBlanks}
                    prefix="t"
                    onBlankClick={onTrailingFillerClick}
                />

            </div>
        </section>
    );
}
