import React, { useEffect, useState } from 'react'
import { BsFillPersonFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom';
import { BiSolidHelpCircle } from "react-icons/bi"
import { TbLogout2 } from "react-icons/tb"
import { BsPerson } from "react-icons/bs"
import { FaProjectDiagram } from "react-icons/fa"
import { RxActivityLog } from "react-icons/rx"
import { AiOutlineSearch, AiFillSetting, AiFillProfile } from "react-icons/ai"
import pronect from '../pronect.png'
import axios from 'axios';
const Header = ({ user }) => {
    // const URL = "http://localhost:4000"
    const URL = "https://pronect-server.onrender.com";
    const history = useNavigate();

    const [query, setquery] = useState("");
    const [querytype, setquerytype] = useState(true);
    const [userresults, setuserresults] = useState();
    const [projectresults, setprojectreults] = useState();
    async function logouthandler(e) {
        e.preventDefault();
        document.cookie = "token=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        history("/signup")
        window.location.reload();


    }
    async function searchhandler() {
        if (query != "") {

            if (!querytype) {
                await axios.post(`${URL}/auth/search`, {
                    query
                }).then((res) => {
                    if (res.status == 200) {

                        setuserresults(res.data);
                        // console.log(projectresults);
                    }
                }).catch((error) => {
                    alert(error);
                })
            } else {
                await axios.post(`${URL}/project/search`, {
                    query
                }).then((res) => {
                    if (res.status == 200) {

                        setprojectreults(res.data);
                        // console.log(projectresults);
                    }
                }).catch((error) => {
                    alert(error);
                })
            }
        }
        else {
            setuserresults(null);
            setprojectreults(null);
        }
    }
    useEffect(() => {
        console.log(querytype)
        searchhandler();
    }, [query])

    return (
        <>
            
                <div id='searchbar' className='hidden backdrop-blur-sm z-40 absolute top-0 w-full h-screen bg-  px-10'>
                    <div className='bg-white rounded-xl w-1/2 z-50 mx-auto flex flex-col '    >
                        <div class="flex mb-6 bg-gray-400 rounded-t-lg">
                            <div class=" inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                <AiOutlineSearch />
                            </div>
                            <select id="countries" onChange={() => {
                                setquerytype(!querytype);
                                document.getElementById("searchinput").value = "";
                                setquery("");
                            }} class=" text-gray-900 text-sm bg-transparent focus:outline-0	w-3/12 p-2.5 ">
                                <option selected>Projects</option>
                                <option >Users</option>
                            </select>
                            <input id="searchinput" onChange={(e) => { setquery(e.target.value) }} type="text" class="text-gray-900 bg-transparent text- focus:outline-0 w-full pl-10 p-2.5  " placeholder="name@flowbite.com" />
                            <button className='mr-2 text- text-xl font-semibold' onClick={() => { document.getElementById("searchbar").style.display = "none" }}> X</button>
                        </div>
                        {userresults ?
                            userresults.map((element) => {
                                return (
                                    <div id="userresult" className='flex flex-col gap-4 mb-2'>
                                        <div className='flex px-4 justify-between'>
                                            <div className='flex'>
                                                <BsPerson size={25} color='gray' className='self-center' />
                                                <div className='h-8 mx-1 w-0.5 bg-gray-400 '> </div>
                                                <a href={"/profile/" + element.username} className='mx-1 font-light text-xl  self-center cursor-pointer'>{element.name}</a>

                                                <h1 className='font-extralight text-sm self-center'>({element.rp}🔥)</h1>
                                            </div>
                                            <a href={"/profile/" + element.username} className=' self-center text-stone-400 cursor-pointer'>Visit profile</a>
                                        </div>
                                    </div>)
                            })
                            : ""}
                        <div id="projectresult" className=' flex flex-col gap-4 mb-2'>
                            {projectresults ? projectresults.map((element) => {
                                return (

                                    <div className='flex px-4 justify-between'>
                                        <div className='flex'>
                                            <FaProjectDiagram size={25} color='gray' className='self-center' />
                                            <div className='h-8 mx-1 w-0.5 bg-gray-400 '> </div>
                                            <a href={"/project/" + element._id} className='mx-1 font-light text-xl  self-center cursor-pointer'>{element.title}</a>
                                            <div className='mx-1 font-light text-sm text-stone-300  self-center'>- {element.username}</div>

                                            {/* <h1 className='font-extralight text-sm self-center'>(3000🔥)</h1> */}
                                        </div>
                                        <a href={"/project/" + element._id} className=' self-center text-stone-400 cursor-pointer'>Visit Project</a>
                                    </div>
                                )
                            }) : ""}
                        </div>
                    </div>
                </div>
            
            <div id='profilebox' className='hidden absolute flex flex-col top-16 right-8 z-50 w-64 h-2/3 bg-white rounded-sm border-2 border-black'>
                <button onClick={() => { document.getElementById("profilebox").style.display = "none" }} className='absolute right-2 top-2 font-semibold text-red-500'>Close</button>
                <div className='h-20 bg-gray-400 '></div>
                <div className='absolute top-10 flex w-full'>
                    <div className=' flex self-center mx-auto bg-blue-400 justify-center w-20 h-20 rounded-full border border-white items-center text-3xl font-semibold '>{user.name[0].toUpperCase()}</div>
                </div>
                <div className=' mt-10 w-full flex flex-col  justify-center'>
                    <h1 className='text-base font-light self-center'>{user.username}</h1>
                    <h1 className='text-lg font-normal -mt-2 self-center'>{user.name}</h1>
                    {/* <h1>{user.email}</h1> */}
                </div>
                <div className=' mt-10 w-full flex flex-col gap-2'>
                    <a href={"/profile/" + user.username} className='self-start text-lg flex justify-center gap-2 ml-4'><BsFillPersonFill className='self-center' /> My Profile</a>
                    <a href='/home' className='self-start text-lg flex justify-center gap-2 ml-4'><RxActivityLog className='self-center' /> Home</a>
                    <button className='self-start text-lg flex justify-center gap-2 ml-4'><AiFillSetting className='self-center' />Settings</button>
                    <button className='self-start text-lg flex justify-center gap-2 ml-4'><BiSolidHelpCircle className='self-center' /> Help</button>
                </div>
                <button onClick={(e) => logouthandler(e)} className='absolute bottom-2 flex right-10 text-lg gap-2'><TbLogout2 size={20} className='self-center' />Logout</button>
            </div>


            <div style={{ backgroundColor: "#352F44" }} id="header" className='w-full py-2 h-16 px-10 bg-blue-400 flex gap-2 justify-between'>
                <div id='logo' className='text-red-500 self-center  font-thin text-3xl'><img src={pronect} className='h-14' ></img></div>

                <button className='w-2/5 flex gap-2 self-center ' onClick={() => { document.getElementById("searchbar").style.display = "block" }} >
                    {/* <div className='rounded-lg h-8 text-gray-500 text-lg font-medium px-4 w-full border-2 border-stone-400 self-center' >Search Projects and Users</div> */}
                    {/* <div className='self-center text-gray-500'><AiOutlineSearch className="" size={20} color='gray' /></div> */}
                </button>
                {/* <ProfileDropdown className="flex self-end justify-center z-50"/> */}
                <div className='flex gap-6'>
                    <button onClick={() => { document.getElementById("searchbar").style.display = "block" }} className='self-center text-gray-500 border-0 p-2 rounded-full border-white hover:border-2'><AiOutlineSearch className="" size={22} color='white' /></button>

                    <button className='flex gap-2 self-center text-white font-semibold border-0 p-2 rounded-full border-white hover:border-2' onClick={() => { document.getElementById("profilebox").style.display = "block" }}>
                        <BsFillPersonFill size={22} />
                    </button>
                    {/* <button onClick={() => { logouthandler() }} className='text-white font-bold text-lg flex my-auto gap-1'><BiLogOut className='self-center ' />Logout</button> */}
                </div>

            </div>

        </>
    )
}

export default Header;