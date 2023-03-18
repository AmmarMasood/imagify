import { Button, Input, Modal } from "antd";
import React, { useState } from "react";

function AdvanceOptionModal({ onComplete }) {
  const [openModal, setOpenModal] = useState(false);
  const [options, setOptions] = useState({
    negativePrompt: "",
    steps: 25,
    cfg_scale: 7.5,
    seed: 42,
  });

  const handleFieldChange = (e) => {
    setOptions((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <Modal
        title="Advance Image Generation Options"
        open={openModal}
        onOk={() => {
          setOpenModal(false);
          onComplete(options);
        }}
        onCancel={() => setOpenModal(false)}
      >
        <div style={{ margin: "30px 0 10px 0" }}>
          <label>Enter negative prompt</label>
          <Input
            name="negativePrompt"
            value={options.negativePrompt}
            onChange={handleFieldChange}
          />
        </div>
        <div style={{ marginBottom: "10px 0" }}>
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
        <div style={{ marginBottom: "10px 0" }}>
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
        <div style={{ marginBottom: "10px 0" }}>
          <label>Enter Seeds</label>
          <Input
            type="number"
            name="seed"
            max={100000}
            status={options.seed > 100000 ? "error" : ""}
            min={1}
            value={options.seed}
            onChange={handleFieldChange}
          />
        </div>
      </Modal>
      <Button onClick={() => setOpenModal(true)}>Show Advance Options</Button>
    </div>
  );
}

export default AdvanceOptionModal;
