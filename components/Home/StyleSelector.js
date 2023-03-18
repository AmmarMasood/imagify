import React from "react";
import StyleImage1 from "@/public/images/style-image-1.svg";
import StyleImage2 from "@/public/images/style-image-2.svg";
import StyleImage3 from "@/public/images/style-image-3.svg";
import StyleImage4 from "@/public/images/style-image-4.svg";
import StyleImage5 from "@/public/images/style-image-5.svg";
import StyleImage6 from "@/public/images/style-image-6.svg";
import StyleImage7 from "@/public/images/style-image-7.svg";
import StyleImage8 from "@/public/images/style-image-8.svg";
import StyleImage9 from "@/public/images/style-image-9.svg";
import StyleImage10 from "@/public/images/style-image-10.svg";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import { Skeleton } from "antd";

const stylesTypes = [
  {
    img: StyleImage9,
    value: "original",
    label: "Original",
  },
  ,
  {
    img: StyleImage1,
    value: "turn it into drawing",
    label: "Drawing",
  },
  {
    img: StyleImage2,
    value: "turn it into disney character",
    label: "Disney Character",
  },
  {
    img: StyleImage3,
    value: "turn it into photo realistic",
    label: "Photorealistic",
  },
  {
    img: StyleImage4,
    value: "turn it into neon",
    label: "Neon",
  },
  {
    img: StyleImage5,
    value: "turn it into comic landscape",
    label: "Comic Landscape",
  },
  {
    img: StyleImage6,
    value: "turn it into natural landscape",
    label: "Natural Landscape",
  },
  {
    img: StyleImage7,
    value: "turn it into digital art",
    label: "Digital Art",
  },
  {
    img: StyleImage8,
    value: "turn it into anime",
    label: "Anime",
  },
];
function StyleSelector({ onSelect, reponseImage, loading }) {
  return (
    <div className={styles["style-selector-container"]}>
      <div className={styles["style-selector-container--inner"]}>
        <div className={styles["style-selector-container--types"]}>
          <h1>Choose your style</h1>
          <div className={styles["style-selector-container--types-inner"]}>
            {stylesTypes.map((s, key) => (
              <div
                className={styles["style-selector-type"]}
                key={key}
                onClick={() => onSelect(s.value)}
              >
                <Image src={s.img} alt={s.label} />
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles["style-selector-container--image"]}>
          {reponseImage ? (
            <Image
              src={reponseImage}
              alt="stable-diffusion"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          ) : (
            <Skeleton.Image
              active={loading}
              style={{ height: "700px", width: "700px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StyleSelector;
