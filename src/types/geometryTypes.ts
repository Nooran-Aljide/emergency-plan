export interface SpatialReference {
  wkid: 4326;
}

export interface PointGeometry {
  x: number;
  y: number;
  spatialReference: SpatialReference;
}

export interface PolygonGeometry {
  rings: number[][][];
  spatialReference: SpatialReference;
}
