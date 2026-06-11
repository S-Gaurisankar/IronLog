'use client';

import { useState, useCallback, useEffect } from 'react';
import { logsApi } from 'src/api/logs';
import type { LogsData, UseLogsDataReturn } from 'src/types';
import { toIso } from './useCalendar';

export type { UseLogsDataReturn } from 'src/types';

export function useLogsData(
    date: { year: number; month: number; day: number; }
): UseLogsDataReturn {
    const [data, setData] = useState<LogsData | null>(null);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async (year: number, month: number, day: number) => {
        setLoading(true);
        try {
            const result = await logsApi.getLogsByDate(toIso(year, month, day));
            setData(result);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        load(date.year, date.month, date.day);
    }, [date]);

    return { data, loading, load };
}
