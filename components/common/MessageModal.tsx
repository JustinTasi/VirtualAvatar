import { ModalProps, useMessageModal } from '../../context/MessageModalContext';
import { useRouter } from 'next/router';
import styles from '@styles/components/modal/Modal.module.scss';
import { ModalTypes } from '@enumrate/ModalTypes';

export default function MessageModal({ isShow, modal }: {
    isShow: boolean,
    modal: ModalProps
}) {
  const router = useRouter();
  const { setIsShow } = useMessageModal();
  const {
    type,
    message,
    handleClick
  } = modal;

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) {
      handleClick ?
        handleClick() : type === ModalTypes.SUCCESS ?
          handleDefaultSuccessClick() : handleDefaultErrorClick();
    }
  };

  const handleDefaultErrorClick = () => {
    setIsShow(false);
  };

  const handleDefaultSuccessClick = () => {
    setIsShow(false);

    router.reload();
  };

  return (
    <div className={`${styles.modalWrap} ${styles.message} ${isShow ? styles.display : ''}`} onClick={handleClose}>
      <div className={styles.modalContent}>
        <div className={`${styles.modalHeader} ${type === ModalTypes.ERROR ? styles.error : styles.success}`}>
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