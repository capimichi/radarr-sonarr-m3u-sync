from pydantic import BaseModel
from typing import Optional
from pathlib import Path


class Configuration(BaseModel):
    """Complete application configuration model."""
    radarr_enabled: bool = False
    radarr_base_url: str = ""
    radarr_api_key: str = ""
    
    sonarr_enabled: bool = False
    sonarr_base_url: str = ""
    sonarr_api_key: str = ""
    