from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

# Setup PostgreSQL engine
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True  # Automatically checks connection health before running queries
)

# Setup Session constructor
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative Base for models
Base = declarative_base()

# FastAPI dependency to yield database sessions per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
