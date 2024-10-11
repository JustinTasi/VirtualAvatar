import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { UI } from "../components/UI";
import { useState } from "react";
import { Experience } from "../components/Experience"

export default function AvatarScene() {
  const [avatarConfig, setAvatarConfig] = useState({});

  return (
    <>
      <Loader />
      <Leva hidden />
      <UI setAvatarChange={setAvatarConfig}/>
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience avatarConfig={avatarConfig}/>
      </Canvas>
    </>
  );
}
