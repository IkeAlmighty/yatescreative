import marked from "marked";
import axios from "axios";
import {useEffect, useState} from "react";
import SunriseWidget from "../../components/SunriseWidget";
import TimeWidget from "../../components/TimeWidget";
import WeatherWidget from "../../components/WeatherWidget";
import styles from "../../styles/GrayOwl.module.css";

export default function Index() {
  const [markdown, setMarkdown] = useState("Loading...");

  useEffect(() => {
    axios.get("/grayowl.md").then((res) => {
      setMarkdown(res.data);
      document.getElementById("markdown").innerHTML = marked(markdown);
    });
  });

  return (
    <div className={styles.content}>
      <SunriseWidget />
      <div id="markdown"></div>
      <TimeWidget />
      {/* <WeatherWidget /> */}
    </div>
  );
}
