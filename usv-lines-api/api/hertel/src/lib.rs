use parry2d::math::Point;
use parry2d::transformation::hertel_mehlhorn;

fn main() {
    let vertices = vec![
        Point::new(2.0, 2.0),   // 0
        Point::new(2.0, -2.0),  // 1
        Point::new(4.0, -2.0),  // 2
        Point::new(4.0, 4.0),   // 3
        Point::new(-4.0, 4.0),  // 4
        Point::new(-4.0, -2.0), // 5
        Point::new(-2.0, -2.0), // 6
        Point::new(-2.0, 2.0),  // 7
    ];

    let indices = vec![
        [5, 6, 7],
        [4, 5, 7],
        [3, 4, 7],
        [3, 7, 0],
        [2, 3, 0],
        [2, 0, 1],
    ];

    let convex_polygons = hertel_mehlhorn(&vertices, &indices);

    println!("Convex polygons:");
    for (i, polygon) in convex_polygons.iter().enumerate() {
        println!("Polygon {}:", i);
        for point in polygon {
            println!("({}, {})", point.x, point.y);
        }
        println!();
    }
}