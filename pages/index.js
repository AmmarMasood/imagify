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

  // inpainting
  const [showInpainting, setShowInpainting] = useState(false);

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
  const generateImageWithMaskAndGetBase64String = async (options) => {
    try {
      const res = await axios.post(`/api/dream-studio`, options);
      return res.data.imageUrl;
    } catch (err) {
      messageApi.open({
        type: "error",
        content:
          "Error when generating a new image with mask, please try again.",
      });
      return false;
    }
  };

  function resizeBase64Image(base64Image, width, height) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Image;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const newBase64Image = canvas.toDataURL();
        resolve(newBase64Image);
      };
      img.onerror = reject;
    });
  }

  const handleMaskImage = async () => {
    if (inputValue) {
      setLoading(true);

      const value = {
        prompt: inputValue,
        negativePrompt: options.negativePrompt,
        steps: options.steps,
        cfg_scale: options.cfg_scale,
        seed: options.seed,
        mask: await resizeBase64Image(maskedImage, 768, 768),
        image_url: await resizeBase64Image(currentImageBase64, 768, 768),
      };

      const base64String = await generateImageWithMaskAndGetBase64String(value);
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
        mask: maskedImage,
        init_images: currentImageBase64,
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
      setMaskedImage("");
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
        mask: maskedImage,
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
          onClick={() =>
            showInpainting ? handleMaskImage() : onClickCreateNew()
          }
          onChange={(v) => setInputValue(v)}
          showOriginal={() => setImageToShow(currentImageBase64)}
        />
        {showSelector && (
          <StyleSelector
            loading={loading}
            onSelect={onStyleSelect}
            maskedImage={maskedImage}
            selected={selectedStyle}
            reponseImage={imageToShow}
            handleOnImageUpload={handleOnImageUpload}
            // advance modal props
            imageToShow={imageToShow}
            setMaskedImageUrl={setMaskedImage}
            setOptions={handleOptionChange}
            options={options}
            // inpainting
            showInpainting={showInpainting}
            setShowInpainting={setShowInpainting}
          />
        )}
        <ArtworkContainer />
      </div>
    </Layout>
  );
}
