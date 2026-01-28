//THIS IS JUST A TEST FILE
import fetch from "node-fetch";
import { vtBytesToGeoJSON } from "vt2geojson";

const MAPILLARY_TOKEN = "YOUR_MAPILLARY_TOKEN"; 

const tilesWithImages = [
  { x: 15, y: 10 }, { x: 20, y: 12 }, { x: 18, y: 14 },
];

const tile = tilesWithImages[Math.floor(Math.random() * tilesWithImages.length)];
const ZOOM = 5;
const tileUrl = `https://tiles.mapillary.com/maps/vtp/mly1_public/2/${ZOOM}/${tile.x}/${tile.y}?access_token=${MAPILLARY_TOKEN}`;

async function getRandomImageFromTile() {
  const tileResp = await fetch(tileUrl);
  if (!tileResp.ok) throw new Error("Tile fetch failed");
  const tileBuf = await tileResp.arrayBuffer();

  const geojson = vtBytesToGeoJSON(Buffer.from(tileBuf), tile.x, tile.y, ZOOM, { layer: "image" });
  const features = geojson.features;
  if (!features || features.length === 0) throw new Error("No images in tile");

  const randFeature = features[Math.floor(Math.random() * features.length)];
  const imageId = randFeature.properties?.id;
  if (!imageId) throw new Error("Image ID not found");

  const metaUrl = `https://graph.mapillary.com/${imageId}?access_token=${MAPILLARY_TOKEN}&fields=id,computed_geometry,thumb_1024_url`;
  const metaResp = await fetch(metaUrl);
  if (!metaResp.ok) throw new Error("Metadata fetch failed");
  const metaJson = await metaResp.json();

  const lat = metaJson.computed_geometry?.coordinates?.[1];
  const lon = metaJson.computed_geometry?.coordinates?.[0];
  const imageUrl = metaJson.thumb_1024_url;

  return { imageId, lat, lon, imageUrl };
}

getRandomImageFromTile()
  .then(console.log)
  .catch(console.error);

