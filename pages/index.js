import { useState } from "react";
import styles from "@/styles/Home.module.css";
import Layout from "../components/Common/Layout";
import InputContainer from "../components/Home/InputContainer";
import ArtworkContainer from "../components/Home/ArtworkContainer";
import StyleSelector from "../components/Home/StyleSelector";
import axios from "axios";
import { message } from "antd";
import Inpainting from "@/components/Home/Inpainting";

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [maskedImage, setMaskedImage] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showSelector, setShowSelector] = useState(true);

  const [options, setOptions] = useState({
    negativePrompt: "",
    steps: 25,
    cfg_scale: 7.5,
    seed: 42,
  });
  const [currentImageBase64, setCurrentImageBase64] = useState(null);
  const [currentImageBaseLink, setCurrentImageBaseLink] = useState(null);

  const [imageToShow, setImageToShow] = useState(null);

  const [selectedStyle, setSelectedStyle] = useState(null);

  const uploadImageToServerAndGetLink = async (base64String) => {
    try {
      const res = await axios.post(`/api/upload-image`, {
        img: base64String,
      });
      return res.data.url;
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Error when uploading image, please try again.",
      });
      return false;
    }
  };

  const generateImageAndGetBase64String = async (options) => {
    try {
      const res = await axios.post(`/api/image-producer`, options);
      return res.data.imageUrl;
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Error when generating a new image, please try again.",
      });
      return false;
    }
  };

  const onClickCreateNew = async () => {
    if (inputValue) {
      setLoading(true);
      setImageToShow(null);
      setSelectedStyle(null);
      const value = {
        prompt: inputValue,
        endpoint: "dreamlike", //txt2img or img2img or pix2pix or controlnet
        type: "dreamlike",
        negativePrompt: options.negativePrompt,
        steps: options.steps,
        cfg_scale: options.cfg_scale,
        seed: options.seed,
      };

      const base64String = await generateImageAndGetBase64String(value);
      if (base64String) {
        setCurrentImageBase64(base64String);
        setImageToShow(base64String);

        const url = await uploadImageToServerAndGetLink(base64String);
        if (url) {
          setCurrentImageBaseLink(url);
        }
      }
      setLoading(false);
    } else {
      messageApi.open({
        type: "error",
        content: "Please enter a prompt",
      });
    }
  };

  const handleOnImageUpload = async (value) => {
    setLoading(true);
    setSelectedStyle(null);
    setCurrentImageBase64(value);
    setImageToShow(value);
    const url = await uploadImageToServerAndGetLink(value);
    if (url) {
      setCurrentImageBaseLink(url);
    }
    setLoading(false);
  };

  const onStyleSelect = async (type, label, modelName) => {
    if (currentImageBaseLink) {
      setLoading(true);
      setImageToShow(null);
      setSelectedStyle(label);
      const value = {
        prompt: type,
        endpoint: modelName,
        type: modelName, //txt2img or img2img or pix2pix or controlnet
        image_url:
          modelName === "img2img" || modelName === "controlnet"
            ? currentImageBase64
            : currentImageBaseLink,
        negativePrompt: options.negativePrompt,
        steps: options.steps,
        cfg_scale: options.cfg_scale,
        seed: options.seed,
      };
      const base64String = await generateImageAndGetBase64String(value);
      if (base64String) {
        setImageToShow(base64String);
      }
      setLoading(false);
    } else {
      messageApi.open({
        type: "error",
        content: "Can not apply style to empty image",
      });
    }
  };

  const handleOptionChange = async (values) => {
    setOptions(values);
    // if (inputValue && showSelector) {
    //   setOptions(values);
    //   callModal(values);
    // }
  };

  return (
    <Layout loading={loading}>
      {contextHolder}
      <div className={styles.container}>
        <InputContainer
          onClick={onClickCreateNew}
          onChange={(v) => setInputValue(v)}
          setOptions={handleOptionChange}
          handleOnImageUpload={handleOnImageUpload}
          showOriginal={() => setImageToShow(currentImageBase64)}
          imageToShow={imageToShow}
          setMaskedImageUrl={setMaskedImage}
        />
        {showSelector && (
          <StyleSelector
            loading={loading}
            onSelect={onStyleSelect}
            selected={selectedStyle}
            reponseImage={imageToShow}
            handleOnImageUpload={handleOnImageUpload}
          />
        )}
        <ArtworkContainer />
      </div>
    </Layout>
  );
}
