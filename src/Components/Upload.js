import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdPublic } from "react-icons/md"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLink, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai"
import { BsFillPersonFill } from "react-icons/bs"
import { RiGitRepositoryPrivateFill } from "react-icons/ri"
import Header from './Header';
import { useNavigate } from 'react-router-dom';
const Upload = ({ clg, name, domain,user }) => {
    // console.log(clg)
    // const URL = "http://localhost:4000"
    const URL = "https://pronect-server.onrender.com";
    const history = useNavigate();
    const [title, settitle] = useState("");
    const [disc, setdisc] = useState("");
    const [visiblity, setvisiblity] = useState(true);
    const [links, setlinks] = useState([]);
    const [members, setmembers] = useState([]);
    const [type, settype] = useState("Youtube");
    const [link, setlink] = useState("");
    const [username, setusername] = useState("");
    function addhandler(e) {
        e.preventDefault();
        var a = [type, link];
        setlinks([...links, a]);
        setlink("");
        settype("");
        document.getElementById("link").value = "";
        document.getElementById("type").value = "";
        console.log(links)
    }
    async function addmemberhandler(e) {
        console.log("mm")
        e.preventDefault();
        var check = true;
        if (check) {
            await axios.post(`${URL}/auth/searchuser`, {
                username
            }).then((res) => {
                if (res.status == 200) {

                    var b = [res.data.username, res.data.name];
                    setmembers([...members, b]);

                } else if (res.status == 202) {
                    toast.error("Username does'nt exist", {
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
                alert(error);
            })
        } else {
            toast.warning("Username already added", {
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
    function reviewhandler() {
        document.getElementById("upload").style.display = "none"
        document.getElementById("review").style.display = "block"
    }
    function edithandler() {
        document.getElementById("upload").style.display = "block"
        document.getElementById("review").style.display = "none"
    }
    async function uploadhandler(e) {
        e.preventDefault();
        if (title.length < "10") {
            toast.error("Title is short", {
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
        else if (disc.length < "100") {
            toast.error("Discription is short", {
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
        else {
            const token = document.cookie
            await axios.post(`${URL}/project/new`, {
                title, disc, visiblity, links, members, token
            }).then((res) => {
                toast.success("Uploaded Succesfull", {
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
                    history("/home");
                    window.location.reload()
                }, 2000);
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
        }
    }
    // console.log(user)

    useEffect(() => {

    }, [links])

    return (
        <>
            
            <div className='flex min-h-screen  bg-transperent flex justify-center'>
                
                <div id='upload' style={{ backgroundColor: "#EEEEEE" }} className=' w-8/12  h-max my-10 p-6 rounded-lg '>
                    <div className='mb-6 font-light text-2xl'>Upload your project</div>
                    <div id='s1' className='flex flex-col'>
                        <div className='flex gap-2 font-semibold'> Institute: <div className='text-stone-500'>{clg}</div></div>
                        <div className='flex gap-2 font-semibold'> Owner: <div className='text-stone-500'>{name}</div></div>
                        <div className='flex gap-2 font-semibold'> Domain: <div className='text-stone-500'>{domain}</div></div>
                        <div className='text-red-400 text-sm'>*This detail can be edited by profile edit</div>
                        <div className='mt-4'>
                            <div className='flex gap-2'>
                                <label for="first_name" class="flex w-24 font-semibold text-gray-900 gap-4 align-middle	"><div className='my-auto'>Title :</div>
                                    {/* <button className='bg-blue-400 font-large rounded-lg border border-red-400 py-1 px-4'>Use ChatGPT</button> */}
                                </label>
                                <input onChange={(e) => { settitle(e.target.value) }} type="text" id="first_name" class="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 " placeholder="Enter a title for project" required />
                            </div>
                            <div className='text-sm font-thin m-0 pl-2 ml-24'>Give a crispe and self-explanatory title that is easy to remember</div>
                        </div>
                        <div className='mt-4'>
                            <div className='flex gap-2'>

                                <label for="first_name" class="flex w-24 font-semibold text-gray-900 gap-4 align-start">Discription :
                                    {/* <button className='bg-blue-400 font-large rounded-lg border border-red-400 py-1 px-4'>Use ChatGPT</button> */}
                                </label>
                                <textarea onChange={(e) => { setdisc(e.target.value) }} type="text" id="first_name" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 h-20" placeholder="Describe your Project" required />
                            </div>
                            <div className='text-sm font-thin m-0 pl-2 ml-24'>Explain the problem you are solving and how you are doing it. Add relevant and important details only</div>
                        </div>
                        <div className='mt-4'>
                            <label for="first_name" class="flex font-semibold text-gray-900 gap-4 align-middle	"><div className='my-auto'>Links :</div>
                            </label>
                            <div className='text-sm font-thin m-0 '>Provide valid links that help Understand your project.</div>
                            <div className='flex flex-col gap-1 mt-4 my-auto font-semibold'>
                                {links ? links.map((element) => {

                                    return <div className='flex gap-4 mt-2 my-auto font-semibold'>

                                        {element[0]} : <div className='text-stone-500'>{element[1]}</div>
                                        {/* <button  className='px-2 rounded-lg py-1 bg-red-500 text-sm font-semibold text-white'>Remove </button> */}
                                    </div>
                                }) : ""}

                            </div>
                            <div className='flex gap-2 my-4 '>
                                <select id="type" onChange={(e) => settype(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5 ">

                                    <option value="Youtube">Youtube</option>
                                    <option value="Github">Github</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Linkedin">LinkedIn</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input id="link" type="text" onChange={(e) => setlink(e.target.value)} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7/12 p-2.5 " placeholder="Your link" />
                                <button className='bg-green-400 rounded-lg px-4 py-2 font-medium' onClick={(e) => addhandler(e)}>Add +</button>
                            </div>

                        </div>
                        <div>
                            <label for="first_name" class="flex font-semibold text-gray-900 gap-4 align-middle	"><div className='my-auto'>Visiblity :</div>
                            </label>

                            <ul class="grid w-full gap-4 pr-8 md:grid-cols-2 ">
                                <li>
                                    <input type="radio" onChange={() => setvisiblity(true)} id="hosting-small" name="hosting" value="hosting-small" class="hidden peer" defaultChecked />
                                    <label for="hosting-small" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div class="block">
                                            <div class="w-full text-lg font-semibold flex gap-2"><MdPublic className='mt-1' /> Public</div>
                                            <div class="w-full">Will be visible to everyone</div>
                                        </div>
                                        <svg class="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" onChange={() => setvisiblity(false)} id="hosting-big" name="hosting" value="hosting-big" class="hidden peer" />
                                    <label for="hosting-big" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div class="block">
                                            <div class="flex gap-2 self-center w-full text-lg font-semibold"><RiGitRepositoryPrivateFill className='mt-1' /> Private</div>
                                            <div class="w-full">Only visible to you and project menmbers</div>
                                        </div>
                                        <svg class="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </label>
                                </li>
                            </ul>

                        </div>
                        <div>
                            <label for="first_name" class="flex font-semibold text-gray-900 gap-4 align-middle	"><div className='my-auto'>Team Members :</div>
                            </label>
                            <div className='text-sm font-thin m-0 '>Add Team Members (If any)</div>
                            <div className='flex flex-col gap-1 mt-4 my-auto font-semibold'>
                                {members ? members.map((element) => {

                                    return <div className='flex gap-4 mt-2 my-auto font-semibold'>
                                        <BsFillPersonFill />
                                        {element[0]}  <div className='text-stone-500'>{element[1]}</div>
                                        {/* <button  className='px-2 rounded-lg py-1 bg-red-500 text-sm font-semibold text-white'>Remove </button> */}
                                    </div>
                                }) : ""}

                            </div>
                            <div className='flex gap-2 my-4 '>

                                <input id="link" type="text" onChange={(e) => setusername(e.target.value)} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/12 p-2.5 " placeholder="Username" />
                                <button className='bg-green-400 rounded-lg px-4 py-2 font-medium' onClick={(e) => addmemberhandler(e)}>Add +</button>
                            </div>
                        </div>
                        <div className='flex self-end gap-2'>

                            <button className='flex bg-gray-300 border-2 border-black px-4 py-2 border border-stone-100 rounded-lg text-black font-semibold self-end text-lg' disabled>Check for Plagarism*</button>
                            <button className='flex bg-gray-400 px-4 py-2 border border-stone-100 rounded-lg text-black font-semibold self-end text-lg' onClick={() => { reviewhandler() }}>Review</button>
                        </div>
                    </div>
                </div>
                <div id='review' style={{ backgroundColor: "#EEEEEE" }} className='hidden w-8/12 h-max my-10 p-6 rounded-lg '>
                    <div className='mb-6 font-bold'>Review and Upload</div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-semibold underline underline-offset-8'>{title}</h2>
                        <h3 className='my-3 text-base font-serif	 leading-relaxed	text-justify	'>{disc}</h3>
                        {links ? links.map((element) => {
                            return <a href={element[1]} target='blank' className='flex gap-1 text-stone-600 cursor-pointer'><h1 className='font-semibold text-black'>{element[0]}</h1><AiOutlineLink className='self-center' /> {element[1]} </a>
                        }) : ""}

                        <div id="line" className='w-full h-0.5 bg-stone-500 rounded-lg'></div>
                        <div className='text-2xl font-normal m-0 p-0 flex gap-1 '><BsFillPersonFill className='self-center' />{name}</div>
                        <div className='-mt-1  font-normal'>{domain}</div>
                        <div className='-mt-2  font-normal'>{clg}</div>
                        {members.length > "0" ?

                            <div>
                                <h1 className='font-normal text-2xl mb-4'>Project Members:</h1>
                                {members.map((element, index) => {
                                    return <div className='flex gap-1 ml-2'>{index + 1}) {element[0]} / {element[1]} ✔️</div>
                                })
                                }

                            </div>
                            : ""}
                        <div className='flex gap-2 w-full mt-4 justify-end'>

                            <button onClick={() => { edithandler() }} className='w-1/12 px-4 py-2 rounded-lg border-0 bg-yellow-100   '>Edit</button>
                            {visiblity ? <button onClick={(e) => { uploadhandler(e) }} className=' px-4 py-2 rounded-lg border-0 bg-green-600 text-white font-semibold flex'>Upload  Publicly<AiOutlineUnlock className='self-center font-bold ml-2' size={20} /> </button>
                                : <button onClick={(e) => { uploadhandler(e) }} className=' px-4 py-2 rounded-lg border-0 bg-green-600 text-white font-semibold flex '>Upload  Privately<AiOutlineLock className='self-center font-bold ml-2' size={20} /></button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </>
    )
}

export default Upload