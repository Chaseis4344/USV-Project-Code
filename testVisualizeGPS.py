import pandas as pd
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.animation import FuncAnimation

# Load the data
with open('Acquisition_EVENT_20240328.txt', 'r') as file:
    lines = file.readlines()

# Parse the data
data = []
for line in lines:
    if "[Event]" in line:
        parts = line.split(',')
        # Extract time, latitude, longitude, and altitude
        timestamp = parts[1].strip()
        latitude = float(parts[2].strip())
        longitude = float(parts[3].strip())
        altitude = float(parts[4].strip())
        data.append([timestamp, latitude, longitude, altitude])

# Create a DataFrame
df = pd.DataFrame(data, columns=['Timestamp', 'Latitude', 'Longitude', 'Altitude'])

# Convert Timestamps to datetime objects (optional, for better time axis handling)
df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Plotting
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Plot a 3D trajectory
line = ax.plot(df['Latitude'], df['Longitude'], df['Altitude'], label='GPS Track', marker='o')[0]

# Labeling
ax.set_xlabel('Latitude')
ax.set_ylabel('Longitude')
ax.set_zlabel('Altitude')
ax.legend()

# Animation function
def update(frame):
    ax.view_init(elev=10, azim=frame)
    return fig,

# Create animation
ani = FuncAnimation(fig, update, frames=range(0, 360, 2), blit=False, interval=50)
ani.save('gps_data_animation2.gif', writer='ffmpeg')

# Show plot
plt.show()
