import styles from '../css/ConsultPopup.module.css';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import openAIAPI from '../../services/BackEndAPI';
import { useMessageModal } from '../hooks/useMessageModal';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { useChat } from '../hooks/useChat';

export default function ConsultPopup({ setIsOpen }) {
  const { setIsShow, setModalProps } = useMessageModal();
  const [isSending, setIsSending] = useState(false);
  const { getValues, register, handleSubmit } = useForm();
  const userName = localStorage.getItem('userName')
  const location = useLocation().pathname;
  const { setMessage } = useChat();

  const onSubmit = async () => {
    setIsSending(true);
    const message = getValues('message');
    if(message == '') {
      setModalProps({
        'type': 'ERROR',
        'message': '請描述症狀',
      });
      setIsShow(true);
      setIsSending(false);
      setIsOpen(false);
      return;
    }
    
    try {
      const response = await openAIAPI.sendUncomfortableMessage({
        'transcript': message,
        'userName': userName,
        'charactor': location
      });
      setMessage(response);
      setIsSending(false);
    } catch (error) {
      setModalProps({
        'type': 'ERROR',
        'message': error.message,
      });
      setIsShow(true);
      setIsSending(false);
    }
    setIsOpen(false);
  };
  return (
    <div className={styles.popupPlace}>
      <form className={styles.popupContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.popupDiv}>
          <div className={styles.rowBox}>
            <span className={styles.popupTitle}>請描述身體不適症狀</span>
            <a className={styles.closeIcon} onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faCircleXmark} className={styles.iconSize}/></a>
          </div>
          <textarea
              {...register("message")}
              className={styles.popupContent}
              placeholder="症狀描述"
            ></textarea>
          { !isSending ?
            <button className={styles.popupBtnSubmit} type='submit'>提交</button> :
            <button style={{backgroundColor: '#f9e0a9'}} className={styles.popupBtnSubmit} type='submit'>提交中...</button>
          }
        </div>
      </form>
    </div>
  );
}