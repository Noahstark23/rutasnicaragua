from fastapi import FastAPI
from dotenv import load_dotenv
from .routes import router

load_dotenv()

app = FastAPI(title="Rutas Nicaragua API")

app.include_router(router)


@app.get("/")
async def root():
    return {"message": "Welcome to Rutas Nicaragua API"}
