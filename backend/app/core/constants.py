class APIConstants:
    STATUS_SUCCESS = "success"
    STATUS_ERROR = "error"
    TOKEN_TYPE_BEARER = "Bearer"


class ErrorMessages:
    UNAUTHORIZED = "Token is missing or invalid"
    INVALID_TOKEN = "Token is invalid or expired"
    INVALID_CREDENTIALS = "Email or password is incorrect"
    EMAIL_TAKEN = "Email already registered"
    USERNAME_TAKEN = "Username already taken"
    RESOURCE_NOT_FOUND = "{resource} not found"
    FORBIDDEN = "You do not have permission to access this resource"
    DUPLICATE_SESSION = "A workout session already exists for this date"
    INVALID_DATE = "Invalid date"
    VALIDATION_FAILED = "Validation failed"
    INTERNAL_ERROR = "Internal Server Error"
    UNEXPECTED_ERROR = "An unexpected error occurred"
    INVALID_YEAR_MONTH = "Invalid year/month parameters"


class ErrorCodes:
    UNAUTHORIZED = "UNAUTHORIZED"
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS"
    EMAIL_TAKEN = "EMAIL_TAKEN"
    USERNAME_TAKEN = "USERNAME_TAKEN"
    NOT_FOUND = "NOT_FOUND"
    FORBIDDEN = "FORBIDDEN"
    DUPLICATE_SESSION = "DUPLICATE_SESSION"
    INVALID_DATE = "INVALID_DATE"
    VALIDATION_ERROR = "VALIDATION_ERROR"
    INTERNAL_ERROR = "INTERNAL_ERROR"


class SuccessMessages:
    LOGOUT_SUCCESS = "Logged out successfully"
    SESSION_DELETED = "Workout session deleted successfully"
