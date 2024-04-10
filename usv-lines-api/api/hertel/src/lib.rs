use delaunator::{Point as DelaunatorPoint, triangulate};
use parry2d::math::Point;
use parry2d::transformation::hertel_mehlhorn;

fn main() {
    let vertices = vec![
        Point::new(2.0f32, 2.0f32),   // 0
        Point::new(2.0f32, -2.0f32),  // 1
        Point::new(4.0f32, -2.0f32),  // 2
        Point::new(4.0f32, 4.0f32),   // 3
        Point::new(-4.0f32, 4.0f32),  // 4
        Point::new(-4.0f32, -2.0f32), // 5
        Point::new(-2.0f32, -2.0f32), // 6
        Point::new(-2.0f32, 2.0f32),  // 7
    ];

    // Convert vertices to Delaunator points
    let delaunator_points: Vec<DelaunatorPoint> = vertices
        .iter()
        .map(|&point| DelaunatorPoint {
            x: point.x as f64,
            y: point.y as f64,
        })
        .collect();

    // Perform Delaunay triangulation
    let triangulation = triangulate(&delaunator_points);

    // Extract triangles as indices
    let indices: Vec<[u32; 3]> = triangulation
        .triangles
        .chunks(3)
        .map(|chunk| [chunk[0] as u32, chunk[1] as u32, chunk[2] as u32])
        .collect();

    // Pass triangulated polygon to Hertel-Mehlhorn algorithm
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