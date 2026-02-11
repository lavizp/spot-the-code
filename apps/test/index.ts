const MAP = 'MLY|25972342975716152|ba57ff21d674a45524e49618067e5c6c'

interface MapillaryImage {
  id: string;
  geometry: { coordinates: [number, number]; type: string };
  camera_type: string;
  captured_at: string;
}

async function getRandomPlaces(
  accessToken: string,
  numberOfPlaces = 5,
  lastDays = 30
): Promise<MapillaryImage[]> {
  try {
    const lastDate = new Date(Date.now() - lastDays * 24 * 60 * 60 * 1000).toISOString();
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const url = `https://graph.mapillary.com/images?fields=id,geometry,camera_type,captured_at` +
                `&start_captured_at=${lastDate}&end_captured_at=${tomorrow}&limit=1000`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json: { data?: MapillaryImage[] } = await res.json();
    const images = json.data ?? [];

    const panoramicImages = images.filter(img => img.camera_type === "spherical");

    const selectedPlaces: MapillaryImage[] = [];

    while (selectedPlaces.length < numberOfPlaces && panoramicImages.length) {
      const i = Math.floor(Math.random() * panoramicImages.length);
      selectedPlaces.push(panoramicImages[i]);
      panoramicImages.splice(i, 1);
    }

    return selectedPlaces;
  } catch (err: any) {
    console.error("Error:", err.message);
    return [];
  }
}

(async () => {
  const places = await getRandomPlaces(MAP, 5, 30);
  console.log(places[0]?.geometry.coordinates);
})();

