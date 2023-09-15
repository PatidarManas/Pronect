import React, { useEffect, useState } from 'react'
import Header from './Header'
import { FaProjectDiagram } from "react-icons/fa"
import { BsArrowReturnRight, BsArrowRightShort } from "react-icons/bs"
import axios from 'axios'
import Loading from './Loading'
import Projectload from './Projectload'
import { BsFillChatSquareQuoteFill } from "react-icons/bs"

import { useHref, useNavigate } from 'react-router-dom'
const Profile = () => {
    // const URL = "http://localhost:4000"
    const URL = "https://pronect-server.onrender.com";
    const history = useNavigate();
    const visible = window.screen.width >= "765" ? true : false;

    const [user, setuser] = useState();
    var url = window.location.pathname;
    var username = url.substring(url.lastIndexOf('/') + 1);
    async function load() {
        const token = document.cookie;
        await axios.post(`${URL}/auth/searchuser`, {
            token, username
        }).then((res) => {
            setuser(res.data);

        }).catch((error) => {
            alert(error);
        })
    }

    useEffect(() => {
        load();
    }, [])

    return (
        <>
            { visible ? 
        <> {user ?

            <div style={{ backgroundColor: "#5C5470" }} className='w-full '>
                <Header user={user} />

                <div className='fixed top-12 flex gap-5 my-10 mx-4 w-3/12'>

                    <div className='h-24 w-24 bg-blue-400 rounded-full flex justify-center items-center text-6xl font-light font-serif	'>M</div>
                    <div className='flex flex-col '>
                        <h1 className='text-3xl font-semibold text-white '>{user.name}</h1>
                        <h1 className='text-lg font-light text-white'>{user.username}</h1>
                        <h1 className='text-sm font-extralight text-white -mt-2' >{user.email}</h1>
                    <button className='border-2 border-blue-400 bg-blue-300 px-2 py-1 flex gap-1 h-fit w-fit'><BsFillChatSquareQuoteFill className="self-center"/> Chat</button>
                    </div>
                </div>

                <div className='flex  py-5 w-full'>
                    <div className='w-6/12 mx-auto flex flex-col gap-5'>

                        <div id='performance' style={{ backgroundColor: "#352F44" }} className='rounded-lg bg-slate-800 self-center p-4 text-white w-full backdrop-blur-lg '>
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

                        <div style={{ backgroundColor: "#352F44" }} id='about' className='rounded-lg bg-slate-800 self-center p-4 text-white w-full backdrop-blur-lg '>
                            <h1 className='text-2xl font-normal underline underline-offset-4'>About</h1>
                            <p className='my-3 text-base font-serif	 leading-relaxed	text-justify	'>I am a self-thought Software engineer. A web developer with good practice in React, tailwind, Node, Express, Mongoose, and other technologies. I Have also knowledge of DSA, Version Control, Deployment</p>
                        </div>
                        <div style={{ backgroundColor: "#352F44" }} id='projects' className='rounded-lg bg-slate-800 self-center p-4 text-white w-full backdrop-blur-lg '>
                            <h1 className='text-2xl font-normal underline underline-offset-4'>Projects</h1>
                            {user.projects ? user.projects.map((element) => {
                                return <div id={"prj" + element[0]}> <Projectload id={element[0]} /> </div>
                            }) : <h1 className='ml-10 text-lg font-light'>No Projects Yet</h1>}

                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#352F44" }} className='fixed top-20 self-end right-1 flex flex-col gap-1  mx-4 w-2/12 px-4 py-4 rounded-lg '>

                    <h1 className='text-xl text-white text-light '>Go To...</h1>
                    <div className='flex flex-col ml-4 gap-2'>
                        <a href='#performance' className='cursor-pointer text-lg self-start text-white flex gap-1'> <BsArrowReturnRight className="self-center" /> Performance </a>
                        <a href='#about' className='cursor-pointer text-lg self-start text-white flex gap-1'> <BsArrowReturnRight className="self-center" /> About </a>
                        <a href='#projects' className='cursor-pointer text-lg self-start text-white flex gap-1'> <BsArrowReturnRight className="self-center" /> Projects </a>
                        <div className='flex flex-col ml-2 -mt-1'>
                            {user.projects.map((element) => {
                                return <a href={"#prj" + element[0]} onClick={() => { }} className='cursor-pointer self-start text-white flex gap-1 line-clamp-1'> <BsArrowRightShort className="self-center" />{element[1].slice(0, 15) + ".."} </a>
                            })}

                        </div>

                    </div>
                </div>
            </div>
            : <Loading />}
        </>  : <div className='self-center mx-auto text-2xl font-semibold p-4'>Currently Platform is unavailable for this screen size please use platform on a device with atleast 770 screen width </div> }</>
    )
}

export default Profile