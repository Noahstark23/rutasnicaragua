from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    admin_user = os.getenv("ADMIN_USERNAME")
    admin_hash = os.getenv("ADMIN_PASSWORD_HASH")
    if data.username != admin_user or not pwd_context.verify(data.password, admin_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}
