from flask import Flask
from flask_cors import CORS
import logging
from .core import api_blueprint

def create_app():
    app = Flask(__name__)
    CORS(app)
    # Configure logging to console
    app.logger.setLevel(logging.DEBUG)

    # Register the blueprint
    app.register_blueprint(api_blueprint)

    return app
