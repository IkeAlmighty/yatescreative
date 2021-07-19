import {useEffect, useState} from "react";

export default function WeatherWidget() {
  const [weatherString, setWeatherString] = useState(undefined);

  const callAccuWeather = (apiKey) => {
    const geo = `http://dataservice.accuweather.com/currentconditions/v1/330127`;
    return fetch(`${geo}?apikey=${apiKey}&details=true`);
  };
  useEffect(() => {
    //TODO: maybe buy one month subscr
    // callAccuWeather("xGeTOzsjN3Mid4ipyT0ACNxr887x8kGo")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     console.log(json);
    //   })
    //   .catch((err) => console.log(err));
  }, []);
  return <div></div>;
}
