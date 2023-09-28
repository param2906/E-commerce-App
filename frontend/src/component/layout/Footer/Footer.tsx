import React from "react";
import playStore from "../../../../public/image/playstore.png";
import appStore from "../../../../public/image/playstore.png";
import Image from "next/image";
import Styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.leftfooter}>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <Image className={Styles.leftFooterImg} src={playStore} alt="playstore" />
        <Image className={Styles.leftFooterImg} src={appStore} alt="Appstore" />
      </div>

      <div className={Styles.midFooter}>
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MeAbhiSingh</p>
      </div>

      <div className={Styles.rightFootr}>
        <h4>Follow Us</h4>
        <a href="http://instagram.com/meabhisingh">Instagram</a>
        <a href="http://youtube.com/6packprogramemr">Youtube</a>
        <a href="http://instagram.com/meabhisingh">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;