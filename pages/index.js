import Navigation from "../components/Navigation";
import ArtTile from "../components/ArtTile";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Home() {
  const [imageURLs, setImageURLS] = useState([]);

  useEffect(() => {
    axios.get("/api/getimageurls").then((res) => {
      setImageURLS(res.data.urls);
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Yates Creative</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <main className={styles.main}>
        {imageURLs.map((url) => {
          <ArtTile imageURL={url} />;
        })}
      </main>
    </div>
  );
}
