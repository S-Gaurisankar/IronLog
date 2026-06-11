from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.sessions import router as sessions_router
from app.api.v1.logs import router as logs_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users_router, prefix="/users", tags=["Users"])
api_router.include_router(sessions_router, prefix="/sessions", tags=["Workout Sessions"])
api_router.include_router(logs_router, prefix="/logs", tags=["Logs & Calendar"])
