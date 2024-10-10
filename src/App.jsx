import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccessDeny from "./pages/AccessDeny";
import Avatar from './pages/Avatar';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/accessDeny" element={<AccessDeny/>} />
        <Route path="/" element={<Avatar/>} />
      </Routes>
    </>
  );
}
