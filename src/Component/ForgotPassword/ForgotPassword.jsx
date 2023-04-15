import React, { useState, useEffect } from "react"
import { Typography, Button } from "@mui/material"
import "./ForgotPassword.css"
import { forgotPassword } from "../../Actions/User"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";


const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  const alert = useAlert()
  const { error, loading, message } = useSelector((state) => state.likes)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: "clearErrors" })
    }
    if (message) {
      alert.success(message)
      dispatch({ type: "clearMessage" })
    }
  }, [alert, error, message, dispatch])
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>Social Aap</Typography>

        <input className="forgotPasswordInputs" type="email" placeholder="Enter email" value={email} required
          onChange={(e) => setEmail(e.target.value)} />

        <Button disabled={loading} type="submit"> Send Token </Button>

      </form>
    </div>
  )

}

export default ForgotPassword