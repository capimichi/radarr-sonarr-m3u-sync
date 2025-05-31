import asyncio
from injector import inject
from fastapi import APIRouter, HTTPException, status, Query
from fastapi.responses import StreamingResponse
from typing import AsyncGenerator
import json
from radarrsonarrm3usync.service.DownloadService import DownloadService


class DownloadController:

    @inject
    def __init__(self, download_service: DownloadService):
        self.download_service = download_service
        self.router = APIRouter(prefix="/download", tags=["Download"])
        self._register_routes()
    
    def _register_routes(self):
        """Registra le rotte per il controller"""
        self.router.add_api_route("/", self.download, methods=["POST"])
        
    async def download(
        self, 
        url: str = Query(..., description="URL to download"),
        path: str = Query(..., description="Path where to save the file")
    ) -> StreamingResponse:
        """Scarica un file con aggiornamenti di progresso in streaming"""
        
        async def generate_progress():
            async for update in self.download_service.download(url, path):
                # Formatta l'aggiornamento come evento SSE
                yield f"data: {json.dumps(update)}\n\n"
        
        return StreamingResponse(
            generate_progress(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        )
