# Geobox

![geobox](https://github.com/pleszyk/weatherMap/assets/47582558/23d75e58-0a2e-41ac-ad9a-1130bb80e066)

Displays a high resolution model of the specificed area using three-geo, a three.js based geographic visualization library. The geometry of the terrain is based on the RGB-encoded DEM (Digital Elevation Model) provided by the Mapbox Maps API.

[Demo](http://geobox-app.s3-website-us-east-1.amazonaws.com/)

## Goal

Display Geographic models with Mapbox & three-geo into a React app with Mapbox & Three.js

## Usage

Navigate the map to update location or search for a specific area. 3D button pitches camera to show built-in Mapbox 3D terrain. The bottom allows you to freely orbit the 3d scene, zoom in and out. Adjust the radius of terrain shown and the zoom resolution of the 3D terrain model. Bottom buttons toggle wireframe & contour map of the 3D terrain. 

## Implementation

Uses Javascript, React, Mapbox, Turf.js, Three.js(React-three-fiber), three-geo & TailwindCSS

## Sources

<https://github.com/w3reality/three-geo>

<https://docs.pmnd.rs/react-three-fiber>

<https://docs.mapbox.com/>

<https://threejs.org/>

<https://turfjs.org/>
