from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .database import engine, Base
from .seed import seed_database
from .routes import auth, roommates, listings, interactions

# Ensure tables and seed data are initialized
Base.metadata.create_all(bind=engine)
seed_database()

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(
    title="Smart Rental & Roommate Compatibility API",
    description="Intelligent housing and flatmate matching platform pairing rental discovery with an algorithmic compatibility engine.",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(roommates.router)
app.include_router(listings.router)
app.include_router(interactions.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "platform": "Smart Rental & Roommate Compatibility System",
        "documentation": "/docs",
        "endpoints": {
            "roommates": "/api/roommates?current_user_id=1",
            "listings": "/api/listings",
            "users": "/api/auth/users",
            "rent_splitter": "/api/interactions/fair-rent-split"
        }
    }
