use delaunator::{triangulate, Point as DelaunatorPoint};
use parry2d::math::Point;
use parry2d::transformation::hertel_mehlhorn;
use pyo3::prelude::*;

#[pyfunction]
fn convex_decomposition(vertices: Vec<(f32, f32)>) -> PyResult<Vec<Vec<(f32, f32)>>> {
    // Convert Python tuples to Parry2D points
    let parry_points: Vec<Point<f32>> = vertices
        .into_iter()
        .map(|(x, y)| Point::new(x, y))
        .collect();

    // Convert vertices to Delaunator points
    let delaunator_points: Vec<DelaunatorPoint> = parry_points
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
    let convex_polygons = hertel_mehlhorn(&parry_points, &indices);

    // Convert Parry2D points back to Python tuples
    let python_polygons: Vec<Vec<(f32, f32)>> = convex_polygons
        .into_iter()
        .map(|polygon| {
            polygon
                .into_iter()
                .map(|point| (point.x, point.y))
                .collect()
        })
        .collect();

    Ok(python_polygons)
}

#[pymodule]
fn hertel(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(convex_decomposition, m)?)?;
    Ok(())
}
