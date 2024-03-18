import re
from simplification.cutil import simplify_coords
from shapely.geometry import MultiPoint, Polygon, LineString
import matplotlib.pyplot as plt

def parse_input_file(file_path):
    points = []
    with open(file_path, 'r') as file:
        for line in file:
            match = re.search(r'([-\d.]+),([-\d.]+),([-\d.]+)', line)
            if match:
                x, y, z = map(float, match.groups())
                points.append((x, y, z))
    return points

def remove_duplicates(points):
    unique_points = list(set(points))
    return unique_points

def calculate_concave_hull(points, tolerance):
    xy_points = [(p[0], p[1]) for p in points]
    simplified_points = simplify_coords(xy_points, tolerance)
    concave_hull = MultiPoint(simplified_points).convex_hull
    return concave_hull

def plot_concave_hull(points, concave_hull):
    x, y = zip(*[(p[0], p[1]) for p in points])
    plt.figure(figsize=(10, 8))
    plt.plot(x, y, 'o', color='blue', markersize=3, label='Points')
    
    if isinstance(concave_hull, LineString) and len(concave_hull.coords) >= 4:
        concave_hull = Polygon(concave_hull)
        plt.plot(*concave_hull.exterior.xy, color='red', linewidth=2, label='Concave Hull')
    elif isinstance(concave_hull, Polygon):
        plt.plot(*concave_hull.exterior.xy, color='red', linewidth=2, label='Concave Hull')
    else:
        print("Insufficient coordinates to plot the concave hull.")
    
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('Concave Hull')
    plt.legend()
    plt.grid(True)
    plt.show()

# Example usage
input_file = 'Measu_Dredge_data.txt'
tolerance = 1.0  # Adjust the tolerance value to control the level of simplification

points = parse_input_file(input_file)
unique_points = remove_duplicates(points)
concave_hull = calculate_concave_hull(unique_points, tolerance)

plot_concave_hull(unique_points, concave_hull)