# Radarr Sonarr m3u sync - Radarr/Sonarr M3U8 Sync Tool

🎬 **Radarr Sonarr m3u sync** è un'applicazione web full-stack che consente di sincronizzare film e serie TV dai tuoi server Radarr e Sonarr e scaricare episodi da link M3U8.

## 🌟 Caratteristiche Principali

- **Gestione Unificata**: Interfaccia web moderna per gestire Radarr e Sonarr
- **Ricerca Intelligente**: Ricerca globale attraverso film e serie TV
- **Download M3U8**: Download diretto di episodi da link M3U8 con progresso in tempo reale
- **Integrazione Nativa**: Integrazione completa con le API di Radarr e Sonarr
- **Interface Responsive**: UI mobile-friendly con design moderno
- **Configurazione Semplice**: Setup guidato per Radarr e Sonarr

## 🏗️ Architettura

### Backend (Python)
- **FastAPI**: Framework web moderno per le API REST
- **Dependency Injection**: Gestione delle dipendenze con Injector
- **yt-dlp**: Download di contenuti M3U8 con supporto per il progresso
- **Client API**: Client dedicati per Radarr e Sonarr
- **Streaming**: Download con aggiornamenti di progresso in tempo reale

### Frontend (React + TypeScript)
- **React 19**: Framework UI moderno con TypeScript
- **React Router**: Navigazione client-side
- **Tailwind CSS**: Sistema di design utility-first
- **FontAwesome**: Icone moderne
- **Vite**: Build tool veloce per sviluppo e produzione

## 📁 Struttura del Progetto

```
radarr-sonarr-m3u-sync/
├── radarrsonarrm3usync/          # Backend Python
│   ├── api.py                    # Applicazione FastAPI principale
│   ├── client/                   # Client API (Radarr, Sonarr)
│   ├── config/                   # Gestione configurazione
│   ├── controller/               # Controller API
│   ├── service/                  # Logica di business
│   ├── model/                    # Modelli dati
│   └── helper/                   # Utility (M3U download)
├── src/                          # Frontend React
│   ├── components/               # Componenti React
│   ├── pages/                    # Pagine dell'applicazione
│   ├── services/                 # Client API frontend
│   ├── types/                    # Tipi TypeScript
│   └── utils/                    # Utility frontend
├── package.json                  # Dipendenze Node.js
├── requirements.txt              # Dipendenze Python
└── vite.config.ts               # Configurazione Vite
```

## 🚀 Installazione e Setup

### Prerequisiti
- Python 3.10+
- Node.js 18+
- Radarr e/o Sonarr in esecuzione (opzionale)

### 1. Clona il Repository
```bash
git clone https://github.com/your-username/radarr-sonarr-m3u-sync.git
cd radarr-sonarr-m3u-sync
```

### 2. Setup Backend
```bash
# Installa le dipendenze Python
pip install -r requirements.txt

# Avvia il server backend
python -m radarrsonarrm3usync.api
```
Il backend sarà disponibile su `http://localhost:8000`

### 3. Setup Frontend
```bash
# Installa le dipendenze Node.js
npm install

# Avvia il server di sviluppo
npm run dev
```
Il frontend sarà disponibile su `http://localhost:5173`

### 4. Build per Produzione
```bash
# Build del frontend
npm run build

# Il backend servirà automaticamente i file statici dalla cartella dist/
python -m radarrsonarrm3usync.api
```

## ⚙️ Configurazione

### Prima Configurazione
1. Apri l'applicazione nel browser
2. Vai su **Configurazioni** (icona ingranaggio)
3. Configura Radarr e/o Sonarr:
   - **URL Base**: L'indirizzo del tuo server (es. `http://localhost:7878`)
   - **API Key**: La chiave API del server
   - **Directory Base**: La cartella dove salvare i download

### File di Configurazione
La configurazione viene salvata in `~/.radarr-sonarr-m3u-sync/config.json`

## 🎯 Funzionalità

### 🔍 Ricerca
- Ricerca unificata attraverso Radarr e Sonarr
- Risultati con immagini e metadati
- Link diretti alle pagine delle serie

### 📺 Gestione Serie
- Visualizzazione dettagliata delle serie
- Navigazione per stagioni ed episodi
- Statistiche di download e stato

### ⬇️ Download M3U8
- Input manuale di URL M3U8
- Progresso di download in tempo reale
- Generazione automatica dei percorsi di destinazione
- Support per episodi multipli

### 🎨 Interface Utente
- Design responsive e moderno
- Tema personalizzato con Tailwind CSS
- Icone FontAwesome
- Feedback visivo per tutte le operazioni

## 🛠️ API Endpoints

### Ricerca
- `GET /api/search?term={query}` - Ricerca globale

### Serie
- `GET /api/series/{id}` - Dettagli serie
- `GET /api/series/{id}/episodes?season_number={num}` - Episodi stagione

### Download
- `POST /api/download/?url={m3u8_url}&path={file_path}` - Download M3U8

### Configurazione
- `GET /api/configuration` - Ottieni configurazione
- `POST /api/configuration` - Aggiorna configurazione

## 🔧 Tecnologie Utilizzate

### Backend
- **FastAPI** - Framework web moderno
- **Pydantic** - Validazione dati
- **Injector** - Dependency injection
- **yt-dlp** - Download video
- **Requests** - Client HTTP

### Frontend
- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Vite** - Build tool

## 📝 Contributi

I contributi sono benvenuti! Per contribuire:

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🐛 Bug Report e Feature Request

Usa le [GitHub Issues](https://github.com/your-username/radarr-sonarr-m3u-sync/issues) per:
- Segnalare bug
- Richiedere nuove funzionalità
- Porre domande

## 🙏 Riconoscimenti

- [Radarr](https://radarr.video/) - Gestione film
- [Sonarr](https://sonarr.tv/) - Gestione serie TV
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Download video
- [React](https://reactjs.org/) - Framework UI
- [FastAPI](https://fastapi.tiangolo.com/) - Framework backend