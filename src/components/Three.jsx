import { useState, useEffect } from 'react';
import { Canvas, dispose } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import getTerrain from '../util/getTerrain';
import { SiTraefikmesh } from 'react-icons/si';
import { FiLayers } from 'react-icons/fi';
import Loader from '../util/Loader';

function Model({ lat, lng, zoom, radius, wireframe, vector }) {
  const [model, setModel] = useState(null);

  let origin = [lat, lng];

  useEffect(() => {
    setModel(null);
    getTerrain(origin, radius, zoom, wireframe, vector).then(setModel);

    // unmounts
    return () => {
      if (model) {
        dispose(model);
        setModel(null);
      }
    }; // eslint-disable-next-line
  }, [lat, lng, zoom, radius, wireframe, vector]);

  return model ? <primitive object={model} /> : <Loader />;
}

function Three({ lat, lng, radius }) {
  //zoom resolution
  const [zoom, setZoom] = useState(13);
  const [vector, setVector] = useState(false);
  const [wireframe, setWireframe] = useState(false);

  return (
    <div className='h-[65vh] mt-0.5 overflow-hidden rounded-t-2xl lg:absolute w-screen lg:h-screen lg:top-0 lg:m-0'>
      <label
        htmlFor='steps-range'
        className='flex absolute z-10 m-1.5 ml-2 lg:m-2 lg:top-[35vh] text-xs left-1 font-medium text-white'
      >
        Zoom | Resolution: {zoom}
      </label>
      <input
        onChange={(e) => setZoom(Number(e.target.value))}
        id='steps-range'
        type='range'
        min='11'
        value={zoom}
        max='15'
        step='1'
        className='w-[10.5rem] mt-8 absolute top-[35vh] left-3 z-10 h-1 bg-gray-800 bg-opacity-75 rounded-lg accent-gray-200 appearance-none cursor-pointer'
      />
      <button
        onClick={() => {
          wireframe ? setWireframe(false) : setWireframe(true);
        }}
        className='absolute bottom-0 right-0 my-8 mx-5 z-10 bg-gray-100 hover:bg-gray-300 text-black text-xl font-bold py-1 px-1 rounded'
      >
        <SiTraefikmesh />
      </button>
      <button
        onClick={() => {
          vector ? setVector(false) : setVector(true);
        }}
        className='absolute bottom-0 right-10 my-8 mx-7 z-10 bg-gray-100 hover:bg-gray-300 text-black text-xl font-bold py-1 px-1 rounded'
      >
        <FiLayers />
      </button>
      <Canvas
        camera={{ position: [2, 1.25, 2], fov: 30, zoom: 3.75 }}
        linear
        flat
      >
        <Stars
          radius={100}
          depth={50}
          count={8000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <OrbitControls
          maxDistance={15}
          minDistance={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <group>
          <Model
            lat={lat}
            lng={lng}
            zoom={zoom}
            radius={radius}
            wireframe={wireframe}
            vector={vector}
          />
        </group>
      </Canvas>
    </div>
  );
}

export default Three;
