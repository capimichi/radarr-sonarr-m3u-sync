# Radarr Sonarr m3u sync - Radarr/Sonarr M3U8 Sync Tool

🎬 **Radarr Sonarr m3u sync** is a full-stack web application that allows you to sync movies and TV series from your Radarr and Sonarr servers and download episodes from M3U8 links.

## 🌟 Key Features

- **Unified Management**: Modern web interface for managing Radarr and Sonarr
- **Smart Search**: Global search across movies and TV series
- **M3U8 Download**: Direct episode downloads from M3U8 links with real-time progress
- **Native Integration**: Complete integration with Radarr and Sonarr APIs
- **Responsive Interface**: Mobile-friendly UI with modern design
- **Simple Configuration**: Guided setup for Radarr and Sonarr

## 🏗️ Architecture

### Backend (Python)
- **FastAPI**: Modern web framework for REST APIs
- **Dependency Injection**: Dependency management with Injector
- **yt-dlp**: M3U8 content download with progress support
- **API Clients**: Dedicated clients for Radarr and Sonarr
- **Streaming**: Downloads with real-time progress updates

### Frontend (React + TypeScript)
- **React 19**: Modern UI framework with TypeScript
- **React Router**: Client-side navigation
- **Tailwind CSS**: Utility-first design system
- **FontAwesome**: Modern icons
- **Vite**: Fast build tool for development and production

## 📁 Project Structure

```
radarr-sonarr-m3u-sync/
├── radarrsonarrm3usync/          # Python Backend
│   ├── api.py                    # Main FastAPI application
│   ├── client/                   # API clients (Radarr, Sonarr)
│   ├── config/                   # Configuration management
│   ├── controller/               # API controllers
│   ├── service/                  # Business logic
│   ├── model/                    # Data models
│   └── helper/                   # Utilities (M3U download)
├── src/                          # React Frontend
│   ├── components/               # React components
│   ├── pages/                    # Application pages
│   ├── services/                 # Frontend API client
│   ├── types/                    # TypeScript types
│   └── utils/                    # Frontend utilities
├── package.json                  # Node.js dependencies
├── requirements.txt              # Python dependencies
└── vite.config.ts               # Vite configuration
```

## 🚀 Installation and Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Radarr and/or Sonarr running (optional)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/radarr-sonarr-m3u-sync.git
cd radarr-sonarr-m3u-sync
```

### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
python -m radarrsonarrm3usync.api
```
The backend will be available at `http://localhost:8000`

### 3. Frontend Setup
```bash
# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```
The frontend will be available at `http://localhost:5173`

### 4. Production Build
```bash
# Build the frontend
npm run build

# The backend will automatically serve static files from the dist/ folder
python -m radarrsonarrm3usync.api
```

## ⚙️ Configuration

### Initial Setup
1. Open the application in your browser
2. Go to **Settings** (gear icon)
3. Configure Radarr and/or Sonarr:
   - **Base URL**: Your server address (e.g., `http://localhost:7878`)
   - **API Key**: The server's API key
   - **Base Directory**: The folder where downloads will be saved

### Configuration File
Configuration is saved in `~/.radarr-sonarr-m3u-sync/config.json`

## 🎯 Features

### 🔍 Search
- Unified search across Radarr and Sonarr
- Results with images and metadata
- Direct links to series pages

### 📺 Series Management
- Detailed series view
- Navigation through seasons and episodes
- Download statistics and status

### ⬇️ M3U8 Download
- Manual M3U8 URL input
- Real-time download progress
- Automatic destination path generation
- Support for multiple episodes

### 🎨 User Interface
- Responsive and modern design
- Custom theme with Tailwind CSS
- FontAwesome icons
- Visual feedback for all operations

## 🛠️ API Endpoints

### Search
- `GET /api/search?term={query}` - Global search

### Series
- `GET /api/series/{id}` - Series details
- `GET /api/series/{id}/episodes?season_number={num}` - Season episodes

### Download
- `POST /api/download/?url={m3u8_url}&path={file_path}` - M3U8 download

### Configuration
- `GET /api/configuration` - Get configuration
- `POST /api/configuration` - Update configuration

## 🔧 Technologies Used

### Backend
- **FastAPI** - Modern web framework
- **Pydantic** - Data validation
- **Injector** - Dependency injection
- **yt-dlp** - Video download
- **Requests** - HTTP client

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Vite** - Build tool

## 📝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for details.

## 🐛 Bug Reports and Feature Requests

Use [GitHub Issues](https://github.com/your-username/radarr-sonarr-m3u-sync/issues) to:
- Report bugs
- Request new features
- Ask questions

## 🙏 Acknowledgments

- [Radarr](https://radarr.video/) - Movie management
- [Sonarr](https://sonarr.tv/) - TV series management
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Video download
- [React](https://reactjs.org/) - UI framework
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework