import matplotlib.pyplot as plt

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def orientation(p, q, r):
    val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)
    if val == 0:
        return 0
    return 1 if val > 0 else -1

def is_reflex(poly, i):
    n = len(poly)
    p1 = poly[i]
    p2 = poly[(i + 1) % n]
    p0 = poly[(i - 1 + n) % n]

    if orientation(p0, p1, p2) == 1:
        return True
    return False

def is_diagonal(poly, i, j):
    n = len(poly)
    if orientation(poly[i], poly[j], poly[(i + 1) % n]) != orientation(poly[i], poly[j], poly[(i - 1 + n) % n]):
        return False
    if orientation(poly[j], poly[i], poly[(j + 1) % n]) != orientation(poly[j], poly[i], poly[(j - 1 + n) % n]):
        return False
    return True

def hertel_mehlhorn(poly):
    n = len(poly)
    triangles = []

    stack = []
    for i in range(n):
        if is_reflex(poly, i):
            stack.append(i)

    while len(stack) > 1:
        i = stack.pop()
        j = stack.pop()

        if is_diagonal(poly, i, j):
            triangles.append((i, j, (i + 1) % n))
            triangles.append((j, i, (j + 1) % n))
            stack.append(j)
        else:
            stack.append(j)
            stack.append(i)

    while len(stack) > 0:
        i = stack.pop()
        triangles.append((i, (i + 1) % n, (i + 2) % n))

    return triangles

# Example usage
polygon = [
    Point(0, 0),  # Bottom left
    Point(8, 0),  # Bottom right
    Point(7, 0),  # Beginning of triangle base
    Point(6, 2),  # Tip of triangle
    Point(4, 2),  # Bottom of roof right
    Point(4, 4),  # Top of roof
    Point(2, 2)   # Bottom of roof left
]
triangles = hertel_mehlhorn(polygon)

# Visualization
fig, ax = plt.subplots()

# Plot polygon
poly_xs = [p.x for p in polygon] + [polygon[0].x]
poly_ys = [p.y for p in polygon] + [polygon[0].y]
ax.plot(poly_xs, poly_ys, '-o', label='Polygon')

# Plot triangles
for tri in triangles:
    tri_points = [polygon[tri[0]], polygon[tri[1]], polygon[tri[2]], polygon[tri[0]]]
    tri_xs = [p.x for p in tri_points]
    tri_ys = [p.y for p in tri_points]
    ax.plot(tri_xs, tri_ys, '-')

# Setting additional plot attributes for clarity
ax.set_aspect('equal')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Polygon and Hertel-Mehlhorn Triangulation')
plt.legend()
plt.show()