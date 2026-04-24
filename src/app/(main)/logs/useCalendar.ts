'use client';

import { useState } from 'react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
}

export function getFirstDayOfWeek(year: number, month: number): number {
    return new Date(year, month - 1, 1).getDay();
}

export function getMonthName(year: number, month: number): string {
    return new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'long' });
}

export function toIso(year: number, month: number, day: number): string {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

import type { CalendarGrid, CalendarHandlers, UseCalendarReturn } from 'src/types';

// Re-export so existing imports from this module don't break during migration.
export type { CalendarGrid, CalendarHandlers, UseCalendarReturn } from 'src/types';

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCalendar(
    date: { year: number; month: number; day: number; },
    onDateChange: (year: number, month: number, day: number) => void,
): UseCalendarReturn {

    const todayDay = date.day;
    const todayMonth = date.month;
    const todayYear = date.year;

    const [viewYear, setViewYear] = useState(todayYear);
    const [viewMonth, setViewMonth] = useState(todayMonth);
    const [selectedDay, setSelectedDay] = useState(todayDay);

    // ── Derived ──
    const isCurrentMonth = viewYear === todayYear && viewMonth === todayMonth;
    const nextViewMonth = viewMonth === 12 ? 1 : viewMonth + 1;
    const nextViewYear = viewMonth === 12 ? viewYear + 1 : viewYear;

    const isTrailingDayFuture = (day: number): boolean =>
        nextViewYear > todayYear
        || (nextViewYear === todayYear && nextViewMonth > todayMonth)
        || (nextViewYear === todayYear && nextViewMonth === todayMonth && day > todayDay);

    // ── Grid data ──
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstWeekDay = getFirstDayOfWeek(viewYear, viewMonth);
    const monthName = getMonthName(viewYear, viewMonth);

    const prevMonthDays = getDaysInMonth(viewYear, viewMonth === 1 ? 12 : viewMonth - 1);
    const leadingBlanks = Array.from({ length: firstWeekDay }, (_, i) => prevMonthDays - firstWeekDay + i + 1);

    const totalCells = Math.ceil((firstWeekDay + daysInMonth) / 7) * 7;
    const trailingBlanks = Array.from({ length: totalCells - firstWeekDay - daysInMonth }, (_, i) => i + 1);

    // ── Handlers ──
    const navigate = (year: number, month: number, day: number) => {
        setViewYear(year);
        setViewMonth(month);
        setSelectedDay(day);
        onDateChange(year, month, day);
    };

    const onDayClick = (day: number) => navigate(viewYear, viewMonth, day);

    const onPrevMonth = () => {
        const m = viewMonth === 1 ? 12 : viewMonth - 1;
        const y = viewMonth === 1 ? viewYear - 1 : viewYear;
        navigate(y, m, 1);
    };

    const onNextMonth = () => {
        if (isCurrentMonth) return;
        navigate(nextViewYear, nextViewMonth, 1);
    };

    const onLeadingFillerClick = (day: number) => {
        const m = viewMonth === 1 ? 12 : viewMonth - 1;
        const y = viewMonth === 1 ? viewYear - 1 : viewYear;
        navigate(y, m, day);
    };

    const onTrailingFillerClick = (day: number) => {
        if (isTrailingDayFuture(day)) return;
        navigate(nextViewYear, nextViewMonth, day);
    };

    return {
        viewYear,
        viewMonth,
        selectedDay,
        todayDay,
        todayMonth,
        todayYear,
        isCurrentMonth,
        nextViewMonth,
        nextViewYear,
        grid: { monthName, daysInMonth, leadingBlanks, trailingBlanks },
        handlers: { onDayClick, onPrevMonth, onNextMonth, onLeadingFillerClick, onTrailingFillerClick },
        isTrailingDayFuture,
    };
}
