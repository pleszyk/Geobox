import ThreeGeo from 'three-geo-react';

async function getTerrain(origin, radius, zoom, wireframe, vector) {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
  const tgeo = new ThreeGeo({
    tokenMapbox: MAPBOX_TOKEN, // <---- set your Mapbox API token here
  });

  //The terrain is represented by standard THREE.Mesh objects
  // const terrain = await tgeo.getTerrainRgb(origin, radius, zoom);

  var terrain;
  if (!vector) {
    terrain = await tgeo.getTerrainRgb(origin, radius, zoom);
  } else {
    terrain = await tgeo.getTerrainVector(origin, radius, zoom);
  }

  terrain.rotation.x = -Math.PI / 2;
  terrain.rotation.z = 1.1;
  if (wireframe) {
    terrain.children.forEach((mesh) => {
      mesh.material.wireframe = true;
    });
  }
  return terrain;
}

export default getTerrain;
