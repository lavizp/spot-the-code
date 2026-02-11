// src/types/vt2geojson.d.ts
declare module "vt2geojson" {
  import { FeatureCollection } from "geojson";

  export interface VT2GeoJSONOptions {
    uri?: string;               // fetch tile by URL
    tile?: Uint8Array;          // raw vector tile bytes
    x?: number;
    y?: number;
    z?: number;
    layer?: string;
  }

  export default function vt2geojson(
    options: VT2GeoJSONOptions,
    callback: (err: Error | null, data?: FeatureCollection) => void
  ): void;
}
