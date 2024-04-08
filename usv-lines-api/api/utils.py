import json
import os
import matplotlib.pyplot as plt
from shapely.geometry import Polygon, LineString, Point
import numpy as np
import logging
from shapely.geometry import Polygon
from shapely.ops import triangulate
import matplotlib.pyplot as plt

DEFAULT_CONFIG = {
  'apiKey': 'xxxxxxxxxxxxxx',
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
    vertices = np.array(polygon_data)
    polygon = Polygon(vertices)

    triangles = triangulate(polygon)

    convex_sub_regions = [tri for tri in triangles if polygon.contains(tri)]

    merged_regions = []
    while convex_sub_regions:
        current_region = convex_sub_regions.pop(0)
        merged = True
        while merged:
            merged = False
            for i, region in enumerate(convex_sub_regions):
                if current_region.intersects(region):
                    merged_region = current_region.union(region)
                    if merged_region.is_valid and merged_region.convex_hull.equals(merged_region):
                        current_region = merged_region
                        convex_sub_regions.pop(i)
                        merged = True
                        break
        merged_regions.append(current_region)

    # Visualize the original polygon and the merged convex sub-regions
    fig, ax = plt.subplots(figsize=(8, 6))
    x, y = polygon.exterior.xy
    ax.plot(x, y, color='black')
    for region in merged_regions:
        x, y = region.exterior.xy
        ax.fill(x, y, alpha=0.4, fc='r', ec='r')
    ax.set_aspect('equal')
    ax.set_title('Polygon Decomposition into Merged Convex Sub-Regions')
    plt.savefig('triangulation_result.png')



