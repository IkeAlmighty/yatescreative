import Navigation from "../components/Navigation";
import ArtTile from "../components/ArtTile";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Yates Creative</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <iframe
        src={`https://calendar.google.com/calendar/embed?src=isaacyates7%40gmail.com&ctz=America%2FChicago`}
        style={{
          border: "0px",
          display: "block",
          width: "100%",
          height: "90%",
        }}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
}
