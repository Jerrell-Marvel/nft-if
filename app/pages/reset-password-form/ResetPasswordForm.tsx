import { toast } from "react-toastify";

export default function ResetPasswordForm() {
  return (
    <div>
      <label htmlFor="new-password">new password</label>
      <input
        type="password"
        id="new-password"
      />
      <label htmlFor="confirm-new-password">confirm new password</label>
      <input
        type="password"
        id="confirm-new-password"
      />

      <button
        onClick={() => {
          toast.success("your password has been reset");
        }}
      >
        Reset
      </button>
    </div>
  );
}
