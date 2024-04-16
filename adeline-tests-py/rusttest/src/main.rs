use geo::algorithm::convexhull::ConvexHull;
use geo::geometry::{Geometry, Polygon};

fn exact_convex_decomposition(polygon: &Polygon<f64>) -> Vec<Polygon<f64>> {
    let mut decomposition = Vec::new();
    let mut remaining = polygon.clone();

    while !remaining.is_empty() {
        let convex_hull = remaining.convex_hull();
        decomposition.push(convex_hull.clone());
        remaining = remaining.difference(&convex_hull);
    }

    decomposition
}

fn main() {
    // Example polygon
    let polygon = Polygon::new(
        vec![
            (0.45, 0.75),
            (2.37, 1.49),
            (4.15, 0.32),
            (3.63, 1.48),
            (5.58, 1.78),
            (7.45, 3.21),
            (6.12, 3.58),
            (4.75, 6.15),
            (4.32, 5.94),
            (3.75, 4.55),
            (2.45, 6.44),
            (1.55, 5.45),
            (2.51, 3.67),
            (0.45, 0.75),
        ],
        vec![],
    );

    let decomposition = exact_convex_decomposition(&polygon);

    println!("Exact Convex Decomposition:");
    for (i, convex_polygon) in decomposition.iter().enumerate() {
        println!("Convex Polygon {}: {:?}", i + 1, convex_polygon);
    }
}


