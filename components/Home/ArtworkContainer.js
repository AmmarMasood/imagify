import React from "react";
import styles from "@/styles/Home.module.css";
import HomeImage1 from "@/public/images/home-image-1.svg";
import HomeImage2 from "@/public/images/home-image-2.svg";
import HomeImage3 from "@/public/images/home-image-3.svg";
import Landing1 from "@/public/images/CwcuON.jpeg";

import Image from "next/image";
function ArtworkContainer() {
  return (
    <>
      <div className={styles["artwork-container"]}>
        <div className={styles["artwork-container--inner"]}>
          <Image src={HomeImage1} alt="artwork" />
          <div className={styles["artwork-container--inner-textbox"]}>
            <h1>From words to Art</h1>
            <p>
              To create the art you are looking for simply describe what you
              want to display. AI Technology will then provide one possible
              interpretation of your imagination.
            </p>
          </div>
        </div>

        <div className={styles["artwork-container--inner"]}>
          <Image src={HomeImage2} alt="artwork" />
          <div className={styles["artwork-container--inner-textbox"]}>
            <h1>Your own style</h1>
            <p>
              If a friend decides to be less creative then you and takes the
              same prompt, you will never have the same picture twice. Choose
              from many different styles to create your very own AI Art.
            </p>
          </div>
        </div>

        <div className={styles["artwork-container--inner"]}>
          <Image src={HomeImage3} alt="artwork" />
          <div className={styles["artwork-container--inner-textbox"]}>
            <h1>Your Art your choice</h1>
            <p>
              Choose from many different products in our store and print a
              unique set of items. None else has access to your Artwork. Except
              you want to earn roalities on your creations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtworkContainer;
