'use client';

import { useCalendar } from './useCalendar';
import { useLogsData } from './useLogsData';
import LogsCalendar from './LogsCalendar';
import WorkoutDetail from './WorkoutDetail';
import styles from './page.module.css';

export default function LogsPage() {
    const today = new Date();
    const dateObject = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    }


    const { data, loading, load } = useLogsData(dateObject);
    const calendar = useCalendar(dateObject, load);

    return (
        <div className={styles.page}>
            <LogsCalendar
                calendar={calendar}
                calendarSummary={data?.calendar_summary}
            />
            <WorkoutDetail
                loading={loading}
                session={data?.workout_session}
            />
        </div>
    );
}
