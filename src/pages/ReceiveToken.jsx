import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMessageModal } from '../hooks/useMessageModal';
import BackEndAPI from '../../services/BackEndAPI';  // 假設你有這個後端 API

export default function ReceiveToken() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsShow, setModalProps } = useMessageModal();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lineToken = params.get('token'); 

    if (lineToken) {
      localStorage.setItem('token', lineToken);
  
      getUserInfo(lineToken);
    } else {
      setModalProps({
        type: 'ERROR',
        message: '請從手機LineBote官方帳號中登入使用！',
        isNavigate: true,
      });
      setIsShow(true);
    }
  }, [location]);

  const getUserInfo = async (lineToken) => {
    try {
      const response = await BackEndAPI.getUserInfo({ 'token': lineToken });

      localStorage.setItem("userName", response.userName);
      setModalProps({
        type: 'SUCCESS',
        message: '驗證成功',
        isNavigate: true,
      });
      setIsShow(true);
      setTimeout(() => {
        navigate('/male1');
      }, 300);
    } catch (error) {
      setModalProps({
        type: "ERROR",
        message: "驗證失敗！您不是本系統之用戶！請洽系統管理員",
        isNavigate: true,
      });
      setIsShow(true);
    }
  };

  return (
    <div
        style={{
          cursor: "pointer",
          position: "fixed",
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #659999, #f4791f)",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: "40px",
            padding: "20px",
            fontWeight: "800",
            letterSpacing: "0.2rem",
            overflow: "hidden",
          }}
        >
          驗證中...
        </p>
      </div>
  );
}
