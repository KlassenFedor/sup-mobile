from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
import secrets
import uuid
from fastapi.middleware.cors import CORSMiddleware

# Secret key for signing JWTs
SECRET_KEY = secrets.token_hex(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Use specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Dummy user database (replace with real DB)
fake_users_db = {
    "user": {
        "username": "user",
        "password": "password",
    }
}

# Dummy database for user cards
fake_cards_db = {
    "user": [
        {
            "id": "1",
            "title": "Pass 1",
            "startDate": "2023-10-01",
            "endDate": "2023-10-15",
            "status": "Approved",
            "files": ["https://example.com/file1.pdf", "https://example.com/file2.jpg"],
        },
        {
            "id": "2",
            "title": "Pass 2",
            "startDate": "2023-11-01",
            "endDate": "2023-11-30",
            "status": "Pending",
            "files": [],
        },
    ]
}


# Dummy user database
fake_users_db = {
    "user": {
        "username": "user",
        "password": "password",
        "profile": {
            "name": "Ivan Ivanov",
            "email": "ivan.ivanov@example.ru",
            "groupCode": "999999",
            "courseNumber": "3"
        }
    }
}


# Token model
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


# Login model
class LoginRequest(BaseModel):
    username: str
    password: str


class RefreshTokenRequest(BaseModel):
    token: str


# Card model
class CardItem(BaseModel):
    id: str
    title: str
    startDate: str
    endDate: str
    status: str
    files: list[str]


# Profile model
class UserProfile(BaseModel):
    name: str
    email: str
    groupCode: str
    courseNumber: str


# Function to create JWT tokens
def create_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@app.get("/")
def read_root():
    return {"message": "CORS is enabled!"}


# Login endpoint
@app.post("/login", response_model=Token)
def login(request: LoginRequest):
    user = fake_users_db.get(request.username)
    if not user or user["password"] != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_token({"sub": request.username}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_token({"sub": request.username}, timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


# Token refresh endpoint
@app.post("/refresh", response_model=Token)
def refresh_token(token: RefreshTokenRequest):
    try:
        payload = jwt.decode(token.token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    access_token = create_token({"sub": username}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

    return {"access_token": access_token, "refresh_token": token.token, "token_type": "bearer"}


# Get user cards endpoint
@app.get("/cards", response_model=list[CardItem])
def get_user_cards(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    # Retrieve cards for the authenticated user
    user_cards = fake_cards_db.get(username, [])
    return user_cards


# Add new card endpoint
@app.post("/cards", response_model=CardItem)
def add_user_card(card: CardItem, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    new_card = {
        "id": str(uuid.uuid4()),  # Generate unique ID
        "title": card.title,
        "startDate": card.startDate,
        "endDate": card.endDate,
        "status": card.status,
        "files": card.files,
    }

    if username not in fake_cards_db:
        fake_cards_db[username] = []

    fake_cards_db[username].append(new_card)
    return new_card


# Get user profile
@app.get("/profile", response_model=UserProfile)
def get_profile(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_profile = fake_users_db.get(username, {}).get("profile")
    if not user_profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    return user_profile


# Run server: `uvicorn server:app --reload`
