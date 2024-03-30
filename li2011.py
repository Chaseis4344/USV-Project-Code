import numpy as np
import math
from shapely.geometry import Polygon, LineString, MultiPolygon
from shapely.ops import polygonize
import sys
import matplotlib.pyplot as plt

sys.setrecursionlimit(20000)

def is_concave(p1, p2, p3):
    v1 = p2 - p1
    v2 = p3 - p2
    cross_product = v1[0] * v2[1] - v1[1] * v2[0]
    return cross_product < 0

def identify_concave_vertices(vertices):
    n = len(vertices)
    concave_vertices = []
    
    for i in range(n):
        p1 = vertices[i]
        p2 = vertices[(i+1) % n]
        p3 = vertices[(i+2) % n]
        
        if is_concave(p1, p2, p3):
            concave_vertices.append(i+1)
    
    return concave_vertices


def calculate_width(vertices):
    # Implementation of the linear time algorithm to calculate the width of a convex polygon
    # You can use the algorithm from Section 3.2 of the paper here
    # For simplicity, we'll use the width of the bounding box as an approximation
    x_min, y_min = np.min(vertices, axis=0)
    x_max, y_max = np.max(vertices, axis=0)
    return min(x_max - x_min, y_max - y_min)

def find_optimal_diagonal(polygon, concave_vertices, tried_diagonals=None):
    if tried_diagonals is None:
        tried_diagonals = set()

    min_width_sum = float('inf')
    optimal_diagonal = None
    optimal_vertex_index = None

    for concave_vertex_index in concave_vertices:
        vertices = list(polygon.exterior.coords)
        n = len(vertices)
        concave_vertex = vertices[concave_vertex_index]

        for i in range(n):
            if i == concave_vertex_index or (i-1) % n == concave_vertex_index:
                continue

            diagonal = LineString([concave_vertex, vertices[i]])

            # Check if the diagonal has already been tried
            if diagonal.wkt in tried_diagonals:
                continue

            tried_diagonals.add(diagonal.wkt)

            # Check if the diagonal intersects the polygon boundary
            if not polygon.boundary.intersects(diagonal):
                continue

            # Split the polygon into two subpolygons
            subpolygon1_vertices = vertices[concave_vertex_index:i+1]
            subpolygon2_vertices = vertices[i:] + vertices[:concave_vertex_index+1]

            # Ensure subpolygons have at least 4 vertices
            if len(subpolygon1_vertices) < 4 or len(subpolygon2_vertices) < 4:
                continue

            subpolygon1 = Polygon(subpolygon1_vertices)
            subpolygon2 = Polygon(subpolygon2_vertices)

            # Check if subpolygons are valid
            if not subpolygon1.is_valid or not subpolygon2.is_valid:
                continue

            width_sum = calculate_width(subpolygon1.exterior.coords) + calculate_width(subpolygon2.exterior.coords)

            if width_sum < min_width_sum:
                min_width_sum = width_sum
                optimal_diagonal = diagonal
                optimal_vertex_index = concave_vertex_index

    return optimal_diagonal, optimal_vertex_index, tried_diagonals

def decompose_polygon(polygon, concave_vertices, depth=0, max_depth=1000, tried_diagonals=None):
    if not concave_vertices or depth >= max_depth:
        return [polygon]

    diagonal, concave_vertex_index, tried_diagonals = find_optimal_diagonal(polygon, concave_vertices, tried_diagonals)

    if diagonal is None:
        print("No valid diagonal found for decomposition")
        return [polygon]

    print(f"Decomposing polygon with diagonal from vertex {concave_vertex_index}")

    # Visualize the optimal diagonal
    

    
    split_polygons = split(polygon, diagonal)

    subregions = []
    for subpolygon in split_polygons:
        sub_concave_vertices = [v for v in range(len(subpolygon.exterior.coords)) if subpolygon.exterior.coords[v] in polygon.exterior.coords and v in concave_vertices]
        subregions.extend(decompose_polygon(subpolygon, sub_concave_vertices, depth+1, max_depth))

    return subregions

def split(polygon, diagonal):
    union = polygon.exterior.union(diagonal)
    polygons = list(polygonize(union))
    return polygons

def plot_subregions(subregions):
    fig, ax = plt.subplots()
    
    for subregion in subregions:
        x, y = subregion.exterior.xy
        ax.plot(x, y, 'k', linewidth=2)
        ax.fill(x, y, alpha=0.5)
    
    ax.set_aspect('equal')
    ax.set_xlim(min(vertices[:, 0]) - 1, max(vertices[:, 0]) + 1)
    ax.set_ylim(min(vertices[:, 1]) - 1, max(vertices[:, 1]) + 1)
    plt.show()


vertices = np.array([
    [0.45, 0.75], [2.37, 1.49], [4.15, 0.32], [3.63, 1.48], [5.58, 1.78],
    [7.45, 3.21], [6.12, 3.58], [4.75, 6.15], [4.32, 5.94], [3.75, 4.55],
    [2.45, 6.44], [1.55, 5.45], [2.51, 3.67]
])

polygon = Polygon(vertices)
concave_vertices = identify_concave_vertices(vertices)
subregions = decompose_polygon(polygon, concave_vertices)

print("Number of subregions:", len(subregions))
plot_subregions(subregions)



