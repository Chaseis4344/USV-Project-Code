import numpy as np

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __repr__(self):
        return str(self)

class LineSegment:
    def __init__(self, start, end):
        self.start = start
        self.end = end

    def __str__(self):
        return f"({self.start}, {self.end})"

    def __repr__(self):
        return str(self)

    def intersects(self, other):
        orientation1 = self.orientation(other.start)
        orientation2 = self.orientation(other.end)
        orientation3 = other.orientation(self.start)
        orientation4 = other.orientation(self.end)

        if orientation1 != orientation2 and orientation3 != orientation4:
            return True

        if orientation1 == 0 and self.on_segment(other.start):
            return True

        if orientation2 == 0 and self.on_segment(other.end):
            return True

        if orientation3 == 0 and other.on_segment(self.start):
            return True

        if orientation4 == 0 and other.on_segment(self.end):
            return True

        return False

    def orientation(self, p):
        val = (self.end.y - self.start.y) * (p.x - self.end.x) - \
              (self.end.x - self.start.x) * (p.y - self.end.y)

        if val == 0:
            return 0
        elif val > 0:
            return 1
        else:
            return 2

    def on_segment(self, p):
        if min(self.start.x, self.end.x) <= p.x <= max(self.start.x, self.end.x) and \
           min(self.start.y, self.end.y) <= p.y <= max(self.start.y, self.end.y):
            return True
        return False

def find_convex_partitions(polygon):
    n = len(polygon)
    if n < 3:
        return []

    partitions = []

    for i in range(n):
        for j in range(i+1, n):
            line = LineSegment(polygon[i], polygon[j])
            valid_partition = True

            for k in range(n):
                if k != i and k != j:
                    if line.orientation(polygon[k]) != 0 and line.on_segment(polygon[k]):
                        valid_partition = False
                        break

            if valid_partition:
                partition1 = polygon[:j+1] if j != n-1 else polygon[:j]
                partition2 = polygon[j:i+1] if i != n-1 else polygon[j:]
                partition2.reverse()
                partitions.append((partition1, partition2))

    return partitions

# Example usage:
polygon = [Point(0, 0), Point(0, 4), Point(4, 4), Point(4, 0)]
partitions = find_convex_partitions(polygon)
for partition in partitions:
    print(partition)
