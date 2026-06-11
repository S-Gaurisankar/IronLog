from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.database import get_db
from app.models.models import User, WorkoutSession, MuscleGroup, Exercise
from app.schemas.users import ProfileUpdate
from app.api.deps import get_current_user
from app.core.constants import APIConstants

router = APIRouter()


def _meta():
    return {"timestamp": datetime.now(timezone.utc).isoformat()}


@router.get("/me")
def get_current_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Calculate computed fields
    total_workouts = db.query(func.count(WorkoutSession.id)).filter(
        WorkoutSession.user_id == current_user.id
    ).scalar() or 0

    total_exercises = db.query(func.count(Exercise.id)).join(
        MuscleGroup, Exercise.muscle_group_id == MuscleGroup.id
    ).join(
        WorkoutSession, MuscleGroup.session_id == WorkoutSession.id
    ).filter(
        WorkoutSession.user_id == current_user.id
    ).scalar() or 0

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "data": {
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "display_name": current_user.display_name,
            "age": current_user.age,
            "gender": current_user.gender,
            "weight": current_user.weight,
            "weight_unit": current_user.weight_unit,
            "height": current_user.height,
            "avatar_url": current_user.avatar_url,
            "personal_records": [
                {
                    "id": pr.id,
                    "muscle_group": pr.muscle_group,
                    "exercise": pr.exercise,
                    "value": pr.value,
                    "unit": pr.unit,
                    "reps": pr.reps,
                    "updated_at": pr.updated_at
                } for pr in current_user.personal_records
            ],
            "total_workouts": total_workouts,
            "total_exercises": total_exercises,
            "created_at": current_user.created_at,
            "updated_at": current_user.updated_at
        },
        "meta": _meta()
    }


@router.put("/me")
def update_current_user_profile(
    body: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    update_data = body.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(current_user, key, value)
        
    db.commit()
    db.refresh(current_user)

    # Re-calculate computed fields for response
    total_workouts = db.query(func.count(WorkoutSession.id)).filter(
        WorkoutSession.user_id == current_user.id
    ).scalar() or 0

    total_exercises = db.query(func.count(Exercise.id)).join(
        MuscleGroup, Exercise.muscle_group_id == MuscleGroup.id
    ).join(
        WorkoutSession, MuscleGroup.session_id == WorkoutSession.id
    ).filter(
        WorkoutSession.user_id == current_user.id
    ).scalar() or 0

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "data": {
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "display_name": current_user.display_name,
            "age": current_user.age,
            "gender": current_user.gender,
            "weight": current_user.weight,
            "weight_unit": current_user.weight_unit,
            "height": current_user.height,
            "avatar_url": current_user.avatar_url,
            "personal_records": [
                {
                    "id": pr.id,
                    "muscle_group": pr.muscle_group,
                    "exercise": pr.exercise,
                    "value": pr.value,
                    "unit": pr.unit,
                    "reps": pr.reps,
                    "updated_at": pr.updated_at
                } for pr in current_user.personal_records
            ],
            "total_workouts": total_workouts,
            "total_exercises": total_exercises,
            "created_at": current_user.created_at,
            "updated_at": current_user.updated_at
        },
        "meta": _meta()
    }
