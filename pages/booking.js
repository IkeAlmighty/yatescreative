import { useEffect, useRef } from "react";
import Navigation from "../lib/components/Navigation";

export default function Booking() {
  const calendlyContainer = useRef();

  useEffect(() => {
    const calendlyWidgetScript = document.createElement("script");
    calendlyWidgetScript.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    calendlyWidgetScript.setAttribute("type", "text/javascript");
    calendlyWidgetScript.setAttribute("async", true);

    calendlyContainer.current.appendChild(calendlyWidgetScript);
  }, []);

  return (
    <>
      <div className="with-navbar">
        {/* <!-- Calendly inline widget begin --> */}
        <div ref={calendlyContainer}>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/isaacyates"
            style={{ minWidth: "320px", height: "630px" }}
          ></div>

          {/* 
          The script tag is added with js on page load - useEffect(()=>{...}, []).
          I do it this way because there is a problem with reloading Script from
          next/script, after the initial page load.
          */}

          {/* <!-- Calendly inline widget end --> */}
        </div>
      </div>

      <Navigation />
    </>
  );
}
