import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown/react-markdown.min";

export default function EditMarkdown({ markdown, className, onSave }) {
  const [showMarkdown, setShowMarkdown] = useState(false);

  useEffect(() => {
    //FIXME this is jank
    const onKeyDown = (e) => {
      let keysDown = JSON.parse(localStorage.getItem("keysDown")) || {};
      if (keysDown[e.key]) return;

      keysDown[e.key] = true;
      localStorage.setItem("keysDown", JSON.stringify(keysDown));

      if (keysDown.Alt && keysDown.p && Object.keys(keysDown).length === 2) {
        let showMarkdown = localStorage.getItem("showMd") === "true" || false;
        localStorage.setItem("showMd", !showMarkdown);
      }
    };

    const onKeyUp = (e) => {
      let keysDown = JSON.parse(localStorage.getItem("keysDown")) || {};
      delete keysDown[e.key];
      localStorage.setItem("keysDown", JSON.stringify(keysDown));
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    setInterval(() => {
      let showMd = localStorage.getItem("showMd") === "true" || false;
      setShowMarkdown(showMd);
    }, 100);

    setInterval(() => {
      console.log(markdown);
    }, 100);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {}, []);

  if (showMarkdown)
    return (
      <div
        contentEditable
        className={className}
        style={{ width: "100%", height: "100%", minHeight: "50vh" }}
      >
        {markdown}
      </div>
    );
  else
    return (
      <div className={className}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    );
}
