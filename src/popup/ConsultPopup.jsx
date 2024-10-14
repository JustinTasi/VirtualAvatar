import styles from '../css/ConsultPopup.module.css';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import openAIAPI from '../../services/BackEndAPI';
import { useMessageModal } from '../hooks/useMessageModal';

export default function ConsultPopup({ setIsOpen }) {
  const { setIsShow, setModalProps } = useMessageModal();
  const { getValues, register, handleSubmit } = useForm();
  const sendMessage = async () => {
    const message = getValues();
    setLoading(true);
    try {
      const response = await openAIAPI.sendUncomfortableMessage({...message});
      
      setLoading(false);
      setModalProps({
        'type': 'SUCCESS',
        'message': response.message,
      });
      setIsShow(true);
    } catch (error) {
      setModalProps({
        'type': 'ERROR',
        'message': error.message,
      });
      setIsShow(true);
    };
  }

  return (
    <div className={styles.popupPlace}>
      <form className={styles.popupContainer} onSubmit={handleSubmit(sendMessage)}>
        <div className={styles.popupDiv}>
          <div className={styles.rowBox}>
            <span className={styles.popupTitle}>請描述身體不適症狀</span>
            <a className={styles.closeIcon} onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faCircleXmark} className="icon-size"/></a>
          </div>
          <textarea
              {...register("message", { required: true })}
              className={styles.popupContent}
              placeholder="症狀描述"
            ></textarea>
          <button className={styles.popupBtnSubmit} type='submit'>提交</button>
        </div>
      </form>
    </div>
  );
}