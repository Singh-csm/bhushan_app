
import "./UpdatePassword.css"
import React, { useState, useEffect } from "react"
import { Typography, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updatePassword } from "../../Actions/User"
import { useAlert } from "react-alert";

const UpdatePassword = () => {

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const dispatch = useDispatch()
  const { loading, error, message } = useSelector((state) => state.likes)
  const alert = useAlert()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword))
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

  }, [dispatch, error, alert, message])


  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>Social Media</Typography>

        <input type="password" className="updatePasswordInputs" placeholder="Enter OldPassword"
          value={oldPassword} required onChange={(e) => setOldPassword(e.target.value)} />

        <input type="password" className="updatePasswordInputs" placeholder="Enter NewPassword"
          value={newPassword} required onChange={(e) => setNewPassword(e.target.value)} />

        <Button disabled={loading} type="submit"> Change Password </Button>

      </form>
    </div>

  )
}




export default UpdatePassword