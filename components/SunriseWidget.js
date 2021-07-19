import {useEffect, useState} from "react";

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
        console.log(json);
        // const sunrise = new Date(json.results.sunrise).toLocaleTimeString('cdt')
        // const sunset =
        setInterval(() => {}, 50);
      });
  }, []);
  return <div></div>;
}
