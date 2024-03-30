import numpy as np

points = np.array([(2.84, 2.37), (3.92, 2.71), (4.62, 2.95),
(5.89, 3.61), (6.74, 4.23), (6.43, 4.67), (6.11, 5.08), (5.27, 6.14), (4.39, 6.52),
(3.58, 6.17), (2.95, 5.23), (2.31, 6.37), (1.66, 6.89), (1.08, 6.14), (1.42, 5.45),
(1.87, 4.82), (2.19, 3.96), (2.19, 3.96)])

from scipy.spatial import Delaunay

tri = Delaunay(points, qhull_options='QJ')

import matplotlib.pyplot as plt

plt.triplot(points[:,0], points[:,1], tri.simplices)

plt.plot(points[:,0], points[:,1], 'o')

plt.show()

