import React, { useState } from "react";
import logo from "../pronect.png";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Adminlogin = () => {
  // const URL = "http://localhost:4000";
  const URL = "https://pronect-server.onrender.com";
  const history = useNavigate();

  const [password, setpassword] = useState("");
  async function handlesubmit() {
    document.getElementById("loginbtn").innerHTML="Wait..."
    document.getElementById("loginbtn").style.backgroundColor="gray"
    document.getElementById("loginbtn").disabled=true;
    await axios
      .post(`${URL}/admin/login`, {
        password,
      })
      .then((res) => {
        if(res.status==200){
        document.cookie = `admintoken=${res.data}`;
        history("../admin", { replace: true });
        toast.success("Security key validated", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        window.location.reload();
      }
      else if(res.status==202){
        toast.error("Security key Invalid", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      });
  }
  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img src={logo} className="h-14" />
          </a>
          <div class="w-1/3 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold text-black leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Welcome Admin
              </h1>
          
                <div className="flex flex-col justify-center">
                  <label
                    for="password"
                    class="block text-black mb-2 text-sm font-medium text-gray-900 "
                  >
                    Verify its you
                  </label>
                  <input
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Security key"
                    class=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                    autoFocus
                  />

                <button
                id="loginbtn"
                  onClick={(e) => {
                    handlesubmit(e);
                  }}
                  type="submit"
                  class="w-fit mt-6  mx-auto self-center text-white text- bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                >
                  Sign in
                </button>
                </div>
           
            </div>
          </div>
        </div>
        <div className='fixed top-10 right-10'>
                <a href='../../../signup' className='text-white text-xl font-mono border border-slate-400 p-2'>User Login</a>
            </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Adminlogin;
