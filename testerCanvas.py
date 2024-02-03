import tkinter as tk
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure
from turfpy.transformation import convex
from geojson import Feature, FeatureCollection, Point
import numpy as np
from shapely.geometry import Polygon, LineString, mapping
from shapely.ops import unary_union, polygonize


class PolygonDrawerApp:
    def __init__(self, root):
        self.root = root
        root.title("Polygon Drawer")

        # Set up the matplotlib figure and axes
        self.fig, self.ax = self._setup_figure()

        # Create a canvas compatible with Tkinter
        self.canvas = FigureCanvasTkAgg(self.fig, master=root)
        self.canvas_widget = self.canvas.get_tk_widget()
        self.canvas_widget.pack(side=tk.TOP, fill=tk.BOTH, expand=True)

        # Bind the mouse click event
        self.canvas.mpl_connect('button_press_event', self.on_click)

        # Add a button to clear polygons
        self.clear_button = tk.Button(master=root, text="Clear Polygons", command=self.clear_polygons)
        self.clear_button.pack(side=tk.BOTTOM)

        # Store points
        self.points = []

    def _setup_figure(self):
        fig = Figure(figsize=(5, 4), dpi=100)
        ax = fig.add_subplot(111)
        ax.set_xlim(0, 1)
        ax.set_ylim(0, 1)
        ax.set_title('Click to add points')
        return fig, ax

    def on_click(self, event):
        # Add a point where the user clicks
        if event.xdata is not None and event.ydata is not None:
            self.points.append([event.xdata, event.ydata])
            self.ax.plot(event.xdata, event.ydata, 'ro')  # plot the point
            self.canvas.draw()

            # If more than 2 points, draw the polygon
            if len(self.points) > 2:
                self.draw_polygon()

    def draw_polygon(self):
        # Clear previous lines (polygon edges)
        while len(self.ax.lines) > 0:
            self.ax.lines[0].remove()
    
        # Clear previous polygon fill, if any
        while len(self.ax.collections) > 0:
            self.ax.collections[0].remove()
    
        # Replot the points as red dots
        for p in self.points:
            self.ax.plot(p[0], p[1], 'ro')
    
        # Convert points to geojson format
        features = [Feature(geometry=Point((p[0], p[1]))) for p in self.points]
        fc = FeatureCollection(features)
    
        # Use turfpy to get the convex hull
        polygon = convex(fc)
    
        # Extract polygon coordinates
        if polygon and polygon.geometry and polygon.geometry.coordinates:
            coords = np.array(polygon.geometry.coordinates[0])
            self.ax.fill(coords[:, 0], coords[:, 1], alpha=0.5)
    
        # Redraw the canvas
        self.canvas.draw()

    def clear_polygons(self):
        self.points = []  # Clear the points
        self.ax.cla()  # Clear the axes

        # Reset the axes limits, labels, and title
        self.ax.set_xlim(0, 1)
        self.ax.set_ylim(0, 1)
        self.ax.set_title('Click to add points')

        self.canvas.draw()  # Redraw the canvas

if __name__ == '__main__':
    root = tk.Tk()
    app = PolygonDrawerApp(root)
    root.mainloop()