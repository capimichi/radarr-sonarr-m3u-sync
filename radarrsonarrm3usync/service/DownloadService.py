import tempfile
from typing import AsyncGenerator, Dict, Any
import asyncio
from concurrent.futures import ThreadPoolExecutor
import os
import re
import subprocess
import time
from radarrsonarrm3usync.helper.M3uHelper import M3uHelper


class DownloadService:

    def __init__(self):
        self.executor = ThreadPoolExecutor(max_workers=1)

    async def download(self, url: str, path: str) -> AsyncGenerator[Dict[str, Any], None]:
        """
        Download a file and yield progress updates.
        
        Args:
            url: URL to download
            path: Path where to save the file
            
        Yields:
            Dictionary containing progress information
        """

        path_dir = os.path.dirname(path)
        if not os.path.exists(path_dir):
            os.makedirs(path_dir)

        template_path = path.replace(".mp4", ".%(ext)s").replace(".mkv", ".%(ext)s")
        log_file = f"{path}.log"

        # Create command with output redirection to log file
        command = [
            'yt-dlp',
            '--no-warnings',
            '--no-check-certificate',
            '-o',
            template_path,
            url,
        ]
        
        # Start the process in the background
        process = subprocess.Popen(
            command,
            stdout=open(log_file, 'w'),
            stderr=subprocess.STDOUT,
            text=True
        )
        
        # Yield progress updates by reading the log file
        completed = False
        progress = 0.0
        
        while not completed:
            # Check if process is still running
            if process.poll() is not None:
                completed = True
                progress = 100.0
            
            # Read the log file to get progress
            if os.path.exists(log_file):
                try:
                    with open(log_file, 'r') as f:
                        # Read all lines and get the last 10 or fewer
                        all_lines = f.readlines()
                        lines = all_lines[-10:] if len(all_lines) > 10 else all_lines
                        
                        for line in reversed(lines):
                            # Look for download progress information in yt-dlp format
                            # Example: [download] 30% of 144.08MiB in 00:00:08 at 17.16MiB/s
                            match = re.search(r'\[download\]\s+(\d+(?:\.\d+)?)%', line)
                            if match:
                                progress = float(match.group(1))
                                break
                except Exception as e:
                    # Log the exception but continue
                    print(f"Error reading progress: {str(e)}")
                    pass
            
            yield {
                "progress": progress,
                "completed": completed
            }
            
            # Wait before checking again
            await asyncio.sleep(1)
        
        # Clean up the log file if needed
        try:
            if os.path.exists(log_file):
                os.remove(log_file)
        except:
            pass

        
