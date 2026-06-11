from datetime import datetime, timezone
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import User
from app.core.security import hash_password, verify_password, create_access_token
from app.core.exceptions import EmailTaken, UsernameTaken, InvalidCredentials
from app.core.constants import APIConstants, SuccessMessages
from app.schemas.auth import SignUp, Login
from app.api.deps import get_current_user

router = APIRouter()


def _meta():
    return {"timestamp": datetime.now(timezone.utc).isoformat()}


@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(body: SignUp, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == body.email).first():
        raise EmailTaken()
    if db.query(User).filter(User.username == body.username).first():
        raise UsernameTaken()

    user = User(
        email=body.email,
        username=body.username,
        password_hash=hash_password(body.password),
        display_name=body.display_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "data": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "display_name": user.display_name,
            "created_at": user.created_at,
        },
        "meta": _meta(),
    }


@router.post("/login")
def login(body: Login, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise InvalidCredentials()

    token = create_access_token(user.id)

    return {
        "status": APIConstants.STATUS_SUCCESS,
        "data": {
            "access_token": token,
            "token_type": APIConstants.TOKEN_TYPE_BEARER,
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "display_name": user.display_name,
            },
        },
        "meta": _meta(),
    }


@router.post("/logout")
def logout(_: User = Depends(get_current_user)):
    # Stateless JWT — invalidation is client-side (clear the stored token)
    return {"status": APIConstants.STATUS_SUCCESS, "message": SuccessMessages.LOGOUT_SUCCESS, "meta": _meta()}
