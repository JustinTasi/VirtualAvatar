import React, { useState, useEffect } from 'react';

// 檢查瀏覽器是否支援 Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const SpeechToText = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (recognition) {
      // 設定語音識別的語言 (可以根據需求更改)
      recognition.lang = 'zh-TW';

      // 當語音識別結果返回時
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript); // 將語音轉成的文字存儲到 state 中
      };

      // 當語音識別結束時，停止聆聽
      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // 啟動或停止語音識別
  const handleListen = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
      }
    } else {
      alert('瀏覽器不支援語音識別功能');
    }
  };

  return (
    <div>
      <h1>語音轉文字</h1>
      <button onClick={handleListen}>
        {isListening ? '停止聆聽' : '開始聆聽'}
      </button>
      <p>轉換結果: {text}</p>
    </div>
  );
};

export default SpeechToText;