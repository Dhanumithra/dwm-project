from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from app.core.config import settings

# Cryptography context for password hashing using standard bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies plain password against hashed password."""
    try:
        # Fallback to handle legacy werkzeug hashes if any, or verify using passlib
        if hashed_password.startswith("pbkdf2:sha256:"):
            # If migrating from old werkzeug PBKDF2 formats
            from werkzeug.security import check_password_hash
            return check_password_hash(hashed_password, plain_password)
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        # Fallback in case of hash schema mismatch
        try:
            from werkzeug.security import check_password_hash
            return check_password_hash(hashed_password, plain_password)
        except Exception:
            return False

def get_password_hash(password: str) -> str:
    """Generates bcrypt hash of password."""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Generates JWT token with customizable timeout."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    """Decodes JWT access token and returns payload."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        return None
