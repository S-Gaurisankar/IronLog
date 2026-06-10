from fastapi import HTTPException, status


class AppError(HTTPException):
    """Base class for all IronLog API errors. Formats the detail into the API contract shape."""
    def __init__(self, status_code: int, message: str, code: str, field: str | None = None):
        error = {"message": message, "code": code}
        if field:
            error["field"] = field
        super().__init__(
            status_code=status_code,
            detail={"status": "error", "status_code": status_code, "message": message, "errors": [error]}
        )


# ── Auth ───────────────────────────────────────────────────────────────────────

class Unauthorized(AppError):
    def __init__(self, message: str = "Token is missing or invalid"):
        super().__init__(status.HTTP_401_UNAUTHORIZED, message, "UNAUTHORIZED")


class InvalidCredentials(AppError):
    def __init__(self):
        super().__init__(status.HTTP_401_UNAUTHORIZED, "Email or password is incorrect", "INVALID_CREDENTIALS")


class EmailTaken(AppError):
    def __init__(self):
        super().__init__(status.HTTP_400_BAD_REQUEST, "Email already registered", "EMAIL_TAKEN", field="email")


class UsernameTaken(AppError):
    def __init__(self):
        super().__init__(status.HTTP_400_BAD_REQUEST, "Username already taken", "USERNAME_TAKEN", field="username")


# ── Resources ──────────────────────────────────────────────────────────────────

class NotFound(AppError):
    def __init__(self, resource: str = "Resource"):
        super().__init__(status.HTTP_404_NOT_FOUND, f"{resource} not found", "NOT_FOUND")


class Forbidden(AppError):
    def __init__(self):
        super().__init__(status.HTTP_403_FORBIDDEN, "You do not have permission to access this resource", "FORBIDDEN")


# ── Sessions ───────────────────────────────────────────────────────────────────

class DuplicateSession(AppError):
    def __init__(self):
        super().__init__(status.HTTP_409_CONFLICT, "A workout session already exists for this date", "DUPLICATE_SESSION", field="workout_date")


class InvalidDate(AppError):
    def __init__(self, message: str = "Invalid date"):
        super().__init__(status.HTTP_400_BAD_REQUEST, message, "INVALID_DATE", field="date")
