import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/SpeechToText.module.css"

export default function Microphone({ handleInputChange }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (recognition) {
      recognition.lang = 'zh-TW';
      recognition.continuous = true; // 啟用持續模式
      recognition.interimResults = true; // 啟用中間結果

      recognition.onresult = (event) => {
        let interimTranscript = ''; // 暫存中間結果
        let finalTranscript = '';   // 最終結果

        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;  // 累積最終結果
          } else {
            interimTranscript += transcript; // 累積中間結果
          }
        }
        handleInputChange(interimTranscript + finalTranscript); // 實時更新輸入
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error detected: " + event.error);
        setIsListening(false);
      };
    }
  }, [recognition]);

  // 控制錄音啟動和停止
  const handleListen = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop(); // 停止錄音
        setIsListening(false);
      } else {
        recognition.start(); // 開始錄音
        setIsListening(true);
      }
    } else {
      alert('瀏覽器不支援語音識別功能');
    }
  };

  return (
    <>
      <div className={styles.microphoneDiv}>
        {!isListening ? 
          <a className={styles.microphone} onClick={handleListen}><FontAwesomeIcon icon={faMicrophone} /></a> :
          <a className={styles.microphoneLisening} onClick={handleListen}><FontAwesomeIcon icon={faMicrophone} /></a>
        }
      </div>
    </>
  );
};
