import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import Watch from './Watch';

function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50}}
      style={{ width: '100%', height: '100%' , display: 'block'}}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <Watch />

        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}

export default App;