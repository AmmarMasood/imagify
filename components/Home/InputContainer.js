import React from "react";
import styles from "@/styles/Home.module.css";
import { Button, Input } from "antd";
import AdvanceOptionModal from "./AdvanceOptionModal";
import refreshIcon from "@/public/images/restart-icon.png";
import Image from "next/image";

function InputContainer({ onChange, onClick, showOriginal }) {
  return (
    <div className={styles["input-container"]}>
      <h1>Unlimited possiblities</h1>
      <p>Create everything you can imagine</p>

      <div className={styles["input-container--inner"]}>
        <div>
          <Input
            size="large"
            placeholder="e.g. whats your most beautiful memory?"
            onChange={(e) => onChange(e.target.value)}
          />
          <Button type="primary" onClick={onClick} size="large">
            Create New
          </Button>
        </div>
        <Image
          src={refreshIcon}
          alt="refresh icon"
          width={32}
          height={32}
          onClick={showOriginal}
        />
      </div>
    </div>
  );
}

export default InputContainer;
