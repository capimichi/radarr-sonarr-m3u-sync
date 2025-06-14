import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from radarrsonarrm3usync.container.DefaultContainer import DefaultContainer
from radarrsonarrm3usync.controller.DownloadController import DownloadController
from radarrsonarrm3usync.controller.SearchController import SearchController
from radarrsonarrm3usync.controller.ConfigurationController import ConfigurationController
from radarrsonarrm3usync.controller.SeriesController import SeriesController
import uvicorn
from starlette.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles


# Creazione dell'istanza dell'applicazione FastAPI
app = FastAPI(
    title="API",
    description="API per la gestione",
    version="1.0.0"
)

default_container: DefaultContainer = DefaultContainer.getInstance()

# Istanziamo il controller tramite il container di dipendenze
# first_controller = default_container.get(FirstController)
# Includiamo il router del controller nell'app
# app.include_router(first_controller.router)

# Configurazione CORS per consentire richieste da altre origini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In produzione, specificare le origini consentite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


search_controller = default_container.get(SearchController)
configuration_controller = default_container.get(ConfigurationController)
series_controller = default_container.get(SeriesController)
download_controller = default_container.get(DownloadController)

# Includiamo il router del SearchController nell'app
app.include_router(search_controller.router, prefix="/api")
# Includiamo il router del ConfigurationController nell'app
app.include_router(configuration_controller.router, prefix="/api")
# Includiamo il router del SeriesController nell'app
app.include_router(series_controller.router, prefix="/api")
# Includiamo il router del DownloadController nell'app
app.include_router(download_controller.router, prefix="/api")

app.mount("/", StaticFiles(directory="dist", html=True), name="dist")

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}

# Per eseguire il server direttamente quando si esegue questo file
if __name__ == "__main__":
    uvicorn.run(
        "radarrsonarrm3usync.api:app",  # Percorso completo del modulo
        host=default_container.get_var("api_host"),
        port=default_container.get_var("api_port"),
        reload=default_container.get_var("uvicorn_reload"),
    )