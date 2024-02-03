import matplotlib
matplotlib.use('Agg')  # Set the Matplotlib backend to 'Agg'
import matplotlib.pyplot as plt

def process_polygon(polygon_data):
    for i, feature in enumerate(polygon_data):
        # Extract coordinates and plot the polygon
        coordinates = feature['geometry']['coordinates'][0]
        x, y = zip(*coordinates)
        
        plt.figure()
        plt.plot(x, y, marker='o')  # Plot the polygon
        plt.fill(x, y, alpha=0.3)  # Fill the polygon with some transparency
        plt.title(f'Polygon ID: {feature["id"]}')
        plt.xlabel('Longitude')
        plt.ylabel('Latitude')

        # Save the plot as an image file
        plt.savefig(f'polygon_{i}.png')
        plt.close()

    # For debugging purposes, we're just returning the raw data
    # In production, you might want to process and return something else
    return {
        'processed': True,
        'data': polygon_data
    }
