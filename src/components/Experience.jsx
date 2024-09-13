import { OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useThree } from "@react-three/fiber";
import { texture } from "three/webgpu";

export const Experience = () => {
  const texture = useTexture("")
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls />
      <group position-y={-1}>
        <Avatar/>
      </group>
      <ambientLight intensity={1} />
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]}></planeGeometry>
        <meshBasicMaterial map={texture}/>
      </mesh>
    </>
  );
};
