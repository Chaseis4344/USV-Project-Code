import matplotlib
import json
import os
matplotlib.use("Agg")  # Set the Matplotlib backend to 'Agg'
import matplotlib.pyplot as plt
from shapely.geometry import Polygon, LineString, Point
import numpy as np
import logging


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


def is_convex_polygon(poly):
    if not poly.is_valid or poly.is_empty:
        print(f"Invalid polygon: {poly}")
        return False

    coords = list(poly.exterior.coords)[:-1]
    N = len(coords)

    # Initialize the sign of the cross product of the first pair of edges
    prev_sign = None
    for i in range(N):
        p1, p2, p3 = coords[i], coords[(i + 1) % N], coords[(i + 2) % N]

        # Calculate cross product components
        cross_product = (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (
            p3[0] - p1[0]
        )

        # Determine the sign of the cross product
        current_sign = np.sign(cross_product)

        # If the sign is established and differs from the previous, the polygon is concave
        if prev_sign is not None and current_sign != 0 and prev_sign != current_sign:
            print(f"Concave polygon: {poly}")
            return False

        # Update the previous sign if current sign is non-zero
        if current_sign != 0:
            prev_sign = current_sign

    print(f"Convex polygon: {poly}")
    return True


def can_see(verts, i, j):
    if i == j or (i + 1) % len(verts) == j or (j + 1) % len(verts) == i:
        return False

    edge = LineString([verts[i], verts[j]])
    for k in range(len(verts)):
        if k == i or k == j:
            continue

        next_k = (k + 1) % len(verts)
        edge2 = LineString([verts[k], verts[next_k]])

        if edge.intersects(edge2):
            # Get the intersection point
            intersection = edge.intersection(edge2)
            # Check if the intersection is at the endpoints of edge2
            if intersection.equals(Point(verts[k])) or intersection.equals(Point(verts[next_k])):
                continue
            return False

    return True


def decomp(poly, depth=0):
    # Add indentation based on recursion depth for better readability
    indent = '  ' * depth
    print(f"{indent}Decomposing polygon: {poly}")

    verts = list(poly.exterior.coords)[:-1]
    n = len(verts)
    if is_convex_polygon(poly):
        print(f"{indent}Polygon is convex.")
        return [poly]

    min_decomp = []
    min_diags = float("inf")

    for i in range(n):
        for j in range(n):
            if i != j:
                print(f"{indent}Checking visibility between vertices {i} and {j}")
                if can_see(verts, i, j):
                    print(f"{indent}Vertices {i} and {j} are visible to each other")

                    left_verts = verts[i:] + verts[:j+1]
                    right_verts = verts[j:i+1]

                    left = Polygon(left_verts)
                    right = Polygon(right_verts)

                    if left.is_valid and right.is_valid:
                        print(f"{indent}Splitting polygon into left and right parts")
                        tmp_left = decomp(left, depth + 1)
                        tmp_right = decomp(right, depth + 1)
                        tmp = tmp_left + tmp_right

                        if len(tmp) < min_diags:
                            min_decomp = tmp
                            min_diags = len(tmp)
                    else:
                        print(f"{indent}Invalid split at i={i}, j={j}: Left({left.is_valid}), Right({right.is_valid})")
                else:
                    print(f"{indent}Vertices {i} and {j} are not visible to each other")

    if not min_decomp:
        print(f"{indent}Decomposition failed for polygon with vertices: {verts}")

    return min_decomp

def process_polygon(polygon_data):
    for i, feature in enumerate(polygon_data):
        coordinates = feature["geometry"]["coordinates"][0]
        poly = Polygon(coordinates)
        decomposed_polys = decomp(poly)

        # Set the size of the plot
        plt.figure(figsize=(10, 8))

        all_x = []  # List to store all x coordinates
        all_y = []  # List to store all y coordinates

        for dpoly in decomposed_polys:
            x, y = dpoly.exterior.xy
            all_x.extend(x)
            all_y.extend(y)
            plt.plot(x, y, marker="o")
            plt.fill(x, y, alpha=0.3)

        plt.title(f'Decomposed Polygon ID: {feature["id"]}')
        plt.xlabel("Longitude")
        plt.ylabel("Latitude")

        # Set equal aspect ratio
        plt.gca().set_aspect('equal', adjustable='box')

        if all_x and all_y:
            # Adjust the buffer around the polygon
            buffer = 0.01  # Smaller buffer for longitude/latitude scale
            plt.xlim(min(all_x) - buffer, max(all_x) + buffer)
            plt.ylim(min(all_y) - buffer, max(all_y) + buffer)
        else:
            print(f"No valid polygons found for decomposition in Polygon ID: {feature['id']}")

        # Save the figure with a higher resolution
        plt.savefig(f"decomposed_polygon_{i}.png", dpi=300)
        plt.close()

    return {
        "processed": True,
        "data": polygon_data,
    }
