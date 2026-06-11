from fastapi import HTTPException, status
from app.core.constants import APIConstants, ErrorMessages, ErrorCodes



class AppError(HTTPException):
    """Base class for all IronLog API errors. Formats the detail into the API contract shape."""
    def __init__(self, status_code: int, message: str, code: str, field: str | None = None):
        error = {"message": message, "code": code}
        if field:
            error["field"] = field
        super().__init__(
            status_code=status_code,
            detail={"status": APIConstants.STATUS_ERROR, "status_code": status_code, "message": message, "errors": [error]}
        )


# ── Auth ───────────────────────────────────────────────────────────────────────

class Unauthorized(AppError):
    def __init__(self, message: str = ErrorMessages.UNAUTHORIZED):
        super().__init__(status.HTTP_401_UNAUTHORIZED, message, ErrorCodes.UNAUTHORIZED)


class InvalidCredentials(AppError):
    def __init__(self):
        super().__init__(status.HTTP_401_UNAUTHORIZED, ErrorMessages.INVALID_CREDENTIALS, ErrorCodes.INVALID_CREDENTIALS)


class EmailTaken(AppError):
    def __init__(self):
        super().__init__(status.HTTP_400_BAD_REQUEST, ErrorMessages.EMAIL_TAKEN, ErrorCodes.EMAIL_TAKEN, field="email")


class UsernameTaken(AppError):
    def __init__(self):
        super().__init__(status.HTTP_400_BAD_REQUEST, ErrorMessages.USERNAME_TAKEN, ErrorCodes.USERNAME_TAKEN, field="username")


# ── Resources ──────────────────────────────────────────────────────────────────

class NotFound(AppError):
    def __init__(self, resource: str = "Resource"):
        super().__init__(status.HTTP_404_NOT_FOUND, ErrorMessages.RESOURCE_NOT_FOUND.format(resource=resource), ErrorCodes.NOT_FOUND)


class Forbidden(AppError):
    def __init__(self):
        super().__init__(status.HTTP_403_FORBIDDEN, ErrorMessages.FORBIDDEN, ErrorCodes.FORBIDDEN)


# ── Sessions ───────────────────────────────────────────────────────────────────

class DuplicateSession(AppError):
    def __init__(self):
        super().__init__(status.HTTP_409_CONFLICT, ErrorMessages.DUPLICATE_SESSION, ErrorCodes.DUPLICATE_SESSION, field="workout_date")


class InvalidDate(AppError):
    def __init__(self, message: str = ErrorMessages.INVALID_DATE):
        super().__init__(status.HTTP_400_BAD_REQUEST, message, ErrorCodes.INVALID_DATE, field="date")
