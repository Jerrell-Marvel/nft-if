import React, { useState, type ChangeEvent } from "react";
import { isValidEmail, isValidEnterpriseEmail } from "utils/validator";

type EmailInputProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isEnterprise?: boolean;
};
export default function EmailInput({ onChange, value, isEnterprise = false }: EmailInputProps) {
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("here");
    const validator = isEnterprise ? isValidEnterpriseEmail : isValidEmail;
    if (validator(e.target.value)) {
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

      <span className="error-text">{emailErrorMsg}</span>
    </>
  );
}
