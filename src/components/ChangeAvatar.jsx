import { useEffect, useState } from 'react';
import styles from '../css/ChangeAvatar.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BackEndAPI from '../../services/BackEndAPI';

export default function ChangeAvatar({ handleAvatarChange }) {
  const [isFirstTimeUse, setIsFirstTimeUse] = useState(false);
  const [avatarDisplay, setAvatarDisplay] = useState(false);
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

  const avatarConfig = [
    {
      glbPath: "glb/MaleDoctor1.glb",
      animationGlbPath: "summaryAnimations/MaleDoctor1-Animations.glb",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      glbPath: "glb/MaleDoctor2.glb",
      animationGlbPath: "summaryAnimations/MaleDoctor2-Animations.glb",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      glbPath: "glb/FemaleDoctor1.glb",
      animationGlbPath: "summaryAnimations/FemaleDoctor1-Animations.glb",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      glbPath: "glb/FemaleDoctor2.glb",
      animationGlbPath: "summaryAnimations/FemaleDoctor2-Animations.glb",
      defualtVoice: "",
      defualtlipsync: "",
    },
  ];

  const handleSelect = (index) => {
    handleAvatarChange(avatarConfig[index]);
    setAvatarDisplay(false)
  }

  useEffect(()=> {
    const fetchData = async () => {
      try{
        const response = await BackEndAPI.getIsFirstTimeUseRecord();

        if (response.isFirstTimeUse) {
          setIsFirstTimeUse(true)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchData();
  },[])

  useEffect(() => {
    if(isFirstTimeUse) {
      setAvatarDisplay(true)
    }

  },[isFirstTimeUse])

  return (
    <>
      <p className={styles.word} onClick={() => setAvatarDisplay(true)}>切換角色</p>
      {avatarDisplay &&
        <div className={styles.modalWrap}>
          <Swiper
            spaceBetween={100} 
            slidesPerView={3}  
            loop={true}        
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