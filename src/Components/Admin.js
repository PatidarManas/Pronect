import React, { useEffect, useState } from "react";
import logo from "../pronect.png";
import axios from "axios";
import { BsArrowReturnRight } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  // const URL = "http://localhost:4000";
  const URL = "https://pronect-server.onrender.com";
  const history =useNavigate();

  const [users, setusers] = useState();
  const [targetuser, settargetuser] = useState();
  const [tartgetproject, settargetproject] = useState();
  const [projects, setprojects] = useState();
  const [targetnotification, settargetnotification] = useState();
  const [targetlink, settargetlink] = useState();
  const [emailcontent, setemailcontent] = useState();
  const [emailsubject, setemailsubject] = useState();
  async function admincallfunc() {
    await axios.post(`${URL}/admin/details`).then((res) => {
      setusers(res.data.users);
      setprojects(res.data.projects);
    });
  }
  async function userdetilclickhandler(element) {
    settargetuser(element);
    document.getElementById("userdetail").style.display = "flex";
  }
  async function deletehandler(id) {
    await axios
      .post(`${URL}/admin/delete`, {
        id,
      })
      .then((res) => {
        toast.warning("Deleted User", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        alert(error);
      });
  }
  async function notificationcreate(username) {
    await axios
      .post(`${URL}/admin/notificationcreate`, {
        username,
        link: targetlink,
        content: targetnotification,
        islink: targetlink == "" ? false : true,
      })
      .then((res) => {
        toast.success("Notification sent", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        alert(error);
      });
  }
  async function projectdetailhandler(element) {
    settargetproject(element);
    // console.log(element)
    document.getElementById("projectdetail").style.display = "flex";
  }
  async function ownerprofilehandler(username) {
    document.getElementById("projectdetail").style.display = "none";
    document.getElementById("memberdetails").style.display = "none";
    settargetuser(null);
    settargetproject(null);
    document.getElementById("userdetail").style.display = "flex";
    axios
      .post(`${URL}/admin/usersearch`, {
        username,
      })
      .then((res) => {
        settargetuser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function notificationall(){
    document.getElementById("createallbtn").innerHTML="Wait...";
    document.getElementById("createallbtn").disabled = true;
    document.getElementById("createallbtn").style.backgroundColor = "gray";
     for(let index = 0; index < users.length; index++) {

      await axios
      .post(`${URL}/admin/notificationcreate`, {
        username:users[index].username,
        link: targetlink,
        content: targetnotification,
        islink: targetlink == "" ? false : true,
      })
    } 
    settargetlink(null);
    settargetnotification(null);
    toast.success("Notification sent to all", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",

    });
    document.getElementById("allnotify").style.display="none"


  }
  async function gotoprojecthandler(id) {
    document.getElementById("userdetail").style.display = "none";
    settargetproject(null);
    settargetuser(null);
    document.getElementById("projectdetail").style.display = "flex";

    await axios
      .post(`${URL}/admin/searchproject`, {
        id,
      })
      .then((res) => {
        settargetproject(res.data);
      });
  }
  async function sendmail(mail){
    document.getElementById("singlemailbtn").innerHTML="wait...";
    document.getElementById("singlemailbtn").disabled=true;
    document.getElementById("singlemailbtn").style.backgroundColor="gray";

    axios.post(`${URL}/admin/sendmail`,{
      mail,subject:emailsubject,content:emailcontent
    }).then((res)=>{
      toast.success("Email sent", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
  
      });

      document.getElementById("emailsingle").style.display="none";
      setemailcontent(null);
      setemailsubject(null);
    }).catch((error)=>{
      console.log(error);
    })
  }
  async function sendmailtoall(){
    for(var i=0;i<users.length;i++){
      axios.post(`${URL}/admin/sendmail`,{
        mail:users[i].email,subject:emailsubject,content:emailcontent
      }).catch((error)=>{
        console.log(error);
      })
    }
    toast.success("Email sent to all", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",

    });
    document.getElementById("emailall").style.display="none"
    setemailcontent(null);
    setemailsubject(null);
  }

  async function logouthandler(){
    document.cookie = "admintoken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        history("../../../")
        window.location.reload();
  }

  useEffect(() => {
    admincallfunc();
  }, []);

  return (
    <>
      <div
        id="header"
        className="flex px-10 py-2 mt-2  justify-between border-b-2 border-gray-400"
      >
        <a href="../../../" className="cursor-pointer "><img src={logo} className="h-10"></img></a>
        <button id="dashboard-btn" onClick={()=>{document.getElementById("users").style.display="none"
        document.getElementById("users-btn").classList.remove("underline")
        document.getElementById("projects").style.display="none"
        document.getElementById("projects-btn").classList.remove("underline")
        document.getElementById("dashboard").style.display="flex"
        document.getElementById("dashboard-btn").classList.add("underline")

        }} className="self-center text-lg font-medium text-white underline">
          Dashboard
        </button>
        <button id="users-btn" onClick={()=>{document.getElementById("users").style.display="flex"
        document.getElementById("users-btn").classList.add("underline")
        document.getElementById("projects").style.display="none"
        document.getElementById("projects-btn").classList.remove("underline")
        document.getElementById("dashboard").style.display="none"
        document.getElementById("dashboard-btn").classList.remove("underline")

        }} className="self-center text-lg font-medium text-white">
          Users
        </button>
        <button id="projects-btn" onClick={()=>{document.getElementById("users").style.display="none"
        document.getElementById("users-btn").classList.remove("underline")
        document.getElementById("projects").style.display="flex"
        document.getElementById("projects-btn").classList.add("underline")
        document.getElementById("dashboard").style.display="none"
        document.getElementById("dashboard-btn").classList.remove("underline")

        }}  className="self-center text-lg font-medium text-white">
          Projects
        </button>
        <button className="self-center text-lg font-medium text-white cursor-not-allowed" >
          Institutes & Domains
        </button>
        <button onClick={()=>{logouthandler()}} className="self-center text-lg font-medium text-red-400">
          Logout
        </button>
      </div>
      <div
        id="allnotify"
        className="hidden w-screen h-full top-0 fixed backdrop-blur-sm z-40  justify-center items-center"
      >
        <div className="flex flex-col items-center w-5/12 p-10 bg-white rounded-lg text-base gap-1">
          <h1 className="text-xl font-medium ">Send Notification to all users</h1>
          <input onChange={(e)=>{settargetnotification(e.target.value)}} className="w-11/12 placeholder-black text-lg border border-black rounded-md my-2 p-2" placeholder="Notification here"></input>
          <input onChange={(e)=>{settargetlink(e.target.value)}} className="w-11/12 placeholder-black text-lg border border-black rounded-md my-2 p-2" placeholder="Link here"></input>
          <div className="flex justify-center gap-2">

          <button id="createallbtn" onClick={()=>{notificationall()}} className="w-fit mt-4 self-center px-4 py-2 bg-blue-500 text-lg rounded-md text-white border border-slate-700">Create</button>
          <button id="" onClick={()=>{document.getElementById("allnotify").style.display="none"}} className="w-fit mt-4 self-center px-4 py-2 text-black text-lg rounded-md border border-slate-700">Close</button>
          </div>
        </div>
      </div>
      <div id="dashboard" className="flex  flex-col px-20 py-6 text-white">
      <div
              id="emailall"
              className="hidden w-screen h-full top-0 left-0 fixed backdrop-blur-sm backdrop-brightness-75 z-40  justify-center items-center"
            >
              <div className="flex flex-col w-1/2 bg-white rounded-lg p-6">
                <h1 className="mb-10 self-center text-2xl font-light text-black" >Send Mail to All</h1>
                <input onChange={(e)=>{setemailsubject(e.target.value)}} className="text-black placeholder-black text-xl font-thin font-mono border border-slate-400 rounded-lg p-2 focus:outline-none" placeholder="Subject"></input>
                <textarea onChange={(e)=>{setemailcontent(e.target.value)}} className="h-44 mt-6 text-black placeholder-black text-xl font-thin font-mono border border-slate-400 rounded-lg p-2 focus:outline-none" placeholder="Mail content"/>
                <div className="flex gap-2 justify-center mt-6">
                    <button onClick={()=>{document.getElementById("emailall").style.display="none"}} className="border border-gray-400 rounded-lg p-2 px-4 text-black text-lg" >Cancel</button>
                    <button type="submit" id="allemailbtn" onClick={()=>{sendmailtoall()}} className="border border-gray-400 bg-blue-500 rounded-lg p-2 px-4 text-white text-lg hover:bg-blue-600 " >Send Mail</button>
                </div>

               </div>
            </div>
        <div className="flex justify-around ">
          <div className="w-1/5  h-24 border-2 border-l-4 border-gray-600 rounded-lg border-l-green-400 flex flex-col justify-center items-center">
            <h1 className="font-bold text-5xl">{users ? users.length : "loading"}</h1>
            <h2 className="font-light text-xl">Users</h2>
          </div>
          <div className="w-1/5  h-24 border-2 border-l-4 border-gray-600 rounded-lg border-l-red-400 flex flex-col justify-center items-center">
            <h1 className="font-bold text-5xl">{projects ? projects.length :"loading"}</h1>
            <h2 className="font-light text-xl">Projects</h2>
          </div>
          <div className="w-1/5  h-24 border-2 border-l-4 border-gray-600 rounded-lg border-l-yellow-400 flex flex-col justify-center items-center">
            <h1 className="font-bold text-5xl">50*</h1>
            <h2 className="font-light text-xl">Logins today</h2>
          </div>
          <div className="w-1/5  h-24 border-2 border-l-4 border-gray-600 rounded-lg border-l-slate-400 flex flex-col justify-center items-center">
            <h1 className="font-bold text-5xl"> 200*</h1>
            <h2 className="font-light text-xl">Project Interactions</h2>
          </div>
        </div>
        <div className="flex px-10 mt-6 gap-4">
          <button onClick={()=>{document.getElementById("emailall").style.display="flex"}} className="text-xl font-serif border-2 border-blue-400 rounded-md font-light px-4 py-2 ">
            Mail all Users
          </button>
          <button onClick={()=>{document.getElementById("allnotify").style.display="flex"}} className="text-xl font-serif  border-slate-400 rounded-md font-light px-4 py-2 bg-blue-500">
            Notify all Users
          </button>
        </div>
        <div className="flex px-10 py-10 gap-8">
          <div className="w-1/2 flex flex-col border border-gray-400 rounded-lg px-6 py-10">
            <h1 className="text-3xl font-semibold underline underline-offset-8 mb-6">
              Top Projects
            </h1>
            <a className="leadin-1 text-xl font-light py-2">Title 1</a>
            <a className="leadin-1 text-xl font-light py-2">Title 1</a>
            <a className="leadin-1 text-xl font-light py-2">Title 1</a>
            <a className="leadin-1 text-xl font-light py-2">Title 1</a>
          </div>
          <div className="w-1/2 flex flex-col border border-gray-400 rounded-lg px-6 py-10">
            <h1 className="text-3xl font-semibold underline underline-offset-8 mb-6">
              Complaints
            </h1>
            <a className="leadin-1 text-xl font-light py-2">Title 1</a>
            <a className="leadin-1 text-xl font-light py-2">Title 1</a>
            <a className="leadin-1 text-xl font-light py-2">Title 1</a>
            <a className="leadin-1 text-xl font-light py-2">Title 1</a>
          </div>
        </div>
      </div>

      <div id="users" className="hidden  flex-col px-20 py-6 text-white">
        <div className="flex gap-2 text-2xl font-normal mb-6">
          <h1 className="flex w-1/6 ">S.no</h1>
          <h1 className="flex w-1/6 ">Name/Username</h1>
          <h1 className="flex w-1/6 ">College/Domain</h1>
          <h1 className="flex w-1/6 ">Ranking Points</h1>
          <h1 className="flex w-1/6 ">Account Status</h1>
          <h1 className="flex w-1/6 ">More/Action</h1>
        </div>
        {users ? (
          users.map((element, index) => {
            return (
              <div className="flex gap-2 text-xl font-light my-2">
                <h1 className="flex w-1/6 ">{index + 1}</h1>
                <h1 className="flex w-1/6 ">
                  {element.name + "/" + element.username}
                </h1>
                <h1 className="flex w-1/6 ">
                  {element.clg + "/" + element.domain}
                </h1>
                <h1 className="flex w-1/6 ">{element.rp}🔥</h1>
                <h1 className="flex w-1/6  text-green-400">Active</h1>
                <button
                  onClick={() => {
                    userdetilclickhandler(element);
                  }}
                  className="flex w-1/6 self-center border text-lg rounded-lg py-1 px-4 border-gray-400 w-fit"
                >
                  Click
                </button>
              </div>
            );
          })
        ) : (
          <>Loading....</>
        )}
      </div>
      <div
        id="userdetail"
        className="hidden w-screen h-full top-0 fixed backdrop-blur-sm z-40  justify-center items-center"
      >
        {targetuser ? (
          <div className="flex flex-col w-1/2 p-10 bg-white rounded-lg text-base gap-1">
            <h1>Name - {targetuser.name}</h1>
            <h1>Username - {targetuser.username} </h1>
            <h1>Email - {targetuser.email} </h1>
            <h1>
              College / domain - {targetuser.clg + " / " + targetuser.domain}
            </h1>
            <h1>Ranking Points - {targetuser.rp} 🔥</h1>
            <h1>Last Login - {targetuser.lastlogin} </h1>
            <h1>Account since - {targetuser.createdAt}</h1>
            <h1>Projects - ({targetuser.projects.length})</h1>
            <div className="flex ml-4 flex-col gap-2">
              {targetuser.projects.map((element) => {
                return (
                  <button
                    id={element[0] + "goto"}
                    onClick={() => {
                      gotoprojecthandler(element[0]);
                    }}
                    className="flex gap-1 cursor-pointer"
                  >
                    <BsArrowReturnRight className="self-center" />
                    {element[1]}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between">
              <div className="flex  gap-2 mt-2">
                <button
                  onClick={() => {document.getElementById("emailsingle").style.display="flex"}}
                  className="px-4 py-2 border border-gray-400 rounded-md w-fit text-blue-400 font-medium"
                >
                  Send Mail
                </button>
                <button
                  onClick={() => {
                    document.getElementById(
                      "notificationcreate"
                    ).style.display = "flex";
                  }}
                  className="px-4 py-2 border rounded-md w-fit bg-blue-600 text-white"
                >
                  Send Notification
                </button>
              </div>
              <div className="flex  gap-2">
                <button
                  onClick={() => {
                    document.getElementById("userdetail").style.display =
                      "none";
                    settargetuser(null);
                  }}
                  className="px-4 py-2 border border-gray-400 rounded-md w-fit text-red-400 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    deletehandler(targetuser._id);
                  }}
                  className="px-4 py-2 border rounded-md w-fit bg-red-600 text-white"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
            <div
              id="notificationcreate"
              className="hidden w-screen h-full top-0 left-0 fixed backdrop-blur-sm backdrop-brightness-75 z-40  justify-center items-center"
            >
              <div className="bg-slate-300 w-1/2 h-fit justify-center flex flex-col gap-6 rounded-lg p-6 ">
                <h1 className="text-2xl">
                  Create a Notification for {targetuser.username}
                </h1>
                <input
                  onChange={(e) => {
                    settargetnotification(e.target.value);
                  }}
                  class="mt-2 text-md flex h-12 w-full items-center justify-center placeholder-black rounded-xl border bg-white/0 p-3  outline-none border-black"
                  placeholder="Notification detail here"
                />
                <input
                  onChange={(e) => {
                    settargetlink(e.target.value);
                  }}
                  class="mt-2 flex h-12 w-full items-center justify-center placeholder-black rounded-xl border bg-white/0 p-3 text-md outline-none border-black"
                  placeholder="Link here"
                />
                <div className="flex gap-2 w-full justify-center">
                  <button
                    onClick={() => {
                      document.getElementById(
                        "notificationcreate"
                      ).style.display = "none";
                    }}
                    className="px-4 py-2 border border-gray-400 rounded-md w-fit text-red-400 font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      notificationcreate(targetuser.username);
                    }}
                    className="bg-white w-fit p-2 text-lg px-4 rounded-lg self-center"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
            <div
              id="emailsingle"
              className="hidden w-screen h-full top-0 left-0 fixed backdrop-blur-sm backdrop-brightness-75 z-40  justify-center items-center"
            >
              <div className="flex flex-col w-1/2 bg-white rounded-lg p-6">
                <h1 className="mb-10 self-center text-2xl font-light" >Send Mail to {targetuser.name}</h1>
                <input onChange={(e)=>{setemailsubject(e.target.value)}} className="test-black placeholder-black text-xl font-thin font-mono border border-slate-400 rounded-lg p-2 focus:outline-none" placeholder="Subject"></input>
                <textarea onChange={(e)=>{setemailcontent(e.target.value)}} className="h-44 mt-6 test-black placeholder-black text-xl font-thin font-mono border border-slate-400 rounded-lg p-2 focus:outline-none" placeholder="Mail content"/>
                <div className="flex gap-2 justify-center mt-6">
                    <button onClick={()=>{document.getElementById("emailsingle").style.display="none"}} className="border border-gray-400 rounded-lg p-2 px-4 text-black text-lg" >Cancel</button>
                    <button type="submit" id="singlemailbtn" onClick={()=>{sendmail(targetuser.email)}} className="border border-gray-400 bg-blue-500 rounded-lg p-2 px-4 text-white text-lg hover:bg-blue-600 " >Send Mail</button>
                </div>

               </div>
            </div>
          </div>
        ) : (
          <>Loading</>
        )}
      </div>
      <div id="projects" className="hidden flex flex-col px-20 py-6 text-white">
        <div className="flex gap-2 text-2xl font-normal mb-6">
          <h1 className="flex w-2/12 ">S.no / Domain</h1>
          <h1 className="flex w-4/12 ">Title</h1>
          <h1 className="flex w-2/12 ">Owner(Members)</h1>
          <h1 className="flex w-1/12 ">Likes</h1>
          <h1 className="flex w-1/12 ">Visibility</h1>
          <h1 className="flex w-2/12 ">More/Action</h1>
        </div>
        {projects ? (
          projects.map((element, index) => {
            return (
              <div className="flex gap-2 text-xl font-light my-2">
                <h1 className="flex w-2/12 ">
                  {index + 1 + " / " + element.domain}
                </h1>
                <h1 className="flex w-4/12 ">{element.title}</h1>
                <h1 className="flex w-2/12 ">
                  {element.username + " (" + element.members.length + ")"}
                </h1>
                <h1 className="flex w-1/12 ">{element.likes.length}</h1>
                {element.visiblity ? (
                  <h1 className="flex w-1/12  text-green-400">Public</h1>
                ) : (
                  <h1 className="flex w-1/12  text-red-400">Private</h1>
                )}
                <button
                  onClick={() => {
                    projectdetailhandler(element);
                  }}
                  className="flex w-2/12 self-center border text-lg rounded-lg py-1 px-4 border-gray-400 w-fit"
                >
                  Click
                </button>
              </div>
            );
          })
        ) : (
          <>Loading....</>
        )}
      </div>
      <div
        id="projectdetail"
        className="hidden w-screen h-full top-0 fixed backdrop-blur-sm z-40  justify-center items-center"
      >
        {tartgetproject ? (
          <div className="flex flex-col w-1/2 p-10 bg-white rounded-lg text-base gap-1">
            <h1>
              User - {tartgetproject.name + " / " + tartgetproject.username}{" "}
            </h1>
            <h1>
              College / domain -{" "}
              {tartgetproject.clg + " / " + tartgetproject.domain}
            </h1>
            <h1>Title - {tartgetproject.title}</h1>
            <p>Discription - {tartgetproject.discription}</p>
            <h1 className="flex gap-2">
              Visibility -{" "}
              {tartgetproject.visiblity ? (
                <h1 className="flex w-1/12  text-green-400">Public</h1>
              ) : (
                <h1 className="flex w-1/12  text-red-400">Private</h1>
              )}
            </h1>
            <h1>Likes - {tartgetproject.likes.length} </h1>
            <h1>
              Links -
              {tartgetproject.links.map((element) => {
                <a className="flex gap-1 cursor-pointer">
                  <BsArrowReturnRight className="self-center" />{" "}
                  {element[0] + " :- " + element[1]}
                </a>;
              })}
            </h1>

            <h1>Project Created on - {tartgetproject.createdAt}</h1>

            <div className="flex justify-between">
              <div className="flex  gap-2 mt-2">
                <button
                  onClick={() => {
                    document.getElementById("memberdetails").style.display =
                      "flex";
                  }}
                  className="px-4 py-2 border border-gray-400 rounded-md w-fit text-blue-400 font-medium"
                >
                  See Members
                </button>
                <button
                  id={tartgetproject.username + "owner"}
                  onClick={() => {
                    ownerprofilehandler(tartgetproject.username);
                  }}
                  className="px-4 py-2 border rounded-md w-fit bg-blue-600 text-white"
                >
                  Owner Profile
                </button>
              </div>
              <div className="flex  gap-2">
                <button
                  onClick={() => {
                    document.getElementById("projectdetail").style.display =
                      "none";
                    settargetproject(null);
                  }}
                  className="px-4 py-2 border border-gray-400 rounded-md w-fit text-red-400 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    deletehandler(targetuser._id);
                  }}
                  className="px-4 py-2 border rounded-md w-fit bg-red-600 text-white"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
            <div
              id="memberdetails"
              className="hidden w-screen h-full top-0 left-0 fixed backdrop-blur-sm backdrop-brightness-75 z-40  justify-center items-center"
            >
              <div className="bg-white w-1/3 h-fit justify-center flex flex-col  rounded-lg p-6 ">
                <h1 className="text-2xl mb-4">Members under Project {}</h1>
                {tartgetproject.members.length > 0 ? (
                  tartgetproject.members.map((element, index) => {
                    return (
                      <button
                        id={tartgetproject.username + "owner"}
                        className="self-start text-xl py-1 text-"
                        onClick={() => {
                          ownerprofilehandler(element[0]);
                        }}
                      >
                        {index + 1 + ") " + element[0] + " / " + element[1]}
                      </button>
                    );
                  })
                ) : (
                  <h1 className="self-start text-lg font-serif">
                    No members in project
                  </h1>
                )}
                <button
                  onClick={() => {
                    document.getElementById("memberdetails").style.display =
                      "none";
                  }}
                  className="px-4 py-2 mt-4 border border-gray-400 text-lg self-center rounded-md w-fit text-red-400 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>Loading</>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Admin;
