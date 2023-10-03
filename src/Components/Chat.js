import React, { useState } from "react";
import { RiChatSmile2Fill, RiSendPlaneFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
const Chat = ({username}) => {
    // const URL = "http://localhost:4000"
    const URL = "https://pronect-server.onrender.com";
  const [arr, setarr] = useState([]);
  const [inputstr, setinput] = useState("");
  async function submithandler() {
    if(inputstr.length<20){
        toast.error("provide information first", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
    }else{
        const token = document.cookie
        await axios.post(`${URL}/auth/issue`,{
            inputstr,arr,token
        }).then((res)=>{
            document.getElementById("ans").style.display="flex";
           document.getElementById("input").setAttribute('value',`Hello ${username}`);
        }).catch((error)=>{
            console.log(error)
        })
    }
}
  return (
    <div className="w-screen h-scren ">
      <div className="fixed m-0 p-0 flex flex-col bottom-0 right-4 h-2/3 w-3/12 bg-white rounded-t-2xl">
        <h1 className="bg-blue-500 flex flex-col gap-1 py-4 px-6  rounded-t-2xl">
          <h2 className="text-lg text-white ">Here to help you</h2>
          <h2 className="text-sm text-white ">
            Answer some basic question to let us know your problem
          </h2>
        </h1>
        <div className="mt-4 mx-2 text-lg ">
          <h1 className="flex gap-2">
            <RiChatSmile2Fill className="self-center" /> You have a Complaint or
            suggestion ?
          </h1>
          <div id="cschoose" className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                document.getElementById("cschoose").style.display = "none";
                document.getElementById("complaint").style.display = "flex";
                setarr(["complaint"]);
              }}
              className="border-2 border-slate-800 bg-slate-500 px-4 py-2 text-lg rounded-md "
            >
              Complaint
            </button>
            <button
              onClick={() => {
                document.getElementById("cschoose").style.display = "none";
                document.getElementById("suggestion").style.display = "flex";
                setarr(["suggestion"]);
              }}
              className="border-2 border-slate-800 bg-slate-500 px-4 py-2 text-lg rounded-md "
            >
              Suggestion
            </button>
          </div>
          <div id="complaint" className=" hidden mt-4  flex-col">
            <h1 className="flex gap-2 justify-end">
              Complaint{" "}
              <BsFillPersonFill
                size={26}
                className="self-center border border-black rounded-full p-0.5"
              />
            </h1>
            <h1 className="flex gap-2">
              <RiChatSmile2Fill className="self-center" />
              Your problem regards to which of this issues ?{" "}
            </h1>
            <div id="paochoose" className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => {
                  document.getElementById("paochoose").style.display = "none";
                  setarr(["complaint", "project"]);
                  document.getElementById("userpao").style.display = "flex";
                  document.getElementById("q3").style.display = "flex";
                  document
                    .getElementById("input")
                    .classList.add("cursor-pointer");
                  document.getElementById("input").disabled = false;
                  document.getElementById("input").focus();
                }}
                className="border-2 border-slate-800 bg-slate-500 px-4 py-2 text-lg rounded-md "
              >
                Project
              </button>
              <button
                onClick={() => {
                  document.getElementById("paochoose").style.display = "none";
                  setarr(["complaint", "account"]);
                  document.getElementById("userpao").style.display = "flex";
                  document.getElementById("q3").style.display = "flex";
                  document
                    .getElementById("input")
                    .classList.add("cursor-pointer");
                  document.getElementById("input").disabled = false;
                  document.getElementById("input").focus();
                }}
                className="border-2 border-slate-800 bg-slate-500 px-4 py-2 text-lg rounded-md "
              >
                Account
              </button>
              <button
                onClick={() => {
                  document.getElementById("paochoose").style.display = "none";
                  setarr(["complaint", "other"]);
                  document.getElementById("userpao").style.display = "flex";
                  document.getElementById("q3").style.display = "flex";
                  document
                    .getElementById("input")
                    .classList.add("cursor-pointer");
                  document.getElementById("input").disabled = false;
                  document.getElementById("input").focus();
                }}
                className="border-2 border-slate-800 bg-slate-500 px-4 py-2 text-lg rounded-md "
              >
                Other
              </button>
            </div>
            <h1 id="userpao" className="hidden gap-2 justify-end">
              {arr[1] + " "}
              <BsFillPersonFill
                size={26}
                className="self-center border border-black rounded-full p-0.5"
              />
            </h1>
            <h1 id="q3" className="hidden gap-2">
              <RiChatSmile2Fill className="self-center" />
              okay. Please describe your issue below{" "}
            </h1>
          </div>
          <div id="suggestion" className=" hidden mt-4 flex flex-col">
            <h1 className="flex gap-2 justify-end">
              Suggestion{" "}
              <BsFillPersonFill
                size={26}
                className="self-center border border-black rounded-full p-0.5"
              />
            </h1>
            <h1 className="flex gap-2 w-10/12">
              <RiChatSmile2Fill className="self-center" size={32} /> Thanks for the
              thought. Please choose the suggestion topic below
            </h1>
            <div id="paochoose2" className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => {
                  document.getElementById("paochoose2").style.display = "none";
                  setarr(["suggestion", "project"]);
                  document.getElementById("userpao2").style.display = "flex";
                  document.getElementById("q32").style.display = "flex";
                  document
                    .getElementById("input")
                    .classList.add("cursor-pointer");
                  document.getElementById("input").disabled = false;
                  document.getElementById("input").focus();
                }}
                className="border-2 border-slate-800 bg-slate-500 px-4 py-2 text-lg rounded-md "
              >
                Project
              </button>
              <button
                onClick={() => {
                  document.getElementById("paochoose2").style.display = "none";
                  setarr(["suggestion", "account"]);
                  document.getElementById("userpao2").style.display = "flex";
                  document.getElementById("q32").style.display = "flex";
                  document
                    .getElementById("input")
                    .classList.add("cursor-pointer");
                  document.getElementById("input").disabled = false;
                  document.getElementById("input").focus();
                }}
                className="border-2 border-slate-800 bg-slate-500 px-4 py-2 text-lg rounded-md "
              >
                Account
              </button>
              <button
                onClick={() => {
                  document.getElementById("paochoose2").style.display = "none";
                  setarr(["suggestion", "other"]);
                  document.getElementById("userpao2").style.display = "flex";
                  document.getElementById("q32").style.display = "flex";
                  document
                    .getElementById("input")
                    .classList.add("cursor-pointer");
                  document.getElementById("input").disabled = false;
                  document.getElementById("input").focus();
                }}
                className="border-2 border-slate-800 bg-slate-500 px-4 py-2 text-lg rounded-md "
              >
                Other
              </button>
            </div>
          </div>
          <h1 id="userpao2" className="hidden gap-2 justify-end">
              {arr[1] + " "}
              <BsFillPersonFill
                size={26}
                className="self-center border border-black rounded-full p-0.5"
              />
            </h1>
            <h1 id="q32" className="hidden gap-2">
              <RiChatSmile2Fill className="self-center" />
              okay. Please tell in detail how can we imporove{" "}
            </h1>
        <h1 id="ans" className="hidden gap-2 w-10/12 mt-1">
              <RiChatSmile2Fill className="self-center" size={32} /> Thanks for Feedback. Will reach out to you soon. keep an eye on mail
            </h1>
        </div>
        <div className="absolute bottom-2 mx-2 w-full flex">
          <input
            onChange={(e) => {
              setinput(e.target.value);
            }}
            id="input"
            className="w-10/12 mx-2 border border-slate-400 rounded-md text-lg text-black placeholder-black p-2 py-1 cursor-not-allowed"
            placeholder={"Hello " +username}
            disabled
          ></input>
          <button onClick={()=>{submithandler()}}>
            <RiSendPlaneFill
              size={26}
              className="self-center rounded-full p-0.5  border-black "
            />
          </button>
        
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Chat;
