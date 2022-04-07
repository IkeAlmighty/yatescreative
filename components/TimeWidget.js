import { useEffect, useState } from "react";

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
    <div className="my-0 p-[20px] block text-lg">The time is {timeString}</div>
  ) : (
    ""
  );
}
