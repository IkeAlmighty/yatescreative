import {useEffect, useState} from "react";
import styles from "../styles/SunriseWidget.module.css";

export default function SunriseWidget() {
  const [timeToSunrise, setTimeToRunrise] = useState(undefined);
  const callApi = (lat, lng) => {
    return fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
    );
  };
  useEffect(() => {
    callApi(35.22323819283169, -97.44165408105708)
      .then((res) => res.json())
      .then((json) => {
        let sunriseP = json.results.sunrise.split(/[:\s]/);
        sunriseP[0] = String(parseInt(sunriseP[0]) - 5);
        // const sunriseCDT = sunriseP
        //   .reduce((acc, curr) => acc + `:${curr}`)
        //   .replace(":AM", " AM")
        //   .replace(":PM", " PM");
        // console.log(sunriseCDT);

        let nextSunrise = new Date(Date.now() + 60 * 60 * 24 * 1000);
        nextSunrise.setHours(sunriseP[0]);
        nextSunrise.setMinutes(sunriseP[1]);
        nextSunrise.setSeconds(sunriseP[2]);

        setInterval(() => {
          let difference = nextSunrise.getTime() - new Date().getTime();
          let dhours = Math.floor(difference / 1000 / 60 / 60);
          let dmin = Math.abs(dhours * 60 - Math.floor(difference / 1000 / 60));
          let dsec = Math.abs(
            dhours * 60 * 60 + dmin * 60 - Math.floor(difference / 1000)
          );

          setTimeToRunrise(`${dhours} hrs, ${dmin} min, and ${dsec} secs`);
        }, 50);
      });
  }, []);
  return (
    <div>
      <div className={styles.timeToSunrise}>{timeToSunrise}</div>
      <div className={styles.footer}>until Gray Owl&apos;s next sunrise.</div>
    </div>
  );
}
