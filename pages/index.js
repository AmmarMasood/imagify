import { useState } from "react";
import styles from "@/styles/Home.module.css";
import Layout from "../components/Common/Layout";
import InputContainer from "../components/Home/InputContainer";
import ArtworkContainer from "../components/Home/ArtworkContainer";
import StyleSelector from "../components/Home/StyleSelector";
import axios from "axios";
import { message } from "antd";

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [showSelector, setShowSelector] = useState(true);

  const [options, setOptions] = useState({
    negativePrompt: "",
    steps: 25,
    cfg_scale: 7.5,
    seed: 42,
  });
  const [responseImage, setResponseImage] = useState(null);
  const [responseImageAfterStyle, setResponseImageAfterStyle] = useState(null);
  const [imageToShow, setImageToShow] = useState(null);

  const callModal = async (options) => {
    setLoading(true);
    setImageToShow(null);
    try {
      const res = await axios.post(`/api/produce-image`, {
        prompt: inputValue,
        endpoint: "txt2img", //txt2img or img2img
        ...options,
      });
      setResponseImage(res.data);
      setImageToShow(res.data.imageUrl);
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Error when sending request to server, please try again.",
      });
    }
    setLoading(false);
  };

  const handleOnImageUpload = (value) => {
    setShowSelector(true);
    setLoading(true);
    setResponseImage({
      imageUrl: value,
      message: "",
      createdAt: new Date(),
      apiVersion: 0,
    });
    setImageToShow(value);
    setLoading(false);
  };
  const onStyleSelect = async (type) => {
    if (type === "original") {
      setImageToShow(responseImage?.imageUrl);
    } else if (responseImage) {
      setLoading(true);
      setImageToShow(null);
      try {
        const res = await axios.post(`/api/produce-image`, {
          prompt: type,
          endpoint: "img2img", //txt2img or img2img
          initImage: [responseImage.imageUrl],
          ...options,
        });
        setResponseImageAfterStyle(res.data);
        setImageToShow(res.data.imageUrl);
      } catch (err) {
        messageApi.open({
          type: "error",
          content: "Error when sending request to server, please try again.",
        });
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
  const handleCreateClick = () => {
    if (inputValue) {
      setShowSelector(true);
      callModal(options);
    }
  };
  return (
    <Layout loading={loading}>
      {contextHolder}
      <div className={styles.container}>
        <InputContainer
          onClick={handleCreateClick}
          onChange={(v) => setInputValue(v)}
          setOptions={handleOptionChange}
          handleOnImageUpload={handleOnImageUpload}
        />
        {showSelector && (
          <StyleSelector
            loading={loading}
            onSelect={onStyleSelect}
            reponseImage={imageToShow}
          />
        )}
        <ArtworkContainer />
      </div>
    </Layout>
  );
}
