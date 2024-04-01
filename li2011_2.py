import numpy as np
import matplotlib.pyplot as plt
from shapely.geometry import LineString, Polygon

def is_concave(p1, p2, p3):
    v1 = p2 - p1
    v2 = p3 - p2
    cross_product = v1[0] * v2[1] - v1[1] * v2[0]
    return cross_product < 0

def get_concave_vertices(vertices):
    concave_vertices = []
    n = len(vertices)
    for i in range(n):
        p1 = vertices[i]
        p2 = vertices[(i + 1) % n]
        p3 = vertices[(i + 2) % n]
        if is_concave(p1, p2, p3):
            concave_vertices.append(i)
    return concave_vertices

def generate_decomposition_lines(vertices, concave_vertex_index):
    decomposition_lines = []
    n = len(vertices)
    v_i = vertices[concave_vertex_index]

    # Extension from one edge of v_i
    for j in range(n):
        if j != concave_vertex_index and j != (concave_vertex_index - 1) % n:
            line = (v_i, vertices[j])
            if is_line_inside_polygon(vertices, line):
                print(line)
                decomposition_lines.append(line)

    # Connection between v_i and another concave vertex
    for j in get_concave_vertices(vertices):
        if j != concave_vertex_index:
            line = (v_i, vertices[j])
            if is_line_inside_polygon(vertices, line):
                print(line)
                decomposition_lines.append(line)
    # Line passing through v_i and parallel to an edge of P
    for j in range(n):
        edge = vertices[j] - vertices[(j - 1) % n]
        normal = np.array([-edge[1], edge[0]])
        if is_line_inside_polygon(vertices, line):
            decomposition_lines.append((v_i, v_i + normal))

    # Connection between v_i and a convex vertex
    for j in range(n):
        if j != concave_vertex_index and j not in get_concave_vertices(vertices):
            line = (v_i, vertices[j])
            if is_line_inside_polygon(vertices, line):
                print(line)
                decomposition_lines.append(line)

    return decomposition_lines


def is_line_inside_polygon(vertices, line):
    polygon = Polygon(vertices)
    line_start, line_end = line
    line_segment = LineString([line_start, line_end])
    return polygon.contains(line_segment)

def polygon_width(vertices):
    # Rotate the polygon to find the minimum distance between parallel lines
    min_width = float('inf')
    n = len(vertices)
    for i in range(n):
        p1 = vertices[i]
        p2 = vertices[(i + 1) % n]
        edge = p2 - p1
        normal = np.array([-edge[1], edge[0]])
        normal = normal / (np.linalg.norm(normal) + 1e-10)

        # Project vertices onto the normal vector
        projections = np.dot(vertices, normal)
        width = np.max(projections) - np.min(projections)
        min_width = min(min_width, width)

    return min_width


def find_optimal_split(vertices, concave_vertex_index, decomposition_lines):
    min_width_sum = float('inf')
    optimal_split = None

    for line in decomposition_lines:
        sub_polygons = split_polygon(vertices, line)
        width_sum = sum(polygon_width(sub_polygon) for sub_polygon in sub_polygons)

        if width_sum < min_width_sum:
            min_width_sum = width_sum
            optimal_split = line

    return optimal_split, min_width_sum

def split_polygon(vertices, decomposition_line):
    line_start, line_end = decomposition_line
    distances = [signed_distance(v, line_start, line_end) for v in vertices]

    sub_polygon1 = [vertices[i] for i in range(len(vertices)) if distances[i] >= 0]
    sub_polygon2 = [vertices[i] for i in range(len(vertices)) if distances[i] < 0]

    # Add intersection points to sub-polygons
    for i in range(len(vertices)):
        j = (i + 1) % len(vertices)
        if distances[i] * distances[j] < 0:
            intersection = line_intersection(vertices[i], vertices[j], line_start, line_end)
            sub_polygon1.append(intersection)
            sub_polygon2.append(intersection)

    return [np.array(sub_polygon1), np.array(sub_polygon2)]


def line_intersection(p1, p2, q1, q2):
    r = p2 - p1
    s = q2 - q1
    cross_product = np.cross(r, s)
    if np.abs(cross_product) < 1e-10:
        return None
    t = np.cross(q1 - p1, s) / cross_product
    intersection = p1 + t * r
    return intersection


def signed_distance(point, line_start, line_end):
    dx = line_end[0] - line_start[0]
    dy = line_end[1] - line_start[1]
    return (point[0] - line_start[0]) * dy - (point[1] - line_start[1]) * dx


# Test the implementation
vertices = np.array([
    [0.45, 0.75], [2.37, 1.49], [4.15, 0.32], [3.63, 1.48], [5.58, 1.78],
    [7.45, 3.21], [6.12, 3.58], [4.75, 6.15], [4.32, 5.94], [3.75, 4.55],
    [2.45, 6.44], [1.55, 5.45], [2.51, 3.67], [0.45, 0.75]
])

concave_vertices = get_concave_vertices(vertices)

# Plot the polygon
plt.figure(figsize=(8, 6))
plt.plot(vertices[:, 0], vertices[:, 1], 'b-', linewidth=2)
plt.plot(vertices[:, 0], vertices[:, 1], 'bo', markersize=8)

# Plot the optimal splits
colors = ['r', 'g', 'm', 'c', 'y']
for i, concave_vertex_index in enumerate(concave_vertices):
    decomposition_lines = generate_decomposition_lines(vertices, concave_vertex_index)
    optimal_split, min_width_sum = find_optimal_split(vertices, concave_vertex_index, decomposition_lines)
    line_start, line_end = optimal_split
    plt.plot([line_start[0], line_end[0]], [line_start[1], line_end[1]], f'{colors[i]}--', linewidth=2)

# Set labels and title
plt.xlabel('x')
plt.ylabel('y')
plt.title('Polygon and Optimal Splits')

# Display the plot
plt.grid(True)
plt.axis('equal')
plt.show()
