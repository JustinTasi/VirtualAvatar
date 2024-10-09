import styles from '../css/Loading.module.css';

export default function Loading() {
  return (
    <div>
      <div className={styles.overlay}></div>
      <div className={styles.loadingContainer}>
        <div className={styles.loadingBox}>
          <div className={styles.ldsRoller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={styles.loadingStr}>Loading...</div>
        </div>
      </div>
    </div>
  );
}