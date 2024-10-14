import { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import "../css/UI.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faUserDoctor, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import ConsultPopup from "../popup/ConsultPopup.jsx"
import ChangeAvatar from "../components/ChangeAvatar"
import { useMessageModal } from '../hooks/useMessageModal';

export const UI = ({ setAvatarChange, hidden, ...props }) => {
  const input = useRef();
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
  const [isConsultPopupOpen, setIsConsultPopupOpen] = useState(false);
  const { setIsShow, setModalProps } = useMessageModal();
  const sendMessage = () => {
    const text = { transcript: input.current.value };
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };
  if (hidden) {
    return null;
  }

  const handleGamepadClick = () => {
    setModalProps({
      'type': 'SUCCESS',
      'message': '未來開發項目，敬請期待！',
    });
    setIsShow(true);
  }

  return (
    <>
      <div className="container">
        {/* 上方元件 */}
        <div className="box">
          <div className="columnBox">
            <h1 className="title">MediMate - 智伴一把罩</h1>
            <p className="secondTitle">今天有甚麼需求嗎?</p>
          </div>
          <ChangeAvatar handleAvatarChange={setAvatarChange} />
        </div>
        {/* 右半邊按鈕區塊 */}
        <div className="right-buttons">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="selected-button"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 25 25"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon-size"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 25 25"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon-size"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
          <a className="selected-button" onClick={() => setIsConsultPopupOpen(!isConsultPopupOpen)}><FontAwesomeIcon icon={faUserDoctor} className="icon-size"/></a>
          <a className="selected-button" onClick={() => handleGamepadClick()}><FontAwesomeIcon icon={faGamepad} className="icon-size"/></a>
        </div>
        {/* 底下區塊 */}
        <div className="bottom-section">
          <input
            className="input-field"
            placeholder="請輸入內容..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <a className="microphone"><FontAwesomeIcon icon={faMicrophone} /></a>
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`send-button ${loading || message ? "disabled" : ""}`}
          >
            發送
          </button>
        </div>
      </div>
      {isConsultPopupOpen && <ConsultPopup setIsOpen={setIsConsultPopupOpen}/>}
    </>
  );
};
