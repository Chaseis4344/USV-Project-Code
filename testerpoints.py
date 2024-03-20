import numpy as np
import matplotlib.pyplot as plt

def generate_blob_with_edges(num_points=1000, center=(0, 0), radius=10, randomness=0.5, edge_factor=0.2, num_edges=5):
    """
    Generates a blob-like shape with pronounced edges sticking out more than others.

    Parameters:
    - num_points: Number of points to generate.
    - center: Tuple specifying the center of the blob.
    - radius: Base radius of the blob from its center.
    - randomness: Factor of randomness in the blob's shape.
    - edge_factor: The factor by which edges protrude out.
    - num_edges: The number of edges to create.

    Returns:
    - points: Array of (x, y) coordinates forming the blob shape.
    """
    angles = np.linspace(0, 2 * np.pi, num_points, endpoint=False)
    edge_variation = np.sin(num_edges * angles) * edge_factor * radius
    radii = radius + np.random.rand(num_points) * randomness * radius + edge_variation

    x = center[0] + radii * np.cos(angles)
    y = center[1] + radii * np.sin(angles)
    points = np.vstack((x, y)).T
    
    return points

# Parameters for the blob shape
num_points = 1000
center = (0, 0)
radius = 10
randomness = 0.3
edge_factor = 0.3  # Adjust for more pronounced edges
num_edges = 6  # Adjust for more or fewer edges

# Generate the blob shape
points = generate_blob_with_edges(num_points, center, radius, randomness, edge_factor, num_edges)

# Plot the shape
plt.figure(figsize=(8, 8))
plt.scatter(points[:, 0], points[:, 1], s=10)
plt.axis('equal')
plt.title('Blob with Protruding Edges')
plt.show()
