from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# Resolve .env relative to this file so it works regardless of CWD
_ENV_FILE = Path(__file__).resolve().parent.parent / ".env"

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET_KEY: str 
    JWT_ALGORITHM: str 
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    PROJECT_NAME: str = "IronLog API"
    API_V1_STR: str = "/api/v1"
    model_config = SettingsConfigDict(env_file=str(_ENV_FILE), extra="ignore")

settings = Settings()
