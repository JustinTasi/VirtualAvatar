import { useState } from 'react';
import styles from '../css/ChangeAvatar.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";


export default function ChangeAvatar({ handleAvatarChange }) {
  const [avatarDisplay, setAvatarDisplay] = useState(false);
  const navigate = useNavigate();

  const characterImages = [
    { 
      'iconUrl': 'icon/MaleDoctor1-icon.png',
      'backgroundUrl':'image/changeAvatar/MaleDoctor1-bg.png',
      'name':'吉利'
    },
    { 
      'iconUrl': 'icon/MaleDoctor2-icon.png',
      'backgroundUrl':'image/changeAvatar/MaleDoctor2-bg.png',
      'name':'卡哇'
    },
    { 
      'iconUrl': 'icon/FemaleDoctor1-icon.png',
      'backgroundUrl':'image/changeAvatar/FemaleDoctor1-bg.png',
      'name':'烏薩奇'
    },
    { 
      'iconUrl': 'icon/FemaleDoctor2-icon.png',
      'backgroundUrl':'image/changeAvatar/FemaleDoctor2-bg.png',
      'name':'小桃'
    },
  ];

  const avatarConfig = ["/male1", "/male2", "/female1", "/female2"];

  const handleSelect = (index) => {
    navigate(avatarConfig[index])
    window.location.reload();
    setAvatarDisplay(false)
  }

  return (
    <>
      <p className={styles.word} onClick={() => setAvatarDisplay(true)}>切換角色</p>
      {avatarDisplay &&
        <div className={styles.modalWrap}>
          <a className={styles.closeIcon} onClick={() => setAvatarDisplay(false)}><FontAwesomeIcon icon={faCircleXmark} className={styles.iconSize}/></a>
          <Swiper
            spaceBetween={140} 
            slidesPerView={3}  
            loop={false}        
            centeredSlides={true} 
            navigation         
            pagination={{ clickable: true }}
          >
            {characterImages.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.bannerBox}>
                  <div className={styles.rowBox}>
                    <img className={styles.avatarIcon} src={item.iconUrl} alt="" />
                    <p className={styles.avatarName}>{item.name}</p>
                  </div>
                  <img src={item.backgroundUrl} className={styles.avatarImg} alt={`角色 ${item.name} 圖片`} /> 
                  <button className={styles.selectBtn} onClick={() => handleSelect(index)}>選取</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </>
  );
}