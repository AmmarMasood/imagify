import React from "react";
import styles from "@/styles/Home.module.css";
import { Button, Input } from "antd";
import AdvanceOptionModal from "./AdvanceOptionModal";

function InputContainer({ onChange, onClick, setOptions }) {
  return (
    <div className={styles["input-container"]}>
      <h1>Unlimited possiblities</h1>
      <p>Create everything you can imagine</p>
      <div className={styles["input-container--inner"]}>
        <Input
          size="large"
          placeholder="e.g. whats your most beautiful memory?"
          onChange={(e) => onChange(e.target.value)}
        />
        <Button type="primary" onClick={onClick} size="large">
          Create
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <AdvanceOptionModal onComplete={setOptions} />
      </div>
    </div>
  );
}

export default InputContainer;