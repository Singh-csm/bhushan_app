import React from "react"
import "./CommentCard.css"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material"
import { deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../../Actions/User"

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount,

}) => {

    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const deleteCommentHandler = () => {
        dispatch(deleteCommentOnPost(postId, commentId))
        if (isAccount) {
            dispatch(getMyPosts())
        } else {
            dispatch(getFollowingPosts());
        }

    }

    return (

        <div className="commentUser">
            <Link to={`/user/${userId}`}>
                <img src={avatar} alt={name} />
                <Typography style={{ minwidth: "6vmax" }}>{name}   </Typography>
            </Link>


            <Typography style={{ margin: "1vmax 1vmax" }}> {comment}</Typography>


            {
                isAccount ? (
                    <Button onClick={deleteCommentHandler}> <Delete /> </Button>) : userId === user._id ? (

                        <Button onClick={deleteCommentHandler}>
                            <Delete />
                        </Button>) : null
            }


        </div>

    )

};

export default CommentCard;