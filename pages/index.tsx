import Layout from '@/components/layout/Layout';
import styles from '@styles/pages/index.module.scss';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const userName = 'Justin';
  const [isTalk, setIsTalk] = useState(false);

  const StartVoiceInput = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 'audio': true });

      stream.getTracks().forEach(track => track.stop());
      alert(stream.getTracks().forEach(track => track.stop()));
      setIsTalk(true);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Layout>
      <div className={styles.background}>
        <article className={styles.container}>
          <div className={styles.header}>
            <div className={styles.rawDiv}>
              <Image src="/images/Logo.png" alt="MediMate Logo" width={200} height={60} className={styles.logo}/>
              <span className={styles.brandName}>MediMate智能聊天夥伴</span>
            </div>
            <span className={styles.userName}>{userName}您好，歡迎使用智能聊天小夥伴 !</span>
          </div>

          { isTalk ?
            <div className={styles.actions}>
              <p className={styles.voiceInput} onClick={StartVoiceInput}>請開始說話</p>
              <button className={styles.stopButton}>結束錄音</button>
            </div> :
            <button className={styles.voiceButton} onClick={() => setIsTalk(true)}>
              <Image src="/images/microphone.png" alt="Microphone" width={100} height={60} className={styles.voiceButtonImage}/>
            </button>
          }

        </article>
      </div>
    </Layout>
  );
}