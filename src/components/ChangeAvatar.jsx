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
      'name':'角色1小美'
    },
    { 
      'iconUrl': 'icon/girlAvatar2-icon.png',
      'url':'image/girlAvatar2.png',
      'name':'角色2小帥'
    },
    { 
      'iconUrl': 'icon/girlAvatar3-icon.png',
      'url':'image/girlAvatar3.png',
      'name':'角色3大壯'
    },
  ];

  const avatarConfig = [
    {
      glbPath: "/glb/MaleDoctor1.glb",
      defualtAnimation: "/animations/MaleDoctor1-Waving.fbx",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      glbPath: "/glb/MaleDoctor1.glb",
      defualtAnimation: "/animations/MaleDoctor2-Waving.fbx",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      glbPath: "/glb/FemaleDoctor1.glb",
      defualtAnimation: "/animations/FemaleDoctor1-Waving.fbx",
      defualtVoice: "",
      defualtlipsync: "",
    },
    {
      glbPath: "/glb/FemaleDoctor2.glb",
      defualtAnimation: "/animations/FemaleDoctor2-Waving.fbx",
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
                  <img src={item.url} className={styles.avatarImg} alt={`角色 ${item.name} 圖片`} /> 
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