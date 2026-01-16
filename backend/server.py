from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

from pydantic import ValidationError

from routers import products
from routers import cart
from routers import users

from database import init_db, init_cache


async def lifespan(app: FastAPI):
    await init_db()
    await init_cache()
    yield


app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=422,
        content=jsonable_encoder({"message": str(exc)}),
    )


app.include_router(products.router)
app.include_router(cart.router)
app.include_router(users.router)
