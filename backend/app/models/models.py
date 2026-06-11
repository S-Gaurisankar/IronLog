import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, UniqueConstraint, Date
from sqlalchemy.orm import relationship
from app.db.database import Base

def generate_prefixed_uuid(prefix: str) -> str:
    """Generates a UUID with a specific domain prefix (e.g., 'ws_...')"""
    return f"{prefix}_{uuid.uuid4()}"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    display_name = Column(String, nullable=False)
    
    # Optional profile info
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    weight = Column(Float, nullable=True)
    weight_unit = Column(String, default="kg", nullable=False)  # "lbs" or "kg"
    height = Column(String, nullable=True)  # Format: "6'1\"" or "185 cm"
    avatar_url = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    sessions = relationship("WorkoutSession", back_populates="user", cascade="all, delete-orphan")
    personal_records = relationship("PersonalRecord", back_populates="user", cascade="all, delete-orphan")


class WorkoutSession(Base):
    __tablename__ = "workout_sessions"

    id = Column(String, primary_key=True, default=lambda: generate_prefixed_uuid("ws"))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    workout_date = Column(Date, nullable=False, index=True)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Constraint: One session per user per date
    __table_args__ = (
        UniqueConstraint("user_id", "workout_date", name="uq_user_workout_date"),
    )

    # Relationships
    user = relationship("User", back_populates="sessions")
    muscle_groups = relationship(
        "MuscleGroup", 
        back_populates="session", 
        cascade="all, delete-orphan",
        order_by="MuscleGroup.order"
    )


class MuscleGroup(Base):
    __tablename__ = "muscle_groups"

    id = Column(String, primary_key=True, default=lambda: generate_prefixed_uuid("mg"))
    session_id = Column(String, ForeignKey("workout_sessions.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(50), nullable=False)  # e.g., "Chest", "Back"
    order = Column(Integer, nullable=False, default=1)

    # Relationships
    session = relationship("WorkoutSession", back_populates="muscle_groups")
    exercises = relationship(
        "Exercise", 
        back_populates="muscle_group", 
        cascade="all, delete-orphan",
        order_by="Exercise.order"
    )


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(String, primary_key=True, default=lambda: generate_prefixed_uuid("ex"))
    muscle_group_id = Column(String, ForeignKey("muscle_groups.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)  # e.g., "Flat Barbell Bench"
    order = Column(Integer, nullable=False, default=1)

    # Relationships
    muscle_group = relationship("MuscleGroup", back_populates="exercises")
    sets = relationship(
        "ExerciseSet", 
        back_populates="exercise", 
        cascade="all, delete-orphan",
        order_by="ExerciseSet.order"
    )


class ExerciseSet(Base):
    __tablename__ = "exercise_sets"

    id = Column(String, primary_key=True, default=lambda: generate_prefixed_uuid("set"))
    exercise_id = Column(String, ForeignKey("exercises.id", ondelete="CASCADE"), nullable=False)
    weight = Column(Float, nullable=False)
    reps = Column(Integer, nullable=False)
    order = Column(Integer, nullable=False, default=1)

    # Relationships
    exercise = relationship("Exercise", back_populates="sets")


class PersonalRecord(Base):
    __tablename__ = "personal_records"

    id = Column(String, primary_key=True, default=lambda: generate_prefixed_uuid("pr"))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    muscle_group = Column(String(50), nullable=False)
    exercise = Column(String(100), nullable=False, index=True)
    value = Column(Float, nullable=False)  # Max weight recorded
    unit = Column(String(10), nullable=False, default="kgs")
    reps = Column(Integer, nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        UniqueConstraint("user_id", "exercise", name="uq_user_exercise_pr"),
    )

    user = relationship("User", back_populates="personal_records")
