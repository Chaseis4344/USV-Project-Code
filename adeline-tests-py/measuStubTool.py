import datetime
import re

# Read input data from file
with open("input_data.txt", "r") as file:
    lines = file.readlines()

# Extract coordinates from input data
data = []
for line in lines:
    match = re.search(r'\[(.*?)\]', line)
    if match:
        coord = match.group(1).split(", ")
        data.append([float(coord[0]), float(coord[1])])

# Constants
start_time = datetime.datetime(2024, 2, 13, 0, 0, 0)
event_id_start = 472343
z_coordinate = -10.99
unknown_value = 10.80
rtk_status = "RTK FIXED"

# Convert coordinates
def convert_coordinates(coord):
    return coord[0], -coord[1]

# Generate output
output = "event_id,timestamp,x,y,z,unknown_value,rtk_status\n"

for i, coord in enumerate(data):
    event_time = start_time + datetime.timedelta(seconds=i)
    event_id = event_id_start + i
    x, y = convert_coordinates(coord)
    output += f"{event_id},{event_time.strftime('%m/%d/%Y %I:%M:%S %p')},{x:.14f},{y:.14f},{z_coordinate:.2f},{unknown_value:.2f},{rtk_status}\n"

# Write output to file
with open("TestBlob1.csv", "w") as file:
    file.write(output)