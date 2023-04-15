import React, { useEffect, useState } from "react"
import { Typography, Button } from "@mui/material"
import "./UpdateProfile.css"
import { Avatar } from "@mui/material"
import { updateProfile, loadUser } from "../../Actions/User"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader"



const UpdateProfile = () => {

  const { loading, error, user } = useSelector((state) => state.user)
  const { loading: updateLoading, error: updateError, message } = useSelector((state) => state.likes)

  const [avatar, setAvatar] = useState("")
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)


  const dispatch = useDispatch()

  const alert = useAlert()



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file)

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result)
      }
    }

  }


  const submitHandler = async (e) => {
    e.preventDefault()
    await dispatch(updateProfile(name, email, avatar))
    dispatch(loadUser())

  }


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: "clearErrors" })
    }
    if (updateError) {
      alert.error(updateError)
      dispatch({ type: "clearErrors" })
    }
    if (message) {
      alert.success(message)
      dispatch({ type: "clearMessage" })
    }


  }, [dispatch, error, alert, updateError, message])


  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>

        <Typography variant="h3" style={{ padding: "2vmax" }}>Social Media</Typography>

        <Avatar src={avatarPrev} alt="User" sx={{ height: "10vmax", width: "10vmax" }} />

        <input type="file" accept="images/**" onChange={handleImageChange} />

        <input type="text" className="updateProfileInputs" placeholder="Enter name" value={name} required
          onChange={(e) => setName(e.target.value)} />

        <input type="email" className="updateProfileInputs" placeholder="Enter email" value={email} required
          onChange={(e) => setEmail(e.target.value)} />

        <Button disabled={updateLoading} type="submit"> Update Profile </Button>


      </form>

    </div>
  )
}

export default UpdateProfile