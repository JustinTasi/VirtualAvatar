import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { UI } from "../components/UI";
import { useState } from "react";
import { Experience } from "../components/Experience"

export default function AvatarScene() {
  const [avatarConfig, setAvatarConfig] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState();

  const handleAvatarChange = (event) => {
    const value = event.target.value;

  };

  const avatars = [
    {
      modelPath: "/models/testAvatar.glb",
      animationsPath: "/models/animations1.glb",
      initialAnimation: "Idle",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      modelPath: "/models/girlAvatar.glb",
      animationsPath: "/models/animations2.glb",
      initialAnimation: "Walk",
      defualtVoice: "",
      defualtlipsync: "",
    },
  ];

  return (
    
    <>
      <Loader />
      <Leva hidden />
      <UI />
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience avatarConfig={avatarConfig}/>
      </Canvas>
    </>
  );
}
