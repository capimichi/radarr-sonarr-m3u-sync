from injector import inject
from fastapi import APIRouter, HTTPException, status
from radarrsonarrm3usync.config.DefaultConfig import DefaultConfig
from radarrsonarrm3usync.model.Configuration import Configuration


class ConfigurationController:

    @inject
    def __init__(self, config: DefaultConfig):
        self.config = config
        self.router = APIRouter(prefix="/configuration", tags=["Configuration"])
        self._register_routes()
    
    def _register_routes(self):
        """Registra le rotte per il controller delle configurazioni"""
        self.router.add_api_route("", self.get_configuration, methods=["GET"])
        self.router.add_api_route("", self.update_configuration, methods=["POST"])
        
    async def get_configuration(self) -> Configuration:
        """Ottiene la configurazione attuale"""
        return self.config.get_config()
        
    async def update_configuration(self, new_config: Configuration) -> Configuration:
        """Aggiorna la configurazione dell'applicazione"""
        try:
            self.config.update_config(new_config)
            return self.config.get_config()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Errore durante l'aggiornamento della configurazione: {str(e)}"
            )
