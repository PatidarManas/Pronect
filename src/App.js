import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Upload from './Components/Upload';
import Signup from './Components/Signup';
import Home from './Components/Home';
import axios from 'axios';
import { FaLeaf } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Loading from './Components/Loading';
import Project from './Components/Project';
import Example from './Components/Test';
import ProfileDropdown from './Components/Test';
import Profile from './Components/Profile';
import Landing from './Components/Landing';
import Adminlogin from './Components/Admin_login';
import Admin from './Components/Admin';
import Chat from './Components/Chat';

function App() {
    // const URL = "http://localhost:4000";
    const URL = "https://pronect-server.onrender.com";
  const [test,settaste] = useState();
  const [loading,setloading] = useState(true);
  const [islogin,setlogin] = useState(false);
  const [adminloading,setadminloading] = useState(true);
  const [isadminlogin,setadminlogin] = useState(false);
  const [userdet,setuserdet] =useState();
  const [lastlogin,setlastlogin] =useState();
  async function isloginfunc(){
    const token = document.cookie;
    console.log(token)
      await axios.post(`${URL}/auth/islogin`,{
        token
      }).then((res)=>{
        if(res.status==200){

          setlogin(true);
          setloading(false);
          setuserdet(res.data.newuser);
          setlastlogin(res.data.lastlogin);
          // console.log(userdet)
        }else if(res.status==202){
          setloading(false);
        }
      }).catch((error)=>{
        console.log(error)
      })
  }

  async function isadminloginfunc (){
    const admintoken = document.cookie
    await axios.post(`${URL}/admin/islogin`,{
      admintoken
    }).then((res)=>{
      if(res.status==200){
        setadminloading(false);
        setadminlogin(true);
      }else if(res.status==204){
        setadminloading(false);

      }
    }).catch((error)=>{
      alert(error);
    })
  }
  useEffect(() => {
    
  
    isloginfunc();
    isadminloginfunc();
  }, [test])
  
  return (

    <Router>
    <Routes>
      <Route path={"/"} element={<Landing/>}/>
      {/* <Route path={"/loading"} element={<Loading/>}/> */}
      <Route path={"/signup"} element={loading? <Loading/> : islogin ? <Home user={userdet ? userdet : ""}  lastlogin={lastlogin ? lastlogin : ""} /> : <Signup/>}/>
      <Route path={"/home"} element={loading? <Loading/> : islogin ? <Home user={userdet ? userdet : ""}  lastlogin={lastlogin ? lastlogin : ""} /> : <Signup/>}/>
      <Route path={"/upload"} element={loading? <Loading/> : islogin ?<Upload clg={userdet ? userdet.clg : ""} user={userdet ? userdet : ""} domain={userdet ? userdet.domain :""} name={userdet ? userdet.name:""} /> : <Signup/>}/>
      <Route path={'/project/:id'} element={loading? <Loading/> : islogin ?<Project user={userdet ? userdet : ""}/> : <Signup/>}/>
      <Route path={'/test'} element={<ProfileDropdown/>}/>
      <Route path={'/profile/:username'} element={loading? <Loading/> : islogin ?<Profile selfuser={userdet ? userdet : ""}/> : <Signup/>}/>
      <Route path={'/admin/login'} element={adminloading ? <loading/> : isadminlogin ? <Admin/> : <Adminlogin/>}/>
      <Route path={'/admin'} element={adminloading ? <loading/> : isadminlogin ? <Admin/> : <Adminlogin/>}/>
      <Route path={'/chat'} element={ <Chat/>}/>
      
      </Routes>
  </Router>
  );
}

export default App;
