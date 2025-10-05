import { useState } from "react";
import "./PasswordInput.scss";
import EyeOpen from "../icons/eyes/EyeOpen";
import EyeClose from "../icons/eyes/EyeClose";

type PasswordInputProps = {
  onChange: React.Dispatch<React.SetStateAction<string>>;
};
export default function PasswordInput({ onChange }: PasswordInputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleEyeClick = () => {
    setIsShowPassword((prev) => !prev);
  };
  return (
    <div className="password-wrapper">
      <input
        type={isShowPassword ? "text" : "password"}
        id="password"
        className="password-input"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />

      {isShowPassword ? <EyeOpen onClick={handleEyeClick} /> : <EyeClose onClick={handleEyeClick} />}
    </div>
  );
}
