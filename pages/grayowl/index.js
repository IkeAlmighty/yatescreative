import marked from "marked";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Index() {
  const [markdown, setMarkdown] = useState("Loading...");
  
  useEffect(() => {
    axios.get("/grayowl.md").then((res) => {
      setMarkdown(res.data);
      document.getElementById("markdown").innerHTML = marked(markdown);
    });
  });

  return (
    <div>
      <div id="markdown"></div>
    </div>
  );
}
