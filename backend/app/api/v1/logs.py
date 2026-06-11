from datetime import datetime, timezone, date
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import User
from app.api.deps import get_current_user
from app.core.constants import APIConstants, ErrorMessages
from app.services.log_service import get_calendar_summary, get_logs_date_session

router = APIRouter()


def _meta():
    return {"timestamp": datetime.now(timezone.utc).isoformat()}


@router.get("/calendar")
def get_calendar(
    year: int = Query(..., ge=2000, le=2100),
    month: int = Query(..., ge=1, le=12),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        data = get_calendar_summary(db, current_user.id, year, month)
    except ValueError:
        raise HTTPException(status_code=400, detail=ErrorMessages.INVALID_YEAR_MONTH)

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "data": data,
        "meta": _meta()
    }


@router.get("/date/{view_date}")
def get_logs_by_date(
    view_date: date,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    calendar_summary = get_calendar_summary(
        db, current_user.id, view_date.year, view_date.month
    )
    
    workout_session = get_logs_date_session(db, current_user.id, view_date)

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "data": {
            "user_id": current_user.id,
            "view_date": view_date.isoformat(),
            "calendar_summary": calendar_summary,
            "workout_session": workout_session
        },
        "meta": _meta()
    }
