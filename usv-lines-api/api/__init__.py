from flask import Flask
from flask_cors import CORS
import logging
from .api import api_blueprint
from .utils import load_config, save_config, DEFAULT_CONFIG

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configure logging to console
    app.logger.setLevel(logging.DEBUG)

    # Load the configuration
    loaded_config = load_config()
    app.config.from_mapping(loaded_config)

    # Register the blueprint
    app.register_blueprint(api_blueprint)

    # Save the default configuration if the file doesn't exist
    if loaded_config == DEFAULT_CONFIG:
        save_config(DEFAULT_CONFIG)

    return app