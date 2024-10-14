import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { UI } from "../components/UI";
import { useState } from "react";
import { Experience } from "../components/Experience"

export default function AvatarScene() {
  const [avatarConfig, setAvatarConfig] = useState(
    {
      glbPath: "glb/MaleDoctor1.glb",
      animationGlbPath: "summaryAnimations/MaleDoctor1-Animations.glb",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      glbPath: "glb/MaleDoctor2.glb",
      animationGlbPath: "summaryAnimations/MaleDoctor2-Animations.glb",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      glbPath: "glb/FemaleDoctor1.glb",
      animationGlbPath: "summaryAnimations/FemaleDoctor1-Animations.glb",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      glbPath: "glb/FemaleDoctor2.glb",
      animationGlbPath: "summaryAnimations/FemaleDoctor2-Animations.glb",
      defualtVoice: "",
      defualtlipsync: "",
    },
  );

  return (
    <>
      <Loader />
      <Leva hidden />
      <UI setAvatarChange={setAvatarConfig}/>
      { avatarConfig &&
        <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
          <Experience avatarConfig={avatarConfig}/>
        </Canvas>
      }
      </>
  );
}
