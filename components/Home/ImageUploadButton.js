import { Button, Modal } from "antd";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

function ImageUploadButton({ handleOnImageUpload }) {
  const [showModal, setShowModal] = useState(false);

  const props = {
    name: "file",
    accept: "image/*",
    multiple: false,
    maxCount: 1,
    beforeUpload(info) {
      const data = new FileReader();
      data.addEventListener("load", () => {
        handleOnImageUpload(data.result);
        setShowModal(false);
        // console.log("ammar3", data.result);
      });
      data.readAsDataURL(info);
    },
    onDrop(e) {
      const data = new FileReader();
      data.addEventListener("load", () => {
        handleOnImageUpload(e.dataTransfer.files[0]);
        setShowModal(false);
        // console.log("ammar3", data.result);
      });
      data.readAsDataURL(e.dataTransfer.files[0]);
    },
  };

  return (
    <div>
      <Modal
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        open={showModal}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Modal>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Upload an image
      </Button>
    </div>
  );
}

export default ImageUploadButton;
