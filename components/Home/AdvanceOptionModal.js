import { Button, Input, Modal, Collapse } from "antd";
import React, { useState } from "react";
import Inpainting from "./Inpainting";
import shuffleIcon from "@/public/images/shuffle-icon.png";
import Image from "next/image";

function AdvanceOptionModal({ setOptions, options }) {
  const handleFieldChange = (e) => {
    setOptions((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Collapse defaultActiveKey={["0"]} ghost>
      <Collapse.Panel header="Open advance settings" key="1">
        <Button
          style={{ float: "right" }}
          onClick={() => {
            setOptions({
              ...options,
              steps: Math.floor(Math.random() * 200),
              cfg_scale: Math.floor(Math.random() * 20),
              seed: Math.floor(Math.random() * 1000),
            });
          }}
          type="primary"
        >
          <Image
            src={shuffleIcon}
            width={16}
            height={16}
            style={{ marginBottom: "3px", marginRight: "5px" }}
          />
          Randomize
        </Button>
        <div style={{ padding: "10px", marginTop: "10px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>Enter negative prompt</label>
            <Input
              name="negativePrompt"
              value={options.negativePrompt}
              onChange={handleFieldChange}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Enter Steps</label>
            <Input
              type="number"
              name="steps"
              max={500}
              status={options.steps > 500 ? "error" : ""}
              min={1}
              value={options.steps}
              onChange={handleFieldChange}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Enter CFG Scale</label>
            <Input
              type="number"
              name="cfg_scale"
              max={1000}
              status={options.cfg_scale > 1000 ? "error" : ""}
              min={1}
              value={options.cfg_scale}
              onChange={handleFieldChange}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Enter Seeds</label>
            <Input
              type="number"
              name="seed"
              max={10000000}
              status={options.seed > 10000000 ? "error" : ""}
              min={1}
              value={options.seed}
              onChange={handleFieldChange}
            />
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>
  );
}

export default AdvanceOptionModal;
