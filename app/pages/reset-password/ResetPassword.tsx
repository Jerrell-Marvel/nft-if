import { useState } from 'react'
import { useNavigate } from 'react-router'
import './ResetPassword.scss'
import EmailInput from '~/components/email-input/EmailInput'
import { isValidEmail } from 'utils/validator'

export default function ResetPasswordPage() {
  const [isShowNotif, setIsShowNotif] = useState(false)

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  return (
    <div className="reset-password-page nav-padding">
      <div className="container">
        <h2 className="gradient-text">Reset Password</h2>
        <div className="text">
          <span>Please enter your email to reset password</span>
        </div>

        <div className="input-item">
          {/* <label htmlFor="email">Enter your email :</label> */}
          <EmailInput value={email} onChange={setEmail} showEmail={false} />
        </div>

        <button
          onClick={() => {
            setIsShowNotif(true)
            navigate('/reset-password/form')
          }}
          className={`btn ${!email || !isValidEmail(email) ? 'disabled-btn' : ''}`}
          disabled={!email || !isValidEmail(email) ? true : false}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
