import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Process the log file
file_path = 'TestBlob1.csv'
df = pd.read_csv(file_path, usecols=['x', 'y'])

# Check if there are any points
if df.empty:
    print("No valid points found in the log file.")
    exit()

# Extract x and y coordinates
x_coords = df['x'].values
y_coords = df['y'].values

# Calculate the centroid of the path
centroid_x = np.mean(x_coords)
centroid_y = np.mean(y_coords)

# Find the point closest to the centroid
distances = np.sqrt((x_coords - centroid_x)**2 + (y_coords - centroid_y)**2)
closest_index = np.argmin(distances)

# Reorder the coordinates to start from the closest point to the centroid
x_coords = np.concatenate((x_coords[closest_index:], x_coords[:closest_index]))
y_coords = np.concatenate((y_coords[closest_index:], y_coords[:closest_index]))

# Add the first point to the end to close the loop
x_coords = np.append(x_coords, x_coords[0])
y_coords = np.append(y_coords, y_coords[0])

# Create a figure and axis
fig, ax = plt.subplots(figsize=(8, 6))

# Create a scatter plot of the path
ax.scatter(x_coords, y_coords, c=range(len(x_coords)), cmap='viridis', s=10)

# Plot the path as a connected line
ax.plot(x_coords, y_coords, '-', linewidth=1, alpha=0.7)

# Enable automatic scaling of the plot
ax.autoscale(enable=True, axis='both', tight=True)

# Add labels and title
ax.set_xlabel('X-coordinate')
ax.set_ylabel('Y-coordinate')
ax.set_title('Boat Path')

# Display the plot
plt.tight_layout()
plt.show()