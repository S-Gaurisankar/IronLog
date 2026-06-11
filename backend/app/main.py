import logging
from datetime import datetime, timezone
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError

from app.api.v1 import api_router
from app.core.exceptions import AppError
from app.core.constants import APIConstants, ErrorCodes, ErrorMessages
from app.config import settings

logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)


def _meta():
    return {"timestamp": datetime.now(timezone.utc).isoformat()}


@app.exception_handler(AppError)
async def app_error_handler(request: Request, exc: AppError):
    """Handles our custom AppErrors and formats them exactly as the API contract requires."""
    return JSONResponse(
        status_code=exc.status_code,
        content=exc.detail,  # AppError already builds the proper dict shape in its __init__
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Transforms Pydantic validation errors into our API contract error shape."""
    errors = []
    for err in exc.errors():
        field = ".".join(str(loc) for loc in err["loc"] if loc != "body")
        errors.append({
            "field": field,
            "message": err["msg"],
            "code": ErrorCodes.VALIDATION_ERROR
        })
        
    return JSONResponse(
        status_code=422,
        content={
            "status": APIConstants.STATUS_ERROR,
            "status_code": 422,
            "message": ErrorMessages.VALIDATION_FAILED,
            "errors": errors,
            "meta": _meta()
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Catch-all for unhandled exceptions, primarily DB connection errors or bugs."""
    logger.error(f"Unhandled Exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "status": APIConstants.STATUS_ERROR,
            "status_code": 500,
            "message": ErrorMessages.INTERNAL_ERROR,
            "errors": [{
                "message": ErrorMessages.UNEXPECTED_ERROR,
                "code": ErrorCodes.INTERNAL_ERROR
            }],
            "meta": _meta()
        }
    )