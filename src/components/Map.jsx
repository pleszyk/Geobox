import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Three from './Three';
import PitchToggle from '../util/PitchToggle';
import circle from '@turf/circle';
import transformRotate from '@turf/transform-rotate';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-113.787);
  const [lat, setLat] = useState(48.7057);
  const [elevation, setElevation] = useState(1612);
  const [radius, setRadius] = useState(10);

  //turf. js
  let center = [lng, lat];
  let options = { steps: 4, units: 'kilometers' };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom: 8.5,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('style.load', () => {
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });
      // add the DEM source as a terrain layer
      map.current.setTerrain({ source: 'mapbox-dem' });

      // Add the control to the map.
      map.current.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          marker: false,
          flyTo: {
            zoom: 8.5,
          },
        }).on('result', (e) => {
          let geoCoord = {
            lng: Number(e.result.center[0].toFixed(4)),
            lat: Number(e.result.center[1].toFixed(4)),
          };
          setLng(geoCoord.lng);
          setLat(geoCoord.lat);
        })
      );

      map.current.addSource('box', {
        type: 'geojson',
        data: square,
      });

      map.current.addLayer({
        id: 'outline',
        type: 'line',
        source: 'box',
        layout: {},
        paint: {
          'line-color': '#fff',
          'line-width': 3,
        },
      });

      map.current.addControl(new PitchToggle({ minpitchzoom: 11 }), 'top-left');
    });

    //turf.js
    let area = circle(center, radius, options);
    let square = transformRotate(area, 45);

    map.current.on('load', () => {
      setElevation(Math.round(map.current.queryTerrainElevation({ lng, lat })));
    });

    if (map.current.getSource('box')) {
      map.current.getSource('box').setData(square);
    }

    map.current.on('dragend', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
    });

    map.current.on('moveend', () => {
      setElevation(
        Math.round(
          map.current.queryTerrainElevation([
            map.current.getCenter().lng.toFixed(4),
            map.current.getCenter().lat.toFixed(4),
          ])
        )
      );
    });
  });

  return (
    <>
      <label
        htmlFor='steps-range'
        className='absolute z-10 m-2 top-[35vh] right-1 lg:left-[41vh] text-xs font-medium text-white'
      >
        Radius: {radius}km
      </label>
      <input
        onChange={(e) => setRadius(Number(e.target.value))}
        id='steps-range'
        type='range'
        min='1'
        value={radius}
        max='80'
        step='1'
        className='w-[10.5rem] mt-8 absolute top-[35vh] right-3 lg:left-[32.8vh] z-10 h-1 bg-gray-800 bg-opacity-75 accent-gray-200 rounded-lg appearance-none cursor-pointer'
      />
      <div className='sidebar'>
        Latitude: {lat} | Longitude: {lng} <br /> Elevation: {elevation}m |
        Radius: {radius}km
      </div>
      <div
        ref={mapContainer}
        className='h-[35vh] rounded-2xl lg:w-[50vh] z-10 lg:border-black lg:border-opacity-50 lg:border-b-2 lg:border-r-2'
      />
      <Three lat={lat} lng={lng} radius={radius} />
    </>
  );
}
export default Map;
