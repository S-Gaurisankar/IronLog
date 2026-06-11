from datetime import datetime, timezone, date
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.database import get_db
from app.models.models import User, WorkoutSession, MuscleGroup, Exercise
from app.schemas.sessions import SessionCreate
from app.api.deps import get_current_user
from app.core.exceptions import NotFound, Forbidden
from app.core.constants import APIConstants, SuccessMessages
from app.services.session_service import create_workout_session, update_workout_session

router = APIRouter()


def _meta():
    return {"timestamp": datetime.now(timezone.utc).isoformat()}


@router.post("", status_code=201)
def create_session(
    body: SessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    session = create_workout_session(db, current_user, body)

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "data": session,
        "meta": _meta()
    }


@router.get("")
def list_sessions(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    date_from: Optional[date] = None,
    date_to: Optional[date] = None,
    sort: str = Query("desc", pattern="^(asc|desc)$"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(WorkoutSession).filter(WorkoutSession.user_id == current_user.id)

    if date_from:
        query = query.filter(WorkoutSession.workout_date >= date_from)
    if date_to:
        query = query.filter(WorkoutSession.workout_date <= date_to)

    if sort == "asc":
        query = query.order_by(WorkoutSession.workout_date.asc())
    else:
        query = query.order_by(WorkoutSession.workout_date.desc())

    total = query.count()
    pages = (total + limit - 1) // limit

    sessions = query.offset((page - 1) * limit).limit(limit).all()

    # compute shallow properties
    data = []
    for s in sessions:
        mg_count = len(s.muscle_groups)
        ex_count = sum(len(mg.exercises) for mg in s.muscle_groups)
        
        data.append({
            "id": s.id,
            "user_id": s.user_id,
            "workout_date": s.workout_date,
            "muscle_group_count": mg_count,
            "total_exercises": ex_count,
            "created_at": s.created_at,
            "updated_at": s.updated_at
        })

    meta = _meta()
    meta.update({
        "page": page,
        "limit": limit,
        "total": total,
        "pages": pages
    })

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "data": data,
        "meta": meta
    }


@router.get("/{session_id}")
def get_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    session = db.query(WorkoutSession).filter(WorkoutSession.id == session_id).first()
    
    if not session:
        raise NotFound("Workout session")
        
    if session.user_id != current_user.id:
        raise Forbidden()

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "data": session,
        "meta": _meta()
    }


@router.put("/{session_id}")
def update_session(
    session_id: str,
    body: SessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    session = db.query(WorkoutSession).filter(WorkoutSession.id == session_id).first()
    
    if not session:
        raise NotFound("Workout session")
        
    if session.user_id != current_user.id:
        raise Forbidden()

    updated_session = update_workout_session(db, current_user, session_id, body)

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "data": updated_session,
        "meta": _meta()
    }


@router.delete("/{session_id}")
def delete_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    session = db.query(WorkoutSession).filter(WorkoutSession.id == session_id).first()
    
    if not session:
        raise NotFound("Workout session")
        
    if session.user_id != current_user.id:
        raise Forbidden()

    db.delete(session)
    db.commit()

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "message": SuccessMessages.SESSION_DELETED,
        "meta": _meta()
    }
