import {configureStore} from "@reduxjs/toolkit"
import { allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer,} from "./Reducer/user"
import {likesReducer, myPostsReducer, userPostReducer} from "./Reducer/Post"

const store =configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing :postOfFollowingReducer,
        allUsers : allUsersReducer,
        likes : likesReducer,
        myPosts : myPostsReducer,
        userPosts:userPostReducer,
       userProfile :userProfileReducer

    }
})

export default store