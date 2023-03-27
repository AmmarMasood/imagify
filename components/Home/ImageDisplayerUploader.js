import { Skeleton } from "antd";
import Image from "next/image";
import React from "react";
import styles from "../../styles/ImageDisplayerUploader.module.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

function ImageDisplayerUploader({ img, loading, onImageUpload }) {
  const props = {
    name: "file",
    accept: "image/*",
    multiple: false,
    maxCount: 1,
    beforeUpload(info) {
      const data = new FileReader();
      data.addEventListener("load", () => {
        onImageUpload(data.result);
      });
      data.readAsDataURL(info);
    },
    onDrop(e) {
      const data = new FileReader();
      data.addEventListener("load", () => {
        onImageUpload(e.dataTransfer.files[0]);
      });
      data.readAsDataURL(e.dataTransfer.files[0]);
    },
  };

  return loading ? (
    <Skeleton.Image
      active={loading}
      style={{ height: "700px", width: "700px" }}
    />
  ) : (
    <div className={styles["container"]}>
      <Dragger {...props}>
        {img ? (
          <Image
            src={img}
            alt="stable-diffusion"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Support for a single file.</p>
          </>
        )}
      </Dragger>
    </div>
  );
}

export default ImageDisplayerUploader;
