import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useThree } from "@react-three/fiber";
import { texture } from "three/webgpu";

export const Experience = () => {
  const texture = useTexture("texture/hospital_background.jpg")
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls />
      <Avatar position = {[0, -3, 5]} scale={2}/>
      <Environment preset="sunset"/>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]}></planeGeometry>
        <meshBasicMaterial map={texture}/>
      </mesh>
    </>
  );
};
