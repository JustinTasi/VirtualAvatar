import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { UI } from "../components/UI";
import { MaleDoctor1Experience } from "../components/avatarExperience/MaleDoctor1Experience"

export default function MaleDoctor1() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <UI/>
      <Canvas shadows camera={{ position: [0, 1, 1], fov: 50}}>
        <MaleDoctor1Experience/>
      </Canvas>
    </>
  );  
}
