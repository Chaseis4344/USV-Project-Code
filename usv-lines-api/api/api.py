from flask import Blueprint, request, jsonify, current_app
from .utils import load_config, save_config, triangulate_and_merge
import logging

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/api/process-polygon', methods=['POST'])
def triangulate_polygon():
    try:
        data = request.get_json()
        print(f"Received data: {data}")
        
        if not data or not isinstance(data, dict) or 'polygonData' not in data:
            return jsonify({'status': 'error', 'message': 'Invalid JSON data'})
        
        polygon_data = data['polygonData']
        
        if not polygon_data or not isinstance(polygon_data, list) or len(polygon_data) == 0:
            return jsonify({'status': 'error', 'message': 'Missing or invalid polygon data'})
        
        polygon_coords = polygon_data[0].get('geometry', {}).get('coordinates', [])
        
        if not polygon_coords or len(polygon_coords) == 0:
            return jsonify({'status': 'error', 'message': 'Missing or invalid polygon coordinates'})
        
        result = triangulate_and_merge(polygon_coords[0])
        
        return jsonify({'status': 'success', 'result': result})
    
    except Exception as e:
        import traceback
        error_message = f"An error occurred: {str(e)}\n{traceback.format_exc()}"
        return jsonify({'status': 'error', 'message': error_message})

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


