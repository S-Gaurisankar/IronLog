from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import User
from app.core.security import decode_access_token
from app.core.exceptions import Unauthorized, NotFound
from app.core.constants import ErrorMessages

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    if not token:
        raise Unauthorized()
    try:
        user_id = decode_access_token(token)
    except JWTError:
        raise Unauthorized(ErrorMessages.INVALID_TOKEN)

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise NotFound("User")
    return user
