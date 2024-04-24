import numpy as np
import matplotlib.pyplot as plt
from scipy.spatial import Delaunay
import time

def generate_polygon(n):
    angles = np.random.rand(n) * 2 * np.pi
    angles = np.sort(angles)
    points = np.column_stack((np.cos(angles), np.sin(angles)))
    return points

def test_delaunay(n):
    points = generate_polygon(n)
    start_time = time.time()
    Delaunay(points)
    end_time = time.time()
    return end_time - start_time

# Test the time complexity for different numbers of vertices
vertex_counts = [10, 50, 100, 500, 1000, 5000, 10000]
execution_times = []

for n in vertex_counts:
    print(f"Testing with {n} vertices...")
    total_time = 0
    num_iterations = 10
    for _ in range(num_iterations):
        total_time += test_delaunay(n)
    avg_time = total_time / num_iterations
    execution_times.append(avg_time)
    print(f"Average execution time for {n} vertices: {avg_time:.4f} seconds")

# Plot the results
plt.figure(figsize=(8, 6))
plt.plot(vertex_counts, execution_times, marker='o')
plt.xlabel('Number of Vertices')
plt.ylabel('Execution Time (seconds)')
plt.title('Time Complexity of scipy.spatial.Delaunay')
plt.xscale('log')
plt.yscale('log')
plt.grid(True)
plt.show()