import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { UI } from "../components/UI";
import { FemaleDoctor2Experience } from "../components/avatarExperience/FemaleDoctor2Experience"

export default function FemaleDoctor2() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <UI/>
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <FemaleDoctor2Experience/>
      </Canvas>
    </>
  );  
}
