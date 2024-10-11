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
      'iconUrl': 'icon/girlAvatar1-icon.png',
      'url':'image/girlAvatar1.png',
      'name':'小美'
    },
    { 
      'iconUrl': 'icon/girlAvatar2-icon.png',
      'url':'image/girlAvatar2.png',
      'name':'小帥'
    },
    { 
      'iconUrl': 'icon/girlAvatar3-icon.png',
      'url':'image/girlAvatar3.png',
      'name':'大壯'
    },
  ];

  const avatarConfig = [
    {
      modelPath: "/models/girlAvatar1.glb",
      animationsPath: "/models/girlAnimations1.glb",
      initialAnimation: "Idle",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      modelPath: "/models/girlAvatar2.glb",
      animationsPath: "/models/girlAnimations1.glb",
      initialAnimation: "Idle",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      modelPath: "/models/girlAvatar3.glb",
      animationsPath: "/models/girlAnimations1.glb",
      initialAnimation: "Idle",
      defualtVoice: "",
      defualtlipsync: "",
    },
  ];

  const handleSelect = (index) => {
    handleAvatarChange(avatarConfig[index]);
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
                  <img src={item.url} className={styles.avatarImg} alt={`Character ${index + 1}`} /> 
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