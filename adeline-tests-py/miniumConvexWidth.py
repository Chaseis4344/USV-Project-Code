import math

def polygon_width(polygon):
    n = len(polygon)
    if n < 2:
        return 0

    # Sort the vertices of the polygon in clockwise order
    polygon.sort(key=lambda p: (p[0], p[1]))

    # Find the antipodal pairs and compute the minimum distance
    min_dist = float('inf')
    for i in range(n):
        j = (i + 1) % n
        while j != i:
            dist = distance(polygon[i], polygon[j])
            min_dist = min(min_dist, dist)
            next_j = (j + 1) % n
            if orientation(polygon[i], polygon[j], polygon[next_j]) < 0:
                break
            j = next_j

    return min_dist

def distance(p1, p2):
    dx = p2[0] - p1[0]
    dy = p2[1] - p1[1]
    return math.sqrt(dx * dx + dy * dy)

def orientation(p, q, r):
    return (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])

# Example usage
polygon = [
    (0, 0),
    (1, 0),
    (1.5, 0.8660254037844386),
    (1, 1.7320508075688772),
    (0, 1.7320508075688772),
    (-0.5, 0.8660254037844386)
]
width = polygon_width(polygon)
print("Width of the polygon:", width)