import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { followAndUnfollowUser, getUserPosts, getUserProfile, loadUser } from "../../Actions/User"
import Loader from "../Loader/Loader"
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { useAlert } from "react-alert";
import User from "../User/User"


const UserProfile = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const params = useParams()


    const { user, loading: userLoading, error: userError, } = useSelector((state) => state.userProfile);

    const { user: me } = useSelector((state) => state.user)

    const { loading, error, posts } = useSelector((state) => state.userPosts)

    const { error: followError, message, loading: followLoading } = useSelector((state) => state.likes);

    const [followersToggle, setFollowersToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)
    const [following, setFollowing] = useState(false)
    const [myProfile, setMyProfile] = useState(false)


    const followHandler = async () => {
        setFollowing(!following)
        await dispatch(followAndUnfollowUser(user._id))
        await dispatch(getUserProfile(params.id))
        dispatch(loadUser())
    }



    useEffect(() => {
        dispatch(getUserPosts(params.id))
        dispatch(getUserProfile(params.id))
    }, [me._id, params.id, dispatch])

    useEffect(() => {
        if (me._id === params.id) {
            setMyProfile(true)
        }
        if (user) {
            user.followers.forEach((item) => {
                if (item._id === me._id) {
                    setFollowing(true)
                } else {
                    setFollowing(false)
                }
            })
        }

    }, [user, me._id, params.id])





    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }
        if (followError) {
            alert.error(followError)
            dispatch({ type: "clearErrors" })
        }
        if (userError) {
            alert.error(userError)
            dispatch({ type: "clearErrors" })
        }
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessage" })
        }
    }, [alert, error, message, followError, userError, dispatch])


    return loading === true || userLoading === true ? <Loader /> : (<div className="account">


        <div className="accountleft">

            {following ?
                posts && posts.length > 0 ? posts.map(post => (
                    <Post
                        key={post._id}

                        ownerName={post.owner.name}
                        postId={post._id}
                        caption={post.caption}
                        postImage={post.image.url}
                        likes={post.likes}
                        comments={post.comments}
                        ownerImage={post.owner.avatar.url}
                        ownerId={post.owner._id}
                    />
                )) : <Typography variant="h5">User Not Made Any Posts</Typography> : <Typography variant="h5">Please Follow User To View Posts</Typography>
            }


        </div>

        <div className="accountright">
            {
                user && (
                    <>
                        <Avatar src={user.avatar.url}
                            sx={{ height: "8vmax", width: "8vmax" }} alt={user.name} />

                        <Typography variant="h6" style={{fontSize:"27px",fontFamily:"revert"}}> {user.name} </Typography>

                        <div>
                            <button onClick={() => setFollowersToggle(!followersToggle)} style={{ backgroundColor: "#67a3dc", margin: "8px" }}>
                                <Typography variant ="h6">Followers</Typography>
                            </button>
                            <Typography variant="h5" style={{ margin: "8px", }}>{user.followers.length}</Typography>
                        </div>


                        <div>
                            <button onClick={() => setFollowingToggle(!followingToggle)} style={{ backgroundColor: "#67a3dc" }}>
                                <Typography variant ="h6">Following</Typography>
                            </button>

                            <Typography variant="h5" style={{ margin: "8px", }}>{user.following.length}</Typography>
                        </div>

                        <div>
                            <Typography>Posts</Typography>
                            <Typography variant="h5" style={{ margin: "8px", }}>{user.posts.length}</Typography>
                        </div>

                        {myProfile ? null : (
                            <Button
                                variant="contained"
                                style={{ background: following ? "red" : "" }}
                                onClick={followHandler}
                                disabled={followLoading}
                            >
                                {following ? "Unfollow" : "Follow"}
                            </Button>
                        )}

                    </>
                )
            }

            <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4"> Followers </Typography>
                    {
                        user && user.followers.length > 0 ? (user.followers.map((follow) => (
                            <User
                                key={follow._id}
                                userId={follow._id}
                                name={follow.name}
                                avatar={follow.avatar.url}
                            />
                        ))) : (<Typography style={{ margin: "2vmax" }}>You Hvae No Followers</Typography>)
                    }


                </div>

            </Dialog>



            <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4"> Followings </Typography>
                    {
                        user && user.following.length > 0 ? (user.following.map((follows) => (
                            <User
                                key={follows._id}
                                userId={follows._Id}
                                name={follows.name}
                                avatar={"follows.avatar.url"}
                            />
                        ))) : (<Typography style={{ marin: "2vmax" }}>You Have Not following anyone</Typography>)
                    }


                </div>

            </Dialog>

        </div>

    </div>
    )

}

export default UserProfile