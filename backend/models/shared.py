from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class Timestamp(BaseModel):
    created_at: datetime = datetime.now()
    updated_at: Optional[datetime] = None
