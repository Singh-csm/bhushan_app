import './App.css';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import Login from "./Component/Login/login"
import Home from "./Component/Home/Home"
import Header from "./Component/Header/header"
import {useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import {loadUser} from "./Actions/User"
import Account from "./Component/Account/Account";
import NewPost from "./Component/NewPost/NewPost";
import Register from "./Component/Register/Register";
import UpdateProfile  from "./Component/UpdateProfile/UpdateProfile"
import UpdatePassword from "./Component/UpdatePassword/UpdatePassword"
import ForgotPassword from "./Component/ForgotPassword/ForgotPassword"
import ResetPassword from "./Component/ResetPssword/ResetPassword"
import UserProfile from "./Component/UserProfile/UserProfile";
import  Search  from "./Component/Search/Search"
import NotFound from './Component/NotFound/NotFound';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser()) 
  }, [dispatch])

const {isAuthenticated} = useSelector((state) => state.user)



return(
<Router> 
{isAuthenticated && <Header/>}

<Routes>
         <Route path ="/" element = {isAuthenticated ? <Home/> : <Login/>}/>
         <Route path ="/account" element = {isAuthenticated ? <Account/> : <Login/>}/>
         <Route path ="/newPost" element = {isAuthenticated ? <NewPost/> : <Login/>}/>
         <Route path ="/register" element = {isAuthenticated ? <Account/> : <Register/>}/>
         <Route path ="/update/profile" element = {isAuthenticated ? <UpdateProfile/> : <Login/>}/>
         <Route path ="/update/password" element = {isAuthenticated ? <UpdatePassword/> : <Login/>}/>
         <Route path ="/forgot/password" element = {isAuthenticated ? <UpdatePassword/> : <ForgotPassword/>}/>
         <Route path ="/password/reset/:token" element = {isAuthenticated ? <UpdatePassword/> : <ResetPassword/>}/> 
         <Route path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Login />}       />
         <Route path="/search" element={isAuthenticated ? <Search /> : <Login />} />
         <Route path="*" element={<NotFound/>} />

          
</Routes>
  




  </Router> 
) 
  
}

export default App;
