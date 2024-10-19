import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { UI } from "../components/UI";
import { FemaleDoctor1Experience } from "../components/avatarExperience/FemaleDoctor1Experience"

export default function FemaleDoctor1() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <UI/>
      <Canvas shadows camera={{ position: [0, 1, 1], fov: 50}}>
        <FemaleDoctor1Experience/>
      </Canvas>
    </>
  );  
}
