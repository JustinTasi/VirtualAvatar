import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MaleDoctor1() {
  const navigate = useNavigate();

  useEffect(()=> {
    navigate('/receiveToken')
  },[])
  return (
    <></>
  );  
}
