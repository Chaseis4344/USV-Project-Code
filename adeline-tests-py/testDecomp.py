from math import sqrt
import matplotlib.pyplot as plt

def cross_product(p1, p2, p3):
    """Calculate cross product of vectors p1p2 and p2p3."""
    return (p2[0] - p1[0]) * (p3[1] - p2[1]) - (p2[1] - p1[1]) * (p3[0] - p2[0])

def is_concave(polygon, i):
    """Check if vertex i is a concave vertex."""
    p1 = polygon[i - 1]
    p2 = polygon[i]
    p3 = polygon[(i + 1) % len(polygon)]
    return cross_product(p1, p2, p3) < 0

def decompose(polygon):
    """Decompose a concave polygon into convex subpolygons."""
    subpolygons = [polygon]
    concave_vertices = [i for i in range(len(polygon)) if is_concave(polygon, i)]

    while concave_vertices:
        new_subpolygons = []
        for subpolygon in subpolygons:
            if any(is_concave(subpolygon, i) for i in range(len(subpolygon))):
                for i in range(len(subpolygon)):
                    for j in concave_vertices:
                        if j >= len(subpolygon):
                            j -= len(subpolygon)
                        if i != j and i != (j - 1) % len(subpolygon):
                            new_subpolygon1 = subpolygon[i:j+1]
                            new_subpolygon2 = subpolygon[j:] + subpolygon[:i+1]
                            new_subpolygons.append(new_subpolygon1)
                            new_subpolygons.append(new_subpolygon2)
                            break
                    else:
                        continue
                    break
            else:
                new_subpolygons.append(subpolygon)

        subpolygons = new_subpolygons
        concave_vertices = [i for subpolygon in subpolygons for i in range(len(subpolygon)) if is_concave(subpolygon, i)]

    return subpolygons

def plot_polygon(polygon, color='black', fill=False):
    if not polygon:
        return
    xs, ys = zip(*polygon)
    xs = list(xs) + [xs[0]]
    ys = list(ys) + [ys[0]]
    plt.plot(xs, ys, color=color)
    if fill:
        plt.fill(xs, ys, color=color, alpha=0.2)

def plot_decomposition(polygon, subpolygons):
    plt.figure(figsize=(8, 8))
    plot_polygon(polygon, color='black', fill=True)
    for subpolygon in subpolygons:
        plot_polygon(subpolygon, color='red')
    plt.axis('equal')
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('Polygon Decomposition')
    plt.grid(True)
    plt.show()

# Example usage
polygon = [(2.84, 2.37), (3.92, 2.71), (4.62, 2.95),
(5.89, 3.61), (6.74, 4.23), (6.43, 4.67), (6.11, 5.08), (5.27, 6.14), (4.39, 6.52),
(3.58, 6.17), (2.95, 5.23), (2.31, 6.37), (1.66, 6.89), (1.08, 6.14), (1.42, 5.45),
(1.87, 4.82), (2.19, 3.96), (2.19, 3.96)]

subpolygons = decompose(polygon)
plot_decomposition(polygon, subpolygons)


