import {useEffect, useState} from "react";
import styles from "../styles/TimeWidget.module.css";

export default function TimeWidget() {
  const [timeString, setTimeString] = useState(undefined);

  const convertMilitaryHours = (mhours) => (mhours > 12 ? mhours - 12 : mhours);
  const zeroPad = (num) => (num < 10 ? `0${num}` : num);

  useEffect(() => {
    setInterval(() => {
      let date = new Date();
      let hrs = convertMilitaryHours(date.getHours());
      let mins = zeroPad(date.getMinutes());
      let secs = date.getSeconds();
      let amPm = date.getHours() > 12 ? "pm" : "am";
      setTimeString(`${hrs}:${mins}:${secs} ${amPm}`);
    }, 50);
  }, []);
  return timeString ? (
    <div className={styles.container}>The time is {timeString}</div>
  ) : (
    ""
  );
}
