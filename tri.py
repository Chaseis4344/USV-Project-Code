import numpy as np
from shapely.geometry import Polygon
from shapely.ops import triangulate
import matplotlib.pyplot as plt
import networkx as nx
import networkx.algorithms.approximation as approx
import imageio

# Define the polygon vertices
vertices = np.array([
    [0.45, 0.75], [2.37, 1.49], [4.15, 0.32], [3.63, 1.48], [5.58, 1.78],
    [7.45, 3.21], [6.12, 3.58], [4.75, 6.15], [4.32, 5.94], [3.75, 4.55],
    [2.45, 6.44], [1.55, 5.45], [2.51, 3.67], [0.45, 0.75]
])

# Create a Shapely Polygon object
polygon = Polygon(vertices)

# Triangulate the polygon
triangles = triangulate(polygon)

# Extract the convex sub-regions inside the polygon
convex_sub_regions = [tri for tri in triangles if polygon.contains(tri)]

# Visualize the original polygon
fig, ax = plt.subplots(figsize=(8, 6))
x, y = polygon.exterior.xy
ax.plot(x, y, color='black')

# Visualize the convex sub-regions
for region in convex_sub_regions:
    x, y = region.exterior.xy
    ax.fill(x, y, alpha=0.4, fc='r', ec='r')

ax.set_aspect('equal')
ax.set_title('Polygon Decomposition into Convex Sub-Regions')
plt.show()

nodes = [i for i in range(len(convex_sub_regions))]

# Create a list of edges
edges = []
for i, region1 in enumerate(convex_sub_regions):
    for j, region2 in enumerate(convex_sub_regions):
        if i != j and region1.touches(region2):
            edges.append((i, j))

# Create the undirected graph
G = nx.Graph()
G.add_nodes_from(nodes)
G.add_edges_from(edges)

# Add edge weights based on the distance between centroids
for u, v in G.edges:
    centroid_u = convex_sub_regions[u].centroid
    centroid_v = convex_sub_regions[v].centroid
    distance = centroid_u.distance(centroid_v)
    G.edges[u, v]['weight'] = distance

# Compute the TSP tour using the Christofides approximation algorithm
start_node = 0
tour = approx.traveling_salesman_problem(G, cycle=True)

# Visualize the traversal order
fig, ax = plt.subplots(figsize=(8, 6))
x, y = polygon.exterior.xy
ax.plot(x, y, color='black')

# Choose a starting node (e.g., 0)
start_node = 0

# Rotate the tour to start from the chosen starting node
start_index = tour.index(start_node)
tour = tour[start_index:] + tour[:start_index]

for i, node in enumerate(tour):
    region = convex_sub_regions[node]
    x, y = region.exterior.xy
    ax.fill(x, y, alpha=0.4, fc='r', ec='r')
    ax.text(region.centroid.x, region.centroid.y, str(i), fontsize=10, ha='center', va='center')

ax.set_aspect('equal')
ax.set_title('Polygon Decomposition into Convex Sub-Regions (TSP Tour)')
plt.show()