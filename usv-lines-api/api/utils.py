import json
import os
import matplotlib.pyplot as plt
from shapely.geometry import Polygon, LineString, Point
import numpy as np
import logging
from shapely.geometry import Polygon
from shapely.ops import triangulate
import matplotlib.pyplot as plt
import hertel

DEFAULT_CONFIG = {
  'apiKey': 'E006198D3D2D034197622ADE3E8DF111',
  'someSetting': 'light',
  'rememberMe': False,
  'typeOfLines': 'enabled',
  'sliderExample': 30,
}

CONFIG_FILE = 'config.json'

def load_config():
    project_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(project_dir, CONFIG_FILE)
    if os.path.exists(config_path):
        with open(config_path, 'r') as file:
            return json.load(file)
    else:
        return DEFAULT_CONFIG

def save_config(config):
    project_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(project_dir, CONFIG_FILE)
    with open(config_path, 'w') as file:
        json.dump(config, file, indent=2)


def triangulate_and_merge(polygon_data):
    polygon_data_tuple = tuple(tuple(coord) for coord in polygon_data)
    result = hertel.convex_decomposition(polygon_data_tuple)

    # Create a new figure and axis
    fig, ax = plt.subplots()

    # Plot the original polygon
    original_polygon = plt.Polygon(polygon_data, edgecolor='blue', linewidth=1, fill=False)
    ax.add_patch(original_polygon)

    # Plot the triangulated polygons
    for polygon in result:
        triangulated_polygon = plt.Polygon(polygon, edgecolor='red', linewidth=0.5, fill=False)
        ax.add_patch(triangulated_polygon)

    # Set equal aspect ratio and limits
    ax.set_aspect('equal')
    ax.autoscale_view()

    # Save the plot locally
    plt.savefig('triangulation_result.png', dpi=300)

    # Close the figure to free up memory
    plt.close(fig)

    return result

