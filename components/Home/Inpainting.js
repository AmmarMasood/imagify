import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Image from "next/image";

function Inpainting({ imageToShow, setMaskedImageUrl }) {
  const canvas = React.createRef();

  const onChange = async () => {
    // only respond if there are paths to draw (don't want to send a blank canvas)
    // if (paths.length) {
    const data = await canvas.current.exportImage("png");
    setMaskedImageUrl(data);
    // }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "700px",
          width: "700px",
          border: "5px solid #1677ff",
        }}
      >
        {imageToShow && (
          <Image
            src={imageToShow}
            alt="preview image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
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
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}

export default Inpainting;
