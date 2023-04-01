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
import ImageDisplayerUploader from "./ImageDisplayerUploader";

const stylesTypes = [
  {
    img: StyleImage1,
    value: "make it drawing",
    label: "Drawing",
    modelName: "img2img",
  },
  {
    img: StyleImage2,
    value: "make it disney character",
    label: "Disney Character",
    modelName: "pix2pix",
  },
  {
    img: StyleImage3,
    value: "make it photo realistic",
    label: "Photorealistic",
    modelName: "img2img",
  },
  {
    img: StyleImage4,
    value: "make it neon",
    label: "Neon",
    modelName: "pix2pix",
  },
  {
    img: StyleImage5,
    value: "make it comic landscape",
    label: "Comic Landscape",
    modelName: "img2img",
  },
  {
    img: StyleImage6,
    value: "make it natural landscape",
    label: "Natural Landscape",
    modelName: "pix2pix",
  },
  {
    img: StyleImage7,
    value: "make it digital art",
    label: "Digital Art",
    modelName: "pix2pix",
  },
  {
    img: StyleImage8,
    value: "make it anime",
    label: "Anime",
    modelName: "img2img",
  },
];
function StyleSelector({
  onSelect,
  selected,
  reponseImage,
  loading,
  handleOnImageUpload,
}) {
  return (
    <div className={styles["style-selector-container"]}>
      <div className={styles["style-selector-container--inner"]}>
        <div className={styles["style-selector-container--types"]}>
          <h1>Choose your style</h1>
          <div className={styles["style-selector-container--types-inner"]}>
            {stylesTypes.map((s, key) => (
              <div
                className={`${styles["style-selector-type"]} ${
                  selected === s.label && styles["style-selector-type-selected"]
                }`}
                key={key}
                onClick={() => onSelect(s.value, s.label, s.modelName)}
              >
                <Image src={s.img} alt={s.label} />
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles["style-selector-container--image"]}>
          <ImageDisplayerUploader
            img={reponseImage}
            loading={loading}
            onImageUpload={handleOnImageUpload}
          />
        </div>
      </div>
    </div>
  );
}

export default StyleSelector;
