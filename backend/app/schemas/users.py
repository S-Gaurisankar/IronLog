from typing import Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime


class PersonalRecord(BaseModel):
    id: str
    muscle_group: str
    exercise: str
    value: float
    unit: str
    reps: int
    updated_at: datetime

    model_config = {"from_attributes": True}


class UserProfile(BaseModel):
    id: str
    username: str
    email: str
    display_name: str
    age: Optional[int] = None
    gender: Optional[str] = None
    weight: Optional[float] = None
    weight_unit: str
    height: Optional[str] = None
    avatar_url: Optional[str] = None
    personal_records: list[PersonalRecord] = []
    total_workouts: int
    total_exercises: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ProfileUpdate(BaseModel):
    """
    All fields optional. 'username' is intentionally excluded — it is immutable.
    extra='ignore' silently drops it if the frontend sends it (API contract FE-2).
    """
    display_name: Optional[str] = Field(None, min_length=1, max_length=100)
    age: Optional[int] = Field(None, ge=13, le=130)
    gender: Optional[str] = Field(None, min_length=1, max_length=20)
    weight: Optional[float] = Field(None, gt=0)
    weight_unit: Optional[Literal["lbs", "kg"]] = None
    height: Optional[str] = None

    model_config = {"extra": "ignore"}
