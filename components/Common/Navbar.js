import React from "react";
import styles from "@/styles/Navbar.module.css";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import {
  QuestionCircleOutlined,
  SettingOutlined,
  BellOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";

const items = [
  {
    key: "1",
    label: "Username",
  },
  {
    key: "2",
    label: "Profile",
  },
  {
    key: "3",
    label: "Logout",
  },
];

function Navbar() {
  const dropDown = () => (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Avatar size={"large"} icon={<UserOutlined />} />
        <DownOutlined />
      </a>
    </Dropdown>
  );

  return (
    <div className={styles["container"]}>
      <Image src={Logo} alt="imagify" />
      <div className={styles["container-inner"]}>
        <div className={styles["container-inner--links"]}>
          <ul>
            <li>Home</li>
            <li>Feed</li>
            <li>Styles</li>
            <li>Community</li>
            <li>Bookmarks</li>
          </ul>
        </div>
        <div className={styles["container-inner--options"]}>
          <ul>
            <li>
              <QuestionCircleOutlined />
            </li>
            <li>
              <SettingOutlined />
            </li>
            <li>
              <BellOutlined />
            </li>
            <li style={{ cursor: "pointer" }}>{dropDown()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
