use delaunator::{triangulate, Point as DelaunatorPoint};
use parry2d::math::Point;
use parry2d::query::{PointQuery, Ray, RayCast};
use parry2d::shape::ConvexPolygon;
use pyo3::prelude::*;

#[pyfunction]
fn convex_decomposition(vertices: Vec<(f32, f32)>) -> PyResult<Vec<Vec<(f32, f32)>>> {
    // Convert Python tuples to Parry2D points
    let parry_points: Vec<Point<f32>> = vertices
        .into_iter()
        .map(|(x, y)| Point::new(x, y))
        .collect();

    // Create a Parry2D convex polygon from the points
    let polygon = match ConvexPolygon::from_convex_polyline(parry_points.clone()) {
        Some(poly) => poly,
        None => return Err(pyo3::exceptions::PyValueError::new_err("Failed to create convex polygon")),
    };

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

    // Convert triangle indices to Parry2D points and clip them to the original polygon
    let python_polygons: Vec<Vec<(f32, f32)>> = indices
        .into_iter()
        .filter_map(|triangle| {
            let triangle_points: Vec<Point<f32>> = triangle
                .iter()
                .map(|&index| parry_points[index as usize])
                .collect();

            let triangle_polygon = match ConvexPolygon::from_convex_polyline(triangle_points) {
                Some(poly) => poly,
                None => return None,
            };

            let clipped_points: Vec<(f32, f32)> = triangle_polygon
                .points()
                .iter()
                .filter(|&&point| polygon.contains_local_point(&point))
                .map(|&point| (point.x, point.y))
                .collect();

            if clipped_points.is_empty() {
                None
            } else {
                Some(clipped_points)
            }
        })
        .collect();

    Ok(python_polygons)
}

#[pymodule]
fn hertel(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(convex_decomposition, m)?)?;
    Ok(())
}