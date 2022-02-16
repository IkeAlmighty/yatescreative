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

      <h1>Isaac - Availability</h1>

      <iframe
        src={`https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23616161&ctz=America%2FChicago&title=Availability-%20Isaac%20Yates&showNav=1&showTabs=1&showCalendars=0&mode=WEEK&showDate=0&showPrint=0&showTz=1&showTitle=0&src=aXNhYWN5YXRlczdAZ21haWwuY29t&color=%237CB342`}
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
