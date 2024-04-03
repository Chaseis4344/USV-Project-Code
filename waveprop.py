import math
import matplotlib.pyplot as plt
import numpy as np

def cross_product(p1, p2, p0):
    x1, y1 = p1
    x2, y2 = p2
    x0, y0 = p0
    return (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0)

def is_convex(polygon):
    n = len(polygon)
    prev_cross = None
    for i in range(n):
        p1 = polygon[i]
        p2 = polygon[(i + 1) % n]
        p0 = polygon[i - 1]
        cross = cross_product(p1, p2, p0)
        if prev_cross is not None and prev_cross * cross < 0:
            return False
        prev_cross = cross
    return True

def clip_polygon(subject_polygon, clip_polygon):
    def inside(p):
        return all(np.cross(np.array(clip_polygon[j]) - np.array(clip_polygon[j - 1]),
                            np.array(p) - np.array(clip_polygon[j - 1])) >= 0
                   for j in range(len(clip_polygon)))

    def vec_intersect(p1, p2, q1, q2):
        a1 = p2[1] - p1[1]
        b1 = p1[0] - p2[0]
        c1 = a1 * p1[0] + b1 * p1[1]
        a2 = q2[1] - q1[1]
        b2 = q1[0] - q2[0]
        c2 = a2 * q1[0] + b2 * q1[1]
        det = a1 * b2 - a2 * b1
        if det == 0:
            return None
        x = (b2 * c1 - b1 * c2) / det
        y = (a1 * c2 - a2 * c1) / det
        return x, y

    # Check if the subject_polygon is entirely outside the clip_polygon
    if not any(inside(vertex) for vertex in subject_polygon):
        return []  # Return an empty list

    output_list = subject_polygon
    for edge in range(len(clip_polygon)):
        poly_output_list = []
        if output_list:
            prev_point = output_list[-1]
            prev_inside = inside(prev_point)
            for vertex in output_list:
                inside_now = inside(vertex)
                if inside_now:
                    poly_output_list.append(vertex)
                elif prev_inside:
                    intersection = vec_intersect(prev_point, vertex, clip_polygon[edge], clip_polygon[(edge + 1) % len(clip_polygon)])
                    if intersection:
                        poly_output_list.append(intersection)
                prev_point = vertex
                prev_inside = inside_now
            output_list = poly_output_list
        else:
            break

    return output_list

def wavefront_propagation(polygon):
    convex_pieces = []
    wavefront = [polygon]
    cuts = []

    while wavefront:
        current_poly = wavefront.pop(0)

        if is_convex(current_poly):
            convex_pieces.append(current_poly)
        else:
            n = len(current_poly)
            new_polys = []
            for i in range(n):
                p1 = current_poly[i]
                p2 = current_poly[(i + 1) % n]
                p3 = current_poly[(i + 2) % n]

                if cross_product(p1, p2, p3) < 0:
                    new_poly = [p2]
                    cut_start = p2
                    j = (i + 1) % n
                    while cross_product(p2, current_poly[j], p3) < 0:
                        new_poly.append(current_poly[j])
                        j = (j + 1) % n
                    cut_end = current_poly[j]
                    new_poly.append(cut_end)

                    # Ensure the new polygon is within the original polygon
                    new_poly = clip_polygon(new_poly, polygon)

                    if new_poly:
                        new_polys.append(new_poly)
                        cuts.append((cut_start, cut_end))
                    break  # Exit the loop after the first cut is made

            wavefront.extend(new_polys)

    return convex_pieces, cuts

def visualize_convex_pieces(polygon, convex_pieces, cuts):
    plt.figure(figsize=(8, 6))
    colors = ['b', 'g', 'r', 'c', 'm', 'y', 'k']

    # Plot the original polygon
    x_coords = [p[0] for p in polygon]
    y_coords = [p[1] for p in polygon]
    x_coords.append(polygon[0][0])
    y_coords.append(polygon[0][1])
    plt.plot(x_coords, y_coords, 'k--', linewidth=2, label='Original Polygon')

    # Plot the convex pieces
    for i, piece in enumerate(convex_pieces):
        x_coords = [p[0] for p in piece]
        y_coords = [p[1] for p in piece]
        x_coords.append(piece[0][0])
        y_coords.append(piece[0][1])
        plt.plot(x_coords, y_coords, colors[i % len(colors)], linewidth=2, label=f'Convex Piece {i+1}')

    # Plot the cuts
    for cut in cuts:
        cut_start, cut_end = cut
        cut_coords = [cut_start]
        current_vertex = cut_start
        for i in range(len(polygon)):
            p1 = polygon[i]
            p2 = polygon[(i + 1) % len(polygon)]
            if cross_product(p1, p2, current_vertex) > 0:
                current_vertex = p2
                cut_coords.append(current_vertex)
        cut_coords.append(cut_end)
        x_coords = [p[0] for p in cut_coords]
        y_coords = [p[1] for p in cut_coords]
        plt.plot(x_coords, y_coords, 'r-', linewidth=2, label='Cut' if cuts.index(cut) == 0 else None)

    plt.axis('equal')
    plt.title('Convex Decomposition')
    plt.legend()
    plt.show()

# Example usage
vertices = np.array([
    [0.45, 0.75], [2.37, 1.49], [4.15, 0.32], [3.63, 1.48], [5.58, 1.78],
    [7.45, 3.21], [6.12, 3.58], [4.75, 6.15], [4.32, 5.94], [3.75, 4.55],
    [2.45, 6.44], [1.55, 5.45], [2.51, 3.67], [0.45, 0.75]
])

polygon = [(x, y) for x, y in vertices]

convex_pieces, cuts = wavefront_propagation(polygon)
visualize_convex_pieces(polygon, convex_pieces, cuts)