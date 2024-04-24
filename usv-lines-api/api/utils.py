import json
import os
import matplotlib.pyplot as plt
from shapely.geometry import Polygon, LineString, Point
import numpy as np
import logging
from shapely.geometry import Polygon
from shapely.ops import triangulate
import matplotlib.pyplot as plt
from .lib.PythonRobotics.PathPlanning.GridBasedSweepCPP import grid_based_sweep_coverage_path_planner

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


def coverage_path_planning(ox, oy, resolution):
    px, py = grid_based_sweep_coverage_path_planner.main(ox, oy, resolution)
    return px, py



