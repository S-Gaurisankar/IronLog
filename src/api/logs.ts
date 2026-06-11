import { apiClient } from './client';
import type { LogsData } from 'src/types';
import { API_CONSTANTS } from 'src/constants';

export const logsApi = {
    getLogsByDate: (dateStr: string) => 
        apiClient<LogsData>(`${API_CONSTANTS.LOGS_DATE}/${dateStr}`),
        
    getCalendar: (year: number, month: number) => 
        apiClient(`${API_CONSTANTS.LOGS_CALENDAR}?year=${year}&month=${month}`),
};
