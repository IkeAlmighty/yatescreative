import Hamburger from "hamburger-react";
import { useState } from "react";
import styles from "./Menu.module.css";

export default function Menu({ children }) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Hamburger size={30} onToggle={() => setToggle(!toggle)} />

      <div
        className={`
        ${toggle ? styles.slideIn : styles.slideOut} ${styles.menu}
        `}
      >
        {children}
      </div>
    </>
  );
}
