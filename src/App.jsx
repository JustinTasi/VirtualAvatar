import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccessDeny from "./pages/AccessDeny";
import FemaleDoctor1 from './pages/FemaleDoctor1';
import FemaleDoctor2 from './pages/FemaleDoctor2';
import MaleDoctor1 from './pages/MaleDoctor1';
import MaleDoctor2 from './pages/MaleDoctor2';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/accessDeny" element={<AccessDeny/>} />
        <Route path="/female1" element={<FemaleDoctor1/>} />
        <Route path="/female2" element={<FemaleDoctor2/>} />
        <Route path="/male1" element={<MaleDoctor1/>} />
        <Route path="/male2" element={<MaleDoctor2/>} />
      </Routes>
    </>
  );
}
