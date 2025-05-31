import yt_dlp
import os
from typing import Callable, Optional, Dict, Any


class M3uHelper:
    
    @staticmethod
    def download(url: str, output_path: str, progress_hook: Optional[Callable[[Dict[str, Any]], None]] = None) -> None:
        """
        Download M3U content using yt-dlp.
        
        Args:
            url: URL to download
            output_path: Path where to save the downloaded file
            progress_hook: Optional callback function to receive progress updates
        """
        
        # Ensure output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Configure yt-dlp options
        ydl_opts = {
            'outtmpl': output_path,
            'format': 'best',
            'noplaylist': True,
        }
        
        # Add progress hook if provided
        if progress_hook:
            ydl_opts['progress_hooks'] = [progress_hook]
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])
                
        except Exception as e:
            raise Exception(f"Failed to download from {url}: {str(e)}")
