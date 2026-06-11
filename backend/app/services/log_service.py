from datetime import date
import calendar
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.models import WorkoutSession, User, PersonalRecord


def get_calendar_summary(db: Session, user_id: str, year: int, month: int) -> Dict[str, Any]:
    # Get all sessions for the given year and month
    start_date = date(year, month, 1)
    
    # Handle end of month
    _, last_day = calendar.monthrange(year, month)
    end_date = date(year, month, last_day)

    sessions = db.query(WorkoutSession).filter(
        WorkoutSession.user_id == user_id,
        WorkoutSession.workout_date >= start_date,
        WorkoutSession.workout_date <= end_date
    ).all()

    active_days = [s.workout_date.day for s in sessions]
    
    # Calculate missed days up to today
    today = date.today()
    max_day_to_check = last_day
    
    if today.year == year and today.month == month:
        max_day_to_check = today.day
    elif today.year < year or (today.year == year and today.month < month):
        max_day_to_check = 0 # Future month, no missed days

    missed_days = [day for day in range(1, max_day_to_check + 1) if day not in active_days]

    return {
        "month": calendar.month_name[month],
        "year": year,
        "active_days": sorted(active_days),
        "missed_days": sorted(missed_days)
    }


def get_logs_date_session(db: Session, user_id: str, view_date: date) -> Optional[Dict[str, Any]]:
    session = db.query(WorkoutSession).filter(
        WorkoutSession.user_id == user_id,
        WorkoutSession.workout_date == view_date
    ).first()

    if not session:
        return None

    # Format the session to match LogsSession shape
    display_date = session.workout_date.strftime("%A, %B %-d")
    
    muscle_groups_out = []
    
    # Build a map of lowercase exercise name → PersonalRecord for quick lookup
    prs = db.query(PersonalRecord).filter(PersonalRecord.user_id == user_id).all()
    pr_map = {pr.exercise.lower(): pr for pr in prs}

    for mg in session.muscle_groups:
        exercises_out = []
        for ex in mg.exercises:
            # Check for PR
            pr_val_str = ""
            unit = None
            pr = pr_map.get(ex.name.lower())
            if pr:
                # Format to remove .0 if it's an integer
                val = int(pr.value) if pr.value.is_integer() else pr.value
                pr_val_str = f"{val} {pr.unit}"
                unit = pr.unit

            exercises_out.append({
                "name": ex.name,
                "sets_count": len(ex.sets),
                "pr_value": pr_val_str,
                "unit": unit,
                "is_bodyweight_plus": None  # Not currently supported by data model
            })
            
        muscle_groups_out.append({
            "group_name": mg.name.upper(),
            "exercises": exercises_out
        })

    return {
        "session_id": session.id,
        "display_date": display_date,
        "muscle_groups": muscle_groups_out
    }
