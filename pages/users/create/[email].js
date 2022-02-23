import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function CreateUser({ email }) {
  const [errorMessage, setErrorMessage] = useState("");

  async function createUser(e) {
    e.preventDefault();
    setErrorMessage("");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    let body = JSON.stringify({ name, email, phone });
    console.log("creating", name, email, phone);
    let res = await fetch("/api/db/createuser", { method: "POST", body });
    if (!res.ok) {
      setErrorMessage(await res.text());
    }
  }

  function prefillInputs() {
    document.getElementById("email").value = email ? email : "";
  }

  function InputRow({ label, type, placeholder, id, required, autoComplete }) {
    return (
      <div className={`my-3 ${styles.inputRow}`}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          required={required}
          autoComplete={autoComplete}
        />
      </div>
    );
  }

  useEffect(() => {
    prefillInputs();
  }, []);

  return (
    <div className="content-container">
      <form
        onSubmit={(e) => {
          createUser(e);
        }}
      >
        <InputRow
          label="Name"
          type="text"
          placeholder="name"
          id="name"
          required={true}
          autoComplete="name"
        />
        <InputRow
          label="Email"
          type="email"
          placeholder="myemail@domain.com"
          id="email"
          required={true}
        />
        <InputRow
          label="Phone #"
          type="tel"
          placeholder="1234567890"
          id="phone"
          required={false}
        />

        <input className="text-center my-1" type="submit" value="Create User" />
      </form>

      <div>{errorMessage}</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { email } = context.query;

  return { props: { email } };
}
