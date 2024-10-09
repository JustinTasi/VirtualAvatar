import { useMessageModal } from '../hooks/useMessageModal';
import styles from '../css/MessageModal.module.css';

export default function MessageModal({ isShow, modal }) {
  const { setIsShow } = useMessageModal();
  const {
    type,
    message,
    handleClick
  } = modal;

  const handleClose = (e) => {
    if (e.currentTarget === e.target) {
      handleClick ?
        handleClick() : type === 'SUCCESS' ?
          handleDefaultSuccessClick() : handleDefaultErrorClick();
    }
  };

  const handleDefaultErrorClick = () => {
    setIsShow(false);
  };

  const handleDefaultSuccessClick = () => {
    setIsShow(false);
  };

  return (
    <div className={`${styles.modalWrap} ${styles.message} ${isShow ? styles.display : ''}`} onClick={handleClose}>
      <div className={styles.modalContent}>
        <div className={`${styles.modalHeader} ${type === 'ERROR' ? styles.error : styles.success}`}>
          <p className={styles.modalTitle}>訊息</p>
        </div>
        <div className={styles.modalBody}>
          <p>{message}</p>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.closeButton} onClick={handleClose}>
          關閉
          </button>
        </div>
      </div>
    </div>
  );
}