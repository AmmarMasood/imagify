import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css";
import { ConfigProvider, Spin } from "antd";
import theme from "@/theme";

function Layout({ title, keywords, description, children, loading }) {
  return (
    <ConfigProvider theme={theme}>
      <div>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
        </Head>
        <Spin
          spinning={loading}
          tip="Loading please wait..."
          style={{ position: "fixed" }}
        >
          <Navbar />
          <div className={styles.container}>{children}</div>
          <Footer />
        </Spin>
      </div>
    </ConfigProvider>
  );
}

Layout.defaultProps = {
  title: "Imagify | Create your own art",
  keywords:
    "Create your own art stable diffusion AI artifical intelligence art artwork letter to art words to art",
  description: "Create your own art",
  loading: false,
};
export default Layout;
