import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import styles from "../css/UI.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import ConsultPopup from "../popup/ConsultPopup.jsx";
import ChangeAvatar from "../components/ChangeAvatar";
import { useMessageModal } from "../hooks/useMessageModal";
import SpeechToText from "../components/SpeechToText.jsx";
import { OpenPage } from "./OpenPage.jsx";

export const UI = ({ setAvatarChange, hidden }) => {
  const { isUserClick, chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
  const [isConsultPopupOpen, setIsConsultPopupOpen] = useState(false);
  const [receiveMessage, setReceiveMessage] = useState('')
  const { setIsShow, setModalProps } = useMessageModal();
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  
  const sendMessage = () => {
    const transcript = inputValue;
    if (!loading && !message) {
      chat(transcript);
      console.log(transcript)
      setInputValue("");
    }
  };
  if (hidden) {
    return null;
  }

  const handleGamepadClick = () => {
    setModalProps({
      type: "SUCCESS",
      message: "未來開發項目，敬請期待！",
    });
    setIsShow(true);
  };

  useEffect(() => {
    if (!message) {
      setFadeOut(true);
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        setFadeOut(false);
        setReceiveMessage('');
      }, 2000);
  
      return () => clearTimeout(timeoutId);
    } else {
      setIsVisible(true);
      setReceiveMessage(message.text)
    }
  }, [message]);

  return (
    <>
      {isUserClick ? (
        <div className={styles.container}>
          {/* 上方元件 */}
          <div className={styles.box}>
            <div className={styles.columnBox}>
              <h1 className={styles.title}>MediMate - 智伴一把罩</h1>
              <p className={styles.secondTitle}>今天有甚麼需求嗎?</p>
            </div>
            <ChangeAvatar handleAvatarChange={setAvatarChange} />
          </div>
          {/* 右半邊按鈕區塊 */}
          <div className={styles.rightButtons}>
            <button
              onClick={() => setCameraZoomed(!cameraZoomed)}
              className={styles.selectedButton}
            >
              {cameraZoomed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 25 25"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.iconSize}
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
                  className={styles.iconSize}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                  />
                </svg>
              )}
            </button>
            <a
              className={styles.selectedButton}
              onClick={() => setIsConsultPopupOpen(!isConsultPopupOpen)}
            >
              <FontAwesomeIcon
                icon={faUserDoctor}
                className={styles.iconSize}
              />
            </a>
            <a
              className={styles.selectedButton}
              onClick={() => handleGamepadClick()}
            >
              <FontAwesomeIcon icon={faGamepad} className={styles.iconSize} />
            </a>
          </div>
          {/* 底下區塊 */}
          <div className={styles.bottomSection}>
            {isVisible && (
              <div
                className={`${styles.messageArrivedSection} ${
                  fadeOut ? styles.fadeOut : ""
                }`}
              >
                <textarea
                  className={styles.messageContent}
                  value={receiveMessage}
                  placeholder="等待接收回答..."
                  readOnly
                />
              </div>
            )}
            <div className={styles.rowBox}>
              <input
                className={styles.inputField}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="請輸入內容..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <SpeechToText
                style={styles.microphone}
                handleInputChange={setInputValue}
              />
            </div>
            <button
              disabled={loading || message}
              onClick={sendMessage}
              className={`${styles.sendButton} ${
                loading || message ? "disabled" : ""
              }`}
            >
              發送
            </button>
          </div>
        </div>
      ) : (
        <OpenPage/>
      )}
      {isConsultPopupOpen && <ConsultPopup setIsOpen={setIsConsultPopupOpen} />}
    </>
  );
};
