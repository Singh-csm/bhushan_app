import axios from "axios"

export const loginUser = (email,password)=>async (dispatch)=>{
    try{
        dispatch({
            type:"LoginRequest"
        })

const {data} = await axios.post("/api/v1/login",{email,password},{
    headers:{
        "Content-Type":"application/json",
    },
})

dispatch({
    type:"LoginSuccess",
    payload : data.user
})


}catch(error){

        dispatch({
            type:"LoginFailure",
            payload : error.response.data.message
        })
    }

}


//=================== Register ====================================================


export const registerUser = (name, email, password , avatar)=>async (dispatch)=>{
    try{
        dispatch({
            type:"RegisterRequest"
        })

const {data} = await axios.post("/api/v1/register",{name, email, password , avatar},{
    headers:{
        "Content-Type":"application/json",
    },
})

dispatch({
    type:"RegisterSuccess",
    payload : data.user
})


}catch(error){

        dispatch({
            type:"RegisterFailure",
            payload : error.response.data.message
        })
    }

}


//===============================UpdateProfile ================================


export const updateProfile = (name, email, avatar)=>async (dispatch)=>{
    try{
        dispatch({
            type:"updateProfileRequest"
        })

const {data} = await axios.put("/api/v1/update/profile",{name, email,avatar},{
    headers:{
        "Content-Type":"application/json",
    },
})

dispatch({
    type:"updateProfileSuccess",
    payload : data.message
})


}catch(error){

        dispatch({
            type:"updateProfileFailure",
            payload : error.response.data.message
        })
    }

}


//===============================UpdatePassword ================================


export const updatePassword = (oldPassword,newPassword)=>async (dispatch)=>{
    try{
        dispatch({
            type:"updatePasswordRequest"
        })

const {data} = await axios.put("/api/v1/update/password",{oldPassword,newPassword},{
    headers:{
        "Content-Type":"application/json",
    },
})

dispatch({
    type:"updatePasswordSuccess",
    payload : data.message
})


}catch(error){

        dispatch({
            type:"updatePasswordFailure",
            payload : error.response.data.message
        })
    }

}

//==================================Forgot Password ==================================

export const forgotPassword = (email)=>async (dispatch)=>{
    try{
        dispatch({
            type:"forgotPasswordRequest"
        })

const {data} = await axios.post("/api/v1/forgot/password",{email},{
    headers:{
        "Content-Type":"application/json",
    },
})

dispatch({
    type:"forgotPasswordSuccess",
    payload : data.message
})


}catch(error){

        dispatch({
            type:"forgotPasswordFailure",
            payload : error.response.data.message
        })
    }

}


//=============================== Reset Password =================================

export const resetPassword = (token,password)=>async (dispatch)=>{
    try{
        dispatch({
            type:"resetPasswordRequest"
        })

const {data} = await axios.put(`/api/v1/password/reset/${token}`,{password},{
    headers:{
        "Content-Type":"application/json",
    },
})

dispatch({
    type:"resetPasswordSuccess",
    payload : data.message
})


}catch(error){

        dispatch({
            type:"resetPasswordFailure",
            payload : error.response.data.message
        })
    }

}


//==============================================Delete My  Profile ==============================


export const deleteMyProfile= ()=>async (dispatch)=>{
    try{
        dispatch({
            type:"deleteProfileRequest"
        })

const {data} = await axios.delete("/api/v1/delete/me" )

dispatch({
    type:"deleteProfileSuccess",
    payload : data.message
})


}catch(error){

        dispatch({
            type:"deleteProfileFailure",
            payload : error.response.data.message
        })
    }

}





//================================Loade User==================================================


export const loadUser = ()=>async (dispatch)=>{
    try{
        dispatch({
            type:"LoadUserRequest"
        })

 
const {data} = await axios.get("/api/v1/me")



dispatch({
    type:"LoadUserSuccess",
    payload : data.user
})


}catch(error){

        dispatch({
            type:"LoadUserFailure",
            payload : error.response.data.message
        })
    }

};

//========================get post of following people ==========================================



export const getFollowingPosts = ()=> async (dispatch)=>{
    try{
dispatch({
    type: "postOfFollowingRequest",
})

const {data} = await axios.get("/api/v1/posts")

dispatch({
    type: "postOfFollowingSuccess",
    payload : data.post,
})

 }catch(error){
        dispatch({
            type:"postOfFollowingFailure",
            payload : error.response.data.message
        })
    }
}


//===========================Get My Posts=====================================================


export const getMyPosts = () => async (dispatch) => {
    try {
      dispatch({
        type: "myPostsRequest",
      });
  
      const { data } = await axios.get("/api/v1/my/posts");
      dispatch({
        type: "myPostsSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "myPostsFailure",
        payload: error.response.data.message,
      });
    }
  };

  //=======================================Get User Post ==================================


  export const getUserPosts = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userPostRequest",
      });
  
      const { data } = await axios.get(`/api/v1/userpost/${id}`);
      dispatch({
        type: "userPostSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "userPostFailure",
        payload: error.response.data.message,
      });
    }
  };



  //=========================User Profile =============================


  export const getUserProfile = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userProfileRequest",
      });
  
      const { data } = await axios.get(`/api/v1/user/${id}`);
      dispatch({
        type: "userProfileSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "userProfileFailure",
        payload: error.response.data.message,
      });
    }
  };



//======================= Follow User ======================================



export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "followUserRequest",
      });
  
      const { data } = await axios.get(`/api/v1/follow/${id}`);
      dispatch({
        type: "followUserSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "followUserFailure",
        payload: error.response.data.message,
      });
    }
  };









//=======================get all user==================================================

export const getAllUsers = ()=> async (dispatch)=>{
    try{
dispatch({
    type: "allUsersRequest",
})

const {data} = await axios.get("/api/v1/users")

dispatch({
    type: "allUsersSuccess",
    payload : data.users,
})

 }catch(error){
        dispatch({
            type:"allUsersFailure",
            payload : error.response.data.message
        })
    }
}


//======================================= Search User =================================

export const searchUsers = (name ="")=> async (dispatch)=>{
    try{
dispatch({
    type: "searchUsersRequest",
})

const {data} = await axios.get(`/api/v1/search?name=${name}`)

dispatch({
    type: "searchUsersSuccess",
    payload : data.users,
})

 }catch(error){
        dispatch({
            type:"searchUsersFailure",
            payload : error.response.data.message
        })
    }
}










//===================================Logout User =============================



export const logoutUser = ()=>async (dispatch)=>{
    try{
        dispatch({
            type:"LogoutUserRequest"
        })

 await axios.get("/api/v1/logout" )
 

dispatch({
    type:"LogoutUserSuccess",
})


}catch(error){

        dispatch({
            type:"LogoutUserFailure",
            payload : error.response.data.message
        })
    }

}