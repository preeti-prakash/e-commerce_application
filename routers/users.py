from fastapi import Depends, HTTPException, status, APIRouter, Form, Request, Body
from sqlalchemy.orm import Session
from google.cloud import bigquery
import os
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.responses import JSONResponse
from jose import jwt

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/users")

SERVICE_ACCOUNT_FILE = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
PROJECT_ID = os.getenv("PROJECT_ID")
SECRET_KEY = os.getenv("SECRET_KEY")

# Function to get BigQuery client
def get_bigquery_client():
    return bigquery.Client.from_service_account_json(SERVICE_ACCOUNT_FILE)

# Dependency to get database session
def get_db():
    client = get_bigquery_client()
    return client

# OAuth2PasswordBearer instance
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# User model (Example: Adjust based on your data model)
class User:
    def __init__(self, id, username, first_name, last_name, email, phone_number, hashed_password):
        self.id = id
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone_number = phone_number
        self.hashed_password = hashed_password

# Authenticate user and return JWT
def authenticate_user(username: str, password: str, db: bigquery.Client):
    query = f"SELECT * FROM `{PROJECT_ID}.your_dataset.users` WHERE username = '{username}'"
    result = db.query(query).result()
    user = [dict(row) for row in result]
    if not user or password != user[0]["hashed_password"]:
        return None
    return User(
        id=user[0]["id"],
        username=user[0]["username"],
        first_name=user[0]["first_name"],
        last_name=user[0]["last_name"],
        email=user[0]["email"],
        phone_number=user[0]["phone_number"],
        hashed_password=user[0]["hashed_password"]
    )

# Generate JWT token
def create_access_token(data: dict):
    to_encode = data.copy()
    to_encode.update({"exp": datetime.utcnow() + timedelta(minutes=15)})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt

# Dependency to get current user from token
def get_current_user(token: str = Depends(oauth2_scheme), db: bigquery.Client = Depends(get_bigquery_client)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=400, detail="Invalid credentials")
        return authenticate_user(username=username, password=None, db=db)
    except jwt.PyJWTError:
        raise HTTPException(status_code=400, detail="Invalid credentials")

# Register route
@router.post("/register/")
def register_user(user_data: dict = Body(...), db: bigquery.Client = Depends(get_bigquery_client)):
    username = user_data.get("username")
    first_name = user_data.get("first_name")
    last_name = user_data.get("last_name")
    email = user_data.get("email")
    phone_number = user_data.get("phone_number")
    password = user_data.get("password")

    # Hash password (Replace with actual hashing method)
    hashed_password = password  # For simplicity, storing raw password here
    query = f"""
    INSERT INTO `{PROJECT_ID}.your_dataset.users` 
    (username, first_name, last_name, email, phone_number, hashed_password) 
    VALUES ('{username}', '{first_name}', '{last_name}', '{email}', '{phone_number}', '{hashed_password}')
    """
    db.query(query).result()
    return {"msg": "User registered successfully"}

# Login route with JWT token
@router.post("/token/")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: bigquery.Client = Depends(get_bigquery_client)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
