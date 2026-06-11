from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from app.models.models import WorkoutSession, MuscleGroup, Exercise, ExerciseSet, PersonalRecord, User
from app.schemas.sessions import SessionCreate
from app.core.exceptions import DuplicateSession, NotFound


def update_personal_records(db: Session, user: User, session_data: SessionCreate):
    """
    Update personal records based on a new or updated session.
    A personal record is tracked per exercise (and its muscle group).
    It stores the maximum weight lifted, along with the reps achieved.
    """
    for mg_data in session_data.muscle_groups:
        for ex_data in mg_data.exercises:
            # Find the max weight in the sets of this exercise
            max_weight_set = max(ex_data.sets, key=lambda s: s.weight)
            
            # Check if there is an existing PR for this exercise
            pr = db.query(PersonalRecord).filter(
                PersonalRecord.user_id == user.id,
                func.lower(PersonalRecord.exercise) == ex_data.name.lower()
            ).first()

            if pr:
                # Update PR if the new weight is greater
                if max_weight_set.weight > pr.value:
                    pr.value = max_weight_set.weight
                    pr.reps = max_weight_set.reps
                    pr.muscle_group = mg_data.name
            else:
                # Create a new PR
                new_pr = PersonalRecord(
                    user_id=user.id,
                    muscle_group=mg_data.name,
                    exercise=ex_data.name,
                    value=max_weight_set.weight,
                    reps=max_weight_set.reps,
                    unit=user.weight_unit
                )
                db.add(new_pr)


def create_workout_session(db: Session, user: User, session_data: SessionCreate) -> WorkoutSession:
    # Check for duplicate session on the same date
    existing_session = db.query(WorkoutSession).filter(
        WorkoutSession.user_id == user.id,
        WorkoutSession.workout_date == session_data.workout_date
    ).first()
    
    if existing_session:
        raise DuplicateSession()

    db_session = WorkoutSession(
        user_id=user.id,
        workout_date=session_data.workout_date,
        # notes is not available in SessionCreate, will add it to the schema if needed. Ah wait.
    )
    
    # We add notes to the model if it exists in the kwargs, but we removed it per the user's request
    
    db.add(db_session)
    db.flush() # flush to get db_session.id

    for mg_data in session_data.muscle_groups:
        db_mg = MuscleGroup(
            session_id=db_session.id,
            name=mg_data.name,
            order=mg_data.order
        )
        db.add(db_mg)
        db.flush()

        for ex_data in mg_data.exercises:
            db_ex = Exercise(
                muscle_group_id=db_mg.id,
                name=ex_data.name,
                order=ex_data.order
            )
            db.add(db_ex)
            db.flush()

            for set_data in ex_data.sets:
                db_set = ExerciseSet(
                    exercise_id=db_ex.id,
                    weight=set_data.weight,
                    reps=set_data.reps,
                    order=set_data.order
                )
                db.add(db_set)

    # Update personal records
    update_personal_records(db, user, session_data)

    db.commit()
    db.refresh(db_session)
    return db_session


def update_workout_session(db: Session, user: User, session_id: str, session_data: SessionCreate) -> WorkoutSession:
    db_session = db.query(WorkoutSession).filter(
        WorkoutSession.id == session_id,
        WorkoutSession.user_id == user.id
    ).first()
    
    if not db_session:
        raise NotFound("Workout session")

    # If date changed, check for duplicate
    if db_session.workout_date != session_data.workout_date:
        existing_session = db.query(WorkoutSession).filter(
            WorkoutSession.user_id == user.id,
            WorkoutSession.workout_date == session_data.workout_date
        ).first()
        if existing_session:
            raise DuplicateSession()
        
    db_session.workout_date = session_data.workout_date
    
    # Simple strategy: delete existing muscle groups and recreate
    # Cascade delete will take care of exercises and sets
    db.query(MuscleGroup).filter(MuscleGroup.session_id == session_id).delete()
    
    db.flush()

    for mg_data in session_data.muscle_groups:
        db_mg = MuscleGroup(
            session_id=db_session.id,
            name=mg_data.name,
            order=mg_data.order
        )
        db.add(db_mg)
        db.flush()

        for ex_data in mg_data.exercises:
            db_ex = Exercise(
                muscle_group_id=db_mg.id,
                name=ex_data.name,
                order=ex_data.order
            )
            db.add(db_ex)
            db.flush()

            for set_data in ex_data.sets:
                db_set = ExerciseSet(
                    exercise_id=db_ex.id,
                    weight=set_data.weight,
                    reps=set_data.reps,
                    order=set_data.order
                )
                db.add(db_set)

    # Update personal records (this only increases PRs, doesn't decrease if they edited a set down)
    update_personal_records(db, user, session_data)

    db.commit()
    db.refresh(db_session)
    return db_session
