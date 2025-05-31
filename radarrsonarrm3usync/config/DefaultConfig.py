import os
import json
from pathlib import Path
from typing import Dict, Any, Optional, Union
from injector import inject

from radarrsonarrm3usync.model.Configuration import Configuration

class DefaultConfig:
    """Manager for handling application configuration stored in JSON format."""
    
    @inject
    def __init__(self):
        self.config_dir = os.path.expanduser("~/.radarr-sonarr-m3u-sync")
        self.config_file = os.path.join(self.config_dir, "config.json")
        self.config = self._initialize_config()
    
    def _initialize_config(self) -> Configuration:
        """Initialize the configuration directory and file if they don't exist."""
        # Ensure config directory exists
        if not os.path.exists(self.config_dir):
            os.makedirs(self.config_dir, exist_ok=True)
        
        # Check if config file exists
        if not os.path.exists(self.config_file):
            default_config = self._get_default_config()
            self._save_config(default_config)
            return default_config
        
        # Load existing config
        try:
            with open(self.config_file, 'r') as f:
                config_data = json.load(f)
                return Configuration(**config_data)
        except json.JSONDecodeError:
            default_config = self._get_default_config()
            self._save_config(default_config)
            return default_config
    
    def _get_default_config(self) -> Configuration:
        """Return the default configuration."""
        return Configuration()
    
    def _save_config(self, config: Configuration) -> None:
        """Save configuration to file."""
        with open(self.config_file, 'w') as f:
            json.dump(config.dict(), f, indent=4)
    
    def get_config(self) -> Configuration:
        """Get the current configuration."""
        return self.config
    
    def update_config(self, new_config: Configuration) -> None:
        """Update the configuration with new values."""
        self.config = new_config
        self._save_config(self.config)
    
    def get_value(self, key: str, default: Any = None) -> Any:
        """
        Get a specific configuration value by attribute name.
        
        Example: config_manager.get_value("radarr_api_key")
        """
        if hasattr(self.config, key):
            return getattr(self.config, key)
        return default
    
    def set_value(self, key: str, value: Any) -> None:
        """
        Set a specific configuration value by attribute name.
        
        Example: config_manager.set_value("radarr_api_key", "your-api-key")
        """
        if hasattr(self.config, key):
            setattr(self.config, key, value)
            self._save_config(self.config)
