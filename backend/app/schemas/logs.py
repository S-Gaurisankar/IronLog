from typing import Optional
from pydantic import BaseModel


class CalendarSummary(BaseModel):
    """Matches frontend CalendarSummary type exactly."""
    month: str
    year: int
    active_days: list[int]
    missed_days: list[int]


# ── Logs Date Response ─────────────────────────────────────────────────────────
# The logs date endpoint uses a different workout session shape than Session.
# The frontend only needs exercise summaries (sets_count + pr_value string),
# not raw sets. Matches src/types/logs.types.ts WorkoutSession type.

class LogsExercise(BaseModel):
    name: str
    sets_count: int
    pr_value: str           # pre-formatted string e.g. "225 lbs"
    unit: Optional[str] = None
    is_bodyweight_plus: Optional[bool] = None


class LogsMuscleGroup(BaseModel):
    group_name: str         # uppercased by service layer e.g. "CHEST"
    exercises: list[LogsExercise]


class LogsSession(BaseModel):
    """
    Logs-specific session shape. display_date formatted as "Sunday, May 25"
    using date.strftime("%A, %B %-d") in the service layer.
    """
    session_id: str
    display_date: str
    muscle_groups: list[LogsMuscleGroup]


class LogsDateData(BaseModel):
    """Matches frontend LogsData type."""
    user_id: str
    view_date: str          # ISO "YYYY-MM-DD"
    calendar_summary: CalendarSummary
    workout_session: Optional[LogsSession] = None
