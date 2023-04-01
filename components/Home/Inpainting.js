import React, { useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Button, Modal } from "antd";
import Image from "next/image";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

function Inpainting({ imageToShow, setMaskedImageUrl }) {
  const [showModal, setShowModal] = useState(false);
  const canvas = React.createRef();

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        disabled={imageToShow ? false : true}
      >
        Open Inpainting Module
      </Button>

      <Modal
        open={showModal}
        onOk={() => {
          canvas.current
            .exportImage("png")
            .then((data) => {
              setMaskedImageUrl(data);
              setShowModal(false);

              console.log(data);
            })
            .catch((e) => {
              console.log(e);
            });
        }}
        onCancel={() => setShowModal(false)}
        width={"fit-content"}
      >
        <div style={{ position: "relative", height: "700px", width: "700px" }}>
          {imageToShow && (
            <Image src={imageToShow} alt="preview image" layout="fill" />
          )}
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
              width: "100%",
            }}
          >
            <ReactSketchCanvas
              ref={canvas}
              strokeWidth={80}
              strokeColor="black"
              canvasColor="transparent"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Inpainting;
