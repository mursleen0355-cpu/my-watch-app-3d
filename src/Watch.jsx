import { useGLTF } from "@react-three/drei";

export default function Watch(props) {
  const { scene } = useGLTF(
  "/models/watch-draco.glb",
  true
);

  return (
    <primitive
      object={scene}
      scale={0.24}
      position={[0, 0, 0]}
      rotation={[0.08, -0.22, 0]}
      {...props}
    />
  );
}

useGLTF.preload(
  "/models/watch-draco.glb",
  true
);