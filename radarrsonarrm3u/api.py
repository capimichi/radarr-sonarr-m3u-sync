import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from radarrsonarrm3u.container.DefaultContainer import DefaultContainer
from radarrsonarrm3u.controller.SearchController import SearchController
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

app.mount("/", StaticFiles(directory="dist", html=True), name="dist")

search_controller = default_container.get(SearchController)

# Includiamo il router del SearchController nell'app
app.include_router(search_controller.router)

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}

# Per eseguire il server direttamente quando si esegue questo file
if __name__ == "__main__":
    uvicorn.run(
        "radarrsonarrm3u.api:app",  # Percorso completo del modulo
        host=default_container.get_var("api_host"),
        port=default_container.get_var("api_port"),
        reload=True
    )