import React, { useState, useEffect } from "react"
import "./Login.css"
import { Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../Actions/User"
import { useAlert } from "react-alert";

const Login = () => {
  const alert = useAlert()

  const { error,loading } = useSelector((state) => state.user)
  const { message } = useSelector((state) => state.likes)


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password))
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
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography className = "fonts" variant="h3" style={{ padding: "2vmax" }}>Social Media</Typography>

        <input type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} />

        <Link to="/forgot/password">
          <Typography> Forgot Password </Typography>
        </Link>

        <Button disabled={loading} type="submit"> Login </Button>

        <Link to="/register">
          <Typography> new User? </Typography>
        </Link>


      </form>
    </div>

  )
}


export default Login