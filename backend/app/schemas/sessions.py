from typing import Optional
from datetime import date, datetime
from pydantic import BaseModel, Field, field_validator


# ── Create / Update Request ────────────────────────────────────────────────────

class SetCreate(BaseModel):
    weight: float = Field(..., gt=0, le=9999.99)
    reps: int = Field(..., ge=1, le=999)
    order: int = Field(..., ge=1)


class ExerciseCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    order: int = Field(..., ge=1)
    sets: list[SetCreate] = Field(..., min_length=1)


class MuscleGroupCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    order: int = Field(..., ge=1)
    exercises: list[ExerciseCreate] = Field(..., min_length=1)


class SessionCreate(BaseModel):
    workout_date: date
    muscle_groups: list[MuscleGroupCreate] = Field(..., min_length=1)

    @field_validator("workout_date")
    @classmethod
    def not_in_future(cls, v: date) -> date:
        if v > date.today():
            raise ValueError("Workout date cannot be in the future.")
        return v


# ── Response ───────────────────────────────────────────────────────────────────

class WorkoutSet(BaseModel):
    id: str
    weight: float
    reps: int
    order: int

    model_config = {"from_attributes": True}


class Exercise(BaseModel):
    id: str
    name: str
    order: int
    sets: list[WorkoutSet]

    model_config = {"from_attributes": True}


class MuscleGroup(BaseModel):
    id: str
    name: str
    order: int
    exercises: list[Exercise]

    model_config = {"from_attributes": True}


class Session(BaseModel):
    """Full nested session — POST, GET /sessions/{id}, PUT /sessions/{id}."""
    id: str
    user_id: str
    workout_date: date
    muscle_groups: list[MuscleGroup]
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class SessionSummary(BaseModel):
    """
    Shallow item for GET /sessions list.
    muscle_group_count and total_exercises are computed in the service layer.
    """
    id: str
    user_id: str
    workout_date: date
    muscle_group_count: int
    total_exercises: int
    created_at: datetime
    updated_at: Optional[datetime] = None
