import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Location } from 'react-router-dom';
const Signup = () => {
    // const URL = "http://localhost:4000"
    const URL = "https://pronect-server.onrender.com";
    const history = useNavigate();
    const visible = window.screen.width >= "765" ? true : false;

    const [name, setname] = useState();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [newusername, setnewusername] = useState("");
    const [newemail, setnewemail] = useState("");
    const [clg, setclg] = useState("PIET");
    const [domain, setdomain] = useState("Software");
    function gototsignin() {
        document.getElementById("signup").style.display = "none"
        document.getElementById("signin").style.display = "flex"
    }
    function gototsignup() {
        document.getElementById("signin").style.display = "none"
        document.getElementById("signup").style.display = "flex"
    }
    function namecontinuehandler() {
        document.getElementById("i1").style.display = "none";
        document.getElementById("b1").style.display = "none";
        document.getElementById("r1").style.display = "flex";
        document.getElementById("i2").style.display = "flex";
        document.getElementById("b2").style.display = "flex";

    }

    async function usernamecontinue() {
        if (newusername) {
            newusername.toLowerCase();
            await axios.post(`${URL}/auth/usernamevalid`, {
                username: newusername
            }).then((res) => {
                if (res.status == "200") {
                    document.getElementById("i2").style.display = "none";
                    document.getElementById("b2").style.display = "none";
                    document.getElementById("r2").style.display = "flex";
                    document.getElementById("i3").style.display = "flex";
                    document.getElementById("b3").style.display = "flex";
                }
                else if (res.status == "202") {
                    toast.error("Username already exists", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    document.getElementById("i2").focus();
                }
            })
        }
        else {
            toast.error("Username can't be blank", {
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
    }

    async function emailcontinue() {
        if (String(newemail)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            await axios.post(`${URL}/auth/emailvalid`, {
                email: newemail
            }).then((res) => {

                if (res.status == "200") {
                    document.getElementById("i3").style.display = "none";
                    document.getElementById("b3").style.display = "none";
                    document.getElementById("r3").style.display = "flex";
                    document.getElementById("i4").style.display = "flex";
                    document.getElementById("b4").style.display = "flex";
                }
                else if (res.status == "202") {
                    toast.error("Username already exists", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    document.getElementById("i2").focus();
                }
            })
        }
        else {
            toast.error("Username can't be blank", {
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
    }
    async function clgcontinue() {
        document.getElementById("i4").style.display = "none";
        document.getElementById("b4").style.display = "none";
        document.getElementById("r4").style.display = "flex";
        document.getElementById("i5").style.display = "flex";
        document.getElementById("b5").style.display = "flex";
    }
    async function domaincontinue() {
        document.getElementById("i5").style.display = "none";
        document.getElementById("b5").style.display = "none";
        document.getElementById("r5").style.display = "flex";
        document.getElementById("i6").style.display = "flex";
        document.getElementById("signupbtn").style.display = "flex";
        document.getElementById("signupbtn").disabled = false;
    }
    async function longinhandler(e) {
        e.preventDefault();
        document.getElementById("signinbtn").innerHTML = "Wait..."
        document.getElementById("signinbtn").style.backgroundColor = "gray"
        document.getElementById("signinbtn").disabled ="true"
        
        if (String(username).toLowerCase() && password.length > "7") {
            await axios.post(`${URL}/auth/login`, {
                username: username, password: password
            }).then((res) => {
                if (res.status == 200) {
                    console.log(res.data)
                    document.cookie = `token=${res.data}`
                    history("../home", { replace: true });
                    toast.success('Login Successful', {
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
                else if (res.status == 202) {
                    document.getElementById("signinbtn").innerHTML = "Submit"
                    document.getElementById("signinbtn").style.backgroundColor = "blue"
                    document.getElementById("signinbtn").disabled =false
                    toast.error('Invalid Username or Password', {
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
            }).catch((error) => {
                toast.error(error, {
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
        }else{
            toast.error("Invalid Username or Password", {
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
    }
    async function registerhandler(e) {
        console.log("skds")
        e.preventDefault();
        document.getElementById("signupbtn").innerHTML = "Wait..."
        document.getElementById("signupbtn").style.backgroundColor = "gray"
        document.getElementById("signupbtn").disabled =true
       
        if (newpassword.length > "7") {
            await axios.post(`${URL}/auth/register`, {
                newusername, newpassword, clg, domain, name, newemail
            }).then((res) => {
                toast.success('Created Successful! Login to continue', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                // history("/");
            }).catch((error) => {
                
        document.getElementById("signupbtn").innerHTML = "Submit"
        document.getElementById("signupbtn").style.backgroundColor = "blue"
        document.getElementById("signupbtn").disabled =false
                toast.error(error, {
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
        }

    }
    return (
        <>
        { visible ? 
        <><section style={{backgroundColor:"#352F44"}} className="h-screen	">
            <div className="container h-full px-4 py-4">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-around">



                    <section>

                        <div id='signin' className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                                {/* <img class="w-48 mr-2" src={logo} alt="logo" /> */}

                            </a>

                            <div   class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                        Sign in to your account
                                    </h1>
                                    <div class="space-y-4 md:space-y-6" action="#">

                                        <div class="relative mb-2" data-te-input-wrapper-init>
                                            <label id='label1' for="exampleFormControlInput2">Username</label>
                                            <input type="text"

                                                class="border border-stone-400 peer block min-h-[auto] w-full rounded bg-gray-50 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                                [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                id="exampleFormControlInput2" placeholder="Email address" onChange={(e) => setusername(e.target.value)} />
                                        </div>


                                        <div class="relative mb-6" data-te-input-wrapper-init>
                                            <label id='label2' for="exampleFormControlInput22">Password</label>
                                            <input type="password"
                                                class="border border-stone-400 peer block min-h-[auto] w-full rounded bg-gray-50 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                id="exampleFormControlInput22" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
                                        </div>





                                        <button  id='signinbtn' onClick={(e) => longinhandler(e)}
                                            class="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
                                        <p class="text-sm font-light text-gray-500 ">

                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="pt-0 ml-48 space-x-0 ">
                                <button type="button" onClick={gototsignin}
                                    class=" bg-gray-300 rounded-bl-lg cursor-not-allowed font-medium  text-sm px-5 py-2.5 text-center"
                                    disabled>Sign In</button>
                                <button type="button" onClick={gototsignup}
                                    class="text-white  rounded-br-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 mr-0 mb-2  focus:outline-none " >Sign
                                    Up</button>

                            </div>
                        </div>



                        <div id='signup' class="hidden flex flex-col items-center justify-center  py-8 mx-auto md:h-screen lg:py-0  ">



                            <div class="w-96 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                        Sign-Up for New account
                                    </h1>
                                    <form class="flex flex-col space-y-4 md:space-y-6" action="#">

                                        <div id='i1'>
                                            <label for="first_name"
                                                class="w-1/6 mb-2 text-sm font-medium text-gray-900 ">Name : </label>
                                            <input type="text" id="ii1" onChange={(e) => setname(e.target.value)}
                                                class="w-5/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 "
                                                placeholder="John" required />
                                        </div>
                                        <button id='b1' type="button" onClick={namecontinuehandler}
                                            class="w-24  self-end rounded-lg text-blue-900 border-2 border-blue-900  focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Continue</button>


                                        <div id='r1' className='hidden flex justify-between'>
                                            <div class="flex items-center space-x-3">

                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-semibold text-gray-900 truncate ">
                                                        Name : <span class="text-sm text-gray-500 truncate ">{name}</span>
                                                    </p>

                                                </div>
                                                <span
                                                    class=" inline-flex items-center self-end bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                                                    <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                                    Done
                                                </span>
                                            </div>
                                        </div>
                                        <div id='i2' className='hidden flex gap-2 '>
                                            <label for="first_name"
                                                class="self-center mb-2 text-sm font-medium text-gray-900 ">Username : </label>
                                            <input type="text" id="ii2" onChange={(e) => setnewusername(e.target.value)}
                                                class="w-4/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 "
                                                placeholder="John" required />
                                        </div>
                                        <button id='b2' type="button" onClick={usernamecontinue}
                                            class="hidden w-24  self-end rounded-lg text-blue-900 border-2 border-blue-900  focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Continue</button>


                                        <div id='r2' className='hidden flex justify-between'>
                                            <div class="flex items-center space-x-3">

                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-semibold text-gray-900 truncate ">
                                                        Username : <span class="text-sm text-gray-500 truncate ">{newusername}</span>
                                                    </p>

                                                </div>
                                                <span
                                                    class=" inline-flex items-center self-end bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                                                    <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                                    Available
                                                </span>
                                            </div>
                                        </div>
                                        <div id='i3' className='hidden flex gap-2 '>
                                            <label for="first_name"
                                                class="self-center mb-2 text-sm font-medium text-gray-900 ">Email id : </label>
                                            <input type="text" id="ii3" onChange={(e) => setnewemail(e.target.value)}
                                                class="w-4/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 "
                                                placeholder="John" required />
                                        </div>
                                        <button id='b3' type="button" onClick={emailcontinue}
                                            class="hidden w-24  self-end rounded-lg text-blue-900 border-2 border-blue-900  focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Continue</button>


                                        <div id='r3' className='hidden flex justify-between'>
                                            <div class="flex items-center space-x-3">

                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-semibold text-gray-900 truncate ">
                                                        Email-id : <span class="text-sm text-gray-500 truncate ">{newemail}</span>
                                                    </p>

                                                </div>
                                                <span
                                                    class=" inline-flex items-center self-end bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                                                    <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                                    Available
                                                </span>
                                            </div>
                                        </div>
                                        <div id='i4' className='hidden flex gap-2 '>
                                            <label for="first_name"
                                                class="self-center mb-2 text-sm font-medium text-gray-900 ">College : </label>

                                            <select onChange={(e) => setclg(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="PIET">PIET</option>
                                                <option value="PIT">PIT</option>
                                                <option value="PIMS">PIMS</option>
                                                <option value="PIET-DTD">PIET-DTD</option>
                                                <option value="PHMS">PHMS</option>
                                            </select>
                                        </div>
                                        <button id='b4' type="button" onClick={clgcontinue}
                                            class="hidden w-24  self-end rounded-lg text-blue-900 border-2 border-blue-900  focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Continue</button>


                                        <div id='r4' className='hidden flex justify-between'>
                                            <div class="flex items-center space-x-3">

                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-semibold text-gray-900 truncate ">
                                                        College : <span class="text-sm text-gray-500 truncate ">{clg}</span>
                                                    </p>

                                                </div>
                                                <span
                                                    class=" inline-flex items-center self-end bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                                                    <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                                    Done
                                                </span>
                                            </div>
                                        </div>
                                        <div id='i5' className='hidden flex gap-2 '>
                                            <label for="first_name"
                                                class="self-center mb-2 text-sm font-medium text-gray-900 ">Domain : </label>

                                            <select onChange={(e) => setdomain(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="Software">Software</option>
                                                <option value="Civil">Civil</option>
                                                <option value="Financial">Financial</option>
                                                <option value="Management">Management</option>
                                                <option value="Ai/Ml">Ai/Ml</option>
                                                <option value="Architecture">Architecture</option>
                                                <option value="Mechanical">Mechanical</option>
                                            </select>
                                        </div>
                                        <button id='b5' type="button" onClick={domaincontinue}
                                            class="hidden w-24  self-end rounded-lg text-blue-900 border-2 border-blue-900  focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Continue</button>


                                        <div id='r5' className='hidden flex justify-between'>
                                            <div class="flex items-center space-x-3">

                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-semibold text-gray-900 truncate ">
                                                        Domain : <span class="text-sm text-gray-500 truncate ">{domain}</span>
                                                    </p>

                                                </div>
                                                <span
                                                    class=" inline-flex items-center self-end bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                                                    <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                                    Done
                                                </span>
                                            </div>
                                        </div>
                                        <div id='i6' className='hidden flex gap-2 '>
                                            <label for="first_name"
                                                class="self-center mb-2 text-sm font-medium text-gray-900 ">Password : </label>
                                            <input type="password" id="ii3" onChange={(e) => setnewpassword(e.target.value)}
                                                class="w-4/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 "
                                                placeholder="*********" required />
                                        </div>
                                        <button id='signupbtn' type="button" onClick={(e) => registerhandler(e)}
                                            class="hidden w-24 bg-blue-500 self-center rounded-lg text-white border-2 border-blue-900  focus:ring-4 focus:ring-blue-300 font-semibold px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Submit</button>



                                    </form>
                                </div>
                            </div>
                            <div class="pt-0 ml-48 space-x-0 ">
                                <button type="button" onClick={gototsignin}
                                    class="text-white rounded-bl-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 mr-0 mb-2  focus:outline-none " >Sign
                                    In</button>
                                <button type="button" onClick={gototsignup}
                                    class=" bg-gray-300 rounded-br-lg cursor-not-allowed font-medium  text-sm px-5 py-2.5 text-center"
                                    disabled>Sign Up</button>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className='fixed top-10 right-10'>
                <a href='../../../admin/login' className='text-white text-xl font-mono border border-slate-400 p-2'>Admin Login</a>
            </div>
        </section>
            <ToastContainer />
        </> : <div className='self-center mx-auto text-2xl font-semibold p-4'>Currently Platform is unavailable for this screen size please use platform on a device with atleast 770 screen width </div> }</> 

    )
}

export default Signup;