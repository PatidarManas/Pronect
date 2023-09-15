import React, { useEffect, useState } from 'react'
import Upload from './Upload'
import { BsFillPersonFill, BsPerson } from "react-icons/bs"
import { AiOutlineSearch, AiFillSetting, AiFillProfile } from "react-icons/ai"
import { FaProjectDiagram } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { BiSolidHelpCircle } from "react-icons/bi"
import { TbLogout2 } from "react-icons/tb"
import { RxActivityLog } from "react-icons/rx"
import Select from 'react-select'
import axios from 'axios'
import Project from './Project'
import ProfileDropdown from './Test'
import Notification from './Notification'
import pronect from '../pronect.png'
// import logo from "../svg/logo-no-background.svg"

const Home = ({ user,lastlogin }) => {
    // const URL = "http://localhost:4000"
    const URL = "https://pronect-server.onrender.com";
    const history = useNavigate()
    // async function loaddetails(){
    //     cons
    //     await axios.post(`${URL}/auth/homedetails`,{
    //         token
    //     })
    // }
    const [query, setquery] = useState("");
    const [querytype, setquerytype] = useState(true);
    const [userresults, setuserresults] = useState();
    const [projectresults, setprojectreults] = useState();
    const [isactive, setisactive] = useState(false);
    const firsttime = lastlogin
    const COLLEGES = [
        { label: 'PIET', value: "PIET" },
        { label: 'PIT', value: "PIT" },
        { label: 'PIET-DTD', value: "PIET-DTD" },
        { label: 'PIMS', value: "PIMS" },
        { label: 'PHMS', value: "PHMS" },
    
    ]
    const CATEGORIES = [
        { label: 'Software', value: "Software" },
        { label: 'Civil', value: "Civil" },
        { label: 'Financial', value: "Financial" },
        { label: 'Management', value: "Management" },
        { label: 'Ai/Ml', value: "Ai/Ml" },
        { label: 'Architecture', value: "Architecture" },
        { label: 'Mechanical', value: "Mechanical" },
    
    ]
    const visible = window.screen.width >= "765" ? true : false;
    const [clgs,setclgs] = useState(COLLEGES);
    const [categories,setcategories] = useState(CATEGORIES);
    // console.log(user)
    async function logouthandler() {
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        history("../signup")
        window.location.reload();


    }
    async function searchhandler() {
        if (query != "") {

            if (!querytype) {
                await axios.post(`${URL}/auth/search`, {
                    query,clgs,categories
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

    // document.onclick = function(e) {
    //     if(e.target.id !== "searchbar" ){
    //          document.getElementById("searchbar").style.display = "none" ;

    //          console.log(isactive)
    //          setisactive(false);
    //     }
    // }
    useEffect(() => {
        console.log(querytype)
        searchhandler();
    }, [query])

    return (
        <>
            { visible ? 
        <>
            {firsttime ? <div id='contactbox' className='z-50 absolute backdrop-blur-sm  w-full min-h-screen flex '>
                <div className='relative self-center bg-white rounded-md p-4 w-1/3 mx-auto my-auto flex flex-col'>
                    <button onClick={() => { document.getElementById("contactbox").style.display = "none" }} className='absolute top-2 right-2 text-red-500 font-bold text-xl'>Close</button>
                    <h1 className='self-center text-2xl font-semibold mb-4'>Help us improve</h1>
                    <p className='text-lg '>Please let us know your experience with <strong>Pro-nect</strong> a platform for you.
                        We would be happy to listen from you. write as a email at <a href='mailto:manaspatidar170@gmail.com' className='text-blue-400 cursor-pointer'>manaspatidar170@gmail.com</a>
                          </p>
                    <h1 className='text-base self-center font-light mt-4'>Thank you and have a nice experience ahead</h1>
                </div>
            </div> : ""}
            <div id='uploadbox' className='hidden z-50 absolute backdrop-blur-sm z-40 w-full min-h-screen'>
                <Upload clg={user.clg} domain={user.domain} name={user.name} />
                <button onClick={() => { document.getElementById("uploadbox").style.display = "none" }} className='absolute top-12 right-60 text-red-500 font-bold text-xl'>Close</button>
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
                <button onClick={() => logouthandler()} className='absolute bottom-2 flex right-10 text-lg gap-2'><TbLogout2 size={20} className='self-center' />Logout</button>
            </div>
            <div style={{ backgroundColor: "#5C5470" }} className='fixed min-h-screen'>
                <button  className='fixed bottom-0 px-2 py-1 text-lg  hover:bg-blue-500 right-5 bg-blue-400 rounded-t-lg '>Chat with Us*</button>
                <div id='searchbar' className='hidden backdrop-blur-sm z-40 absolute top-0 w-full h-screen bg-  px-10'>
                    <button id='filterbtn' onClick={()=>{document.getElementById("filters").style.display="flex"; document.getElementById("filterbtn").style.display="none"}} className='fixed right-64 top-4 text-lg bg-blue-400 tracking-wide px-2 py-1 rounded-md hover:bg-blue-500 '>Filters</button>
                    <div id='filters' className='hidden absolute left-80 ml-4 bg-white rounded-xl w-1/2 z-50 mx-auto flex flex-col p-4' >
                        <h1 className='text-xl font-semibold '    >Apply Filters*</h1>
                        <label class="form-label select-label mt-4 mb-1">Select Categories</label>
                        <Select
                            onChange={(selectedOptions)=>{setcategories(selectedOptions)}}
                            options={CATEGORIES}
                            isMulti
                            name="categories"
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                        <label class="form-label select-label mt-4 mb-1">Select Colleges</label>
                        <Select
                            onChange={(selectedOptions)=>{setclgs(selectedOptions)}}
                            options={COLLEGES}
                            isMulti
                            name="colleges"
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                        <button onClick={()=>{document.getElementById("filters").style.display="none"; document.getElementById("filterbtn").style.display="block"}}  className='px-2 py-1 rounded-md bg-gray-400 hover:bg-gray-500 self-end mt-4 font-semibold' >Apply</button>
                    </div>
                    <div className='bg-white rounded-xl w-1/2 z-40 mx-auto flex flex-col '    >
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
                <div id='content' className=' flex '>
                    <div id='left' style={{ backgroundColor: "#352F44" }} className=' mx-4 rounded-lg mt-4 flex flex-col w-3/12 py-10 px-6 text-white  '>
                        {
                            user.projects.length > "0" ? <> <h3 className='text-2xl font-normal mb-10 underline underline-offset-8'>Your Top Projects</h3>
                                {user.projects ? user.projects.map((element) => {
                                    return <a href={`/project/${element[0]}`} className='flex gap-2 	 text-lg mb-4 ml-2  cursor-pointer'><FaProjectDiagram />{element[1]}</a>

                                }) : ""}
                            </>
                                : <div> Upload Projects you haven't yet </div>
                        }
                        <div className='flex flex-col gap-2 mt-8'>
                            <h3 className='text-2xl font-normal mb-4 underline underline-offset-8'>Quick Links</h3>
                            <button onClick={() => { document.getElementById("uploadbox").style.display = "block" }} className='self-start pl-4 text-lg'>Upload Project</button>
                            <a className='self-start pl-4 text-lg cursor-pointer'>Settings</a>
                            <a className='self-start pl-4 text-lg cursor-pointer'>Profile</a>
                        </div>
                    </div>
                    <div id='mid' className='flex flex-wrap gap-4 w-6/12 mt-4  '>
                        <div style={{ backgroundColor: "#352F44" }} className='rounded-lg bg-slate-800 self-center p-4 py-8 text-white w-full backdrop-blur-lg '>
                            <h1 className='text-2xl font-normal underline underline-offset-4'>Performance</h1>
                            <div className='flex h-40'>
                                <div className='w-1/3 p-2 flex flex-col items-center justify-center'>
                                    <h1 className='flex flex-col font-medium text-3xl  items-center pb-3'>{user.projects.length} <h2 className='text-lg font-thin '>Projects</h2></h1>
                                    <h1 className='flex flex-col font-medium text-3xl  items-center '>0* <h2 className='text-lg font-thin '>Contributions</h2></h1>
                                </div>

                                <div className='w-1/3 p-2 flex flex-col items-center justify-center'>
                                    <div>
                                        <h1 className='font-bold text-4xl '> {user.rp}🔥</h1>
                                        <h2 className='font-thin text-lg s'>Ranking Points</h2>
                                    </div>
                                </div>

                                <div className='w-1/3 p-2 flex flex-col items-center justify-center '>
                                    <h1 className='flex font-medium text-3xl gap-2 items-center '>1* <h2 className='text-lg font-normal ' >Days</h2></h1>
                                    <h2 className='font-thin  self-center  pb-4'>Current Streak</h2>
                                    <h1 className='flex font-medium text-3xl gap-2 items-center'>1* <h2 className='text-lg font-normal '>Days</h2></h1>
                                    <h2 className='font-thin  self-center '>Longest Streak</h2>

                                </div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#352F44" }} className='rounded-lg bg-slate-900 p-4 text-white w-6/12 '>
                            <h3 className='text-2xl font-normal underline underline-offset-8'>Upload your project </h3>
                            <p className='text-lg font-thin text-stone-400 leading-6 mt-4	'>A Project contains all your Project files alongwith ralated links.You can even add project members under the same Project</p>
                            <button onClick={() => { document.getElementById("uploadbox").style.display = "block" }} className='rounded-md py-0 px-1 bg-green-600 mt-4'>Create new Project</button>
                        </div>
                    </div>
                    <div id='notification' className='flex flex-col w-3/12 p-2'>
                        {user.notifications.map((element) => {
                            return <Notification id={element} />
                        })}
                    </div>
                </div>
            </div> 
        </> : <div className='self-center mx-auto text-2xl font-semibold p-4'>Currently Platform is unavailable for this screen size please use platform on a device with atleast 770 screen widthcd b    </div> }</>
    )
}

export default Home