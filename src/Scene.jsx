import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import Watch from "./Watch";

function LoadingOverlay() {
  const { active, progress, loaded, total } = useProgress();
  const percentage = Math.round(progress);

  if (!active) {
    return null;
  }

  return (
    <div
      className="loading-overlay"
      role="status"
      aria-live="polite"
    >
      <div className="loading-card">
        <div className="loading-spinner" />

        <p className="loading-title">Loading watch</p>

        <p className="loading-percentage">
          {percentage}%
        </p>

        <div
          className="loading-track"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={percentage}
        >
          <div
            className="loading-progress"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {total > 0 && (
          <p className="loading-details">
            {loaded} of {total} assets
          </p>
        )}
      </div>
    </div>
  );
}

export default function Scene() {
  return (
    <div className="watch-stage">
      <Canvas
        camera={{
          position: [0, 0.15, 5.8],
          fov: 28,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={0.25} />

        <directionalLight
          position={[4, 5, 5]}
          intensity={2.5}
        />

        <directionalLight
          position={[-4, 2, 3]}
          intensity={1}
        />

        <spotLight
          position={[2, 4, -4]}
          intensity={2.5}
          angle={0.45}
          penumbra={0.8}
        />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Watch />
        </Suspense>

        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minDistance={4.5}
          maxDistance={9}
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.8}
        />
      </Canvas>

      <LoadingOverlay />

      <div className="interaction-hint">
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}