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
            "title": "Пропуск 1",
            "startDate": "01.10.2023 00:00",
            "endDate": "15.10.2023 23:59",
            "status": "approved",
            "files": ["https://example.com/file1.pdf", "https://example.com/file2.jpg"],
        },
        {
            "id": "2",
            "title": "Пропуск 2",
            "startDate": "01.11.2023 00:00",
            "endDate": "30.11.2023 23:59",
            "status": "checking",
            "files": [],
        },
        {
            "id": "3",
            "title": "Пропуск 3",
            "startDate": "01.11.2023 00:00",
            "endDate": "30.11.2023 23:59",
            "status": "rejected",
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
    token: str
    token_type: str


# Login model
class LoginRequest(BaseModel):
    username: str
    password: str


class RefreshTokenRequest(BaseModel):
    token: str


# Card model
class Skip(BaseModel):
    id: str
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

    access_token = create_token({"sub": request.username}, timedelta(days=ACCESS_TOKEN_EXPIRE_MINUTES))

    return {"token": access_token, "token_type": "bearer"}


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
@app.get("/skips", response_model=list[Skip])
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
@app.post("/skips", response_model=Skip)
def add_user_card(card: Skip, token: str = Depends(oauth2_scheme)):
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


# Get skip by ID
@app.get("/get_skip/{id}", response_model=Skip)
def get_skip(id: str, token: str = Depends(oauth2_scheme)):
    for skip in fake_cards_db.get("user", []):
        if skip["id"] == id:
            return skip
    raise HTTPException(status_code=404, detail="Skip not found")


# Create a new skip
@app.post("/create_skip", response_model=Skip)
def create_skip(skip: Skip, token: str = Depends(oauth2_scheme)):
    new_skip = {
        "id": str(uuid.uuid4()),
        "startDate": skip.startDate,
        "endDate": skip.endDate,
        "status": skip.status,
        "files": skip.files,
    }
    fake_cards_db.setdefault("user", []).append(new_skip)
    return new_skip


# Extend skip
@app.post("/skips/{skip_id}/extensions", response_model=Skip)
def extend_skip(skip_id: str, new_end_date: str, new_files: list[str], token: str = Depends(oauth2_scheme)):
    for skips in fake_cards_db.values():
        for skip in skips:
            if skip["id"] == skip_id:
                skip["endDate"] = new_end_date
                skip["files"].extend(new_files)  # Update file list
                return skip
    raise HTTPException(status_code=404, detail="Skip not found")


# Get skips with status 'Pending'
@app.get("/skips_on_checking", response_model=list[Skip])
def get_absences_on_checking(token: str = Depends(oauth2_scheme)):
    return [skip for skip in fake_cards_db.get("user", []) if skip["status"] == "checking"]


# Install the required dependencies: pip install fastapi uvicorn python-jose[cryptography] passlib
# Run server: `uvicorn server:app --reload`
