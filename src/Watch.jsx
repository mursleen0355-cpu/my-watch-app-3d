import { useGLTF } from '@react-three/drei';

export default function Watch(props) {
  const { scene } = useGLTF('/models/scene.gltf');

  return (
    <primitive
      object={scene}
      scale={0.1}
      position={[0, -0.5, 0]}
      {...props}
    />
  );
}

useGLTF.preload('/models/scene.gltf');