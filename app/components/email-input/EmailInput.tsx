import React, { useState, type ChangeEvent } from "react";
import { isValidEmail } from "utils/validator";
import "./EmailInput.scss";

type EmailInputProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};
export default function EmailInput({ onChange, value }: EmailInputProps) {
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("here");
    if (isValidEmail(e.target.value)) {
      setEmailErrorMsg("");
    } else {
      setEmailErrorMsg("Please enter a valid email address");
    }

    onChange(e.target.value);
  };
  return (
    <>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={value}
        onChange={handleEmailChange}
      />

      <span className="email-error-msg">{emailErrorMsg}</span>
    </>
  );
}
