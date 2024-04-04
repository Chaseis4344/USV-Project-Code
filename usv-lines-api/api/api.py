from flask import Blueprint, request, jsonify, current_app
from .utils import process_polygon, load_config, save_config
import logging

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/api/process-polygon', methods=['POST'])
def process_polygon_route():
    data = request.json
    polygon_data = data.get('polygonData')
    
    if not polygon_data:
        current_app.logger.error('No polygon data provided')
        return jsonify({'error': 'No polygon data provided'}), 400

    # Use logging module to check the log level
    if current_app.logger.isEnabledFor(logging.DEBUG):
        current_app.logger.debug(f'Processing polygon data: {polygon_data}')

    processed_data = process_polygon(polygon_data)
    current_app.logger.info('Successfully processed polygon data')
    return jsonify(processed_data)

@api_blueprint.route('/api/config', methods=['GET'])
def get_config():
    config = load_config()
    return jsonify(config)

@api_blueprint.route('/api/config', methods=['POST'])
def update_config():
    config = load_config()
    data = request.get_json()
    config.update(data)
    save_config(config)
    return jsonify({'message': 'Configuration updated successfully'})
