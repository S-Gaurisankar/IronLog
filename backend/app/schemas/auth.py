from pydantic import BaseModel, EmailStr, Field


class SignUp(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)
    display_name: str = Field(..., min_length=1, max_length=100)


class Login(BaseModel):
    email: EmailStr
    password: str


class AuthUser(BaseModel):
    """Minimal user info returned in auth responses."""
    id: str
    email: str
    username: str
    display_name: str

    model_config = {"from_attributes": True}


class SignUpData(BaseModel):
    """Signup does not return a token. User must call /login after."""
    id: str
    email: str
    username: str
    display_name: str

    model_config = {"from_attributes": True}


class TokenData(BaseModel):
    access_token: str
    token_type: str = "Bearer"
    user: AuthUser
