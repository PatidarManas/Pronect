import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import axios from "axios";
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import { MdPublic } from 'react-icons/md';
import { BsFillPersonFill } from "react-icons/bs"
import comments from './comments';
import {BsFillChatSquareQuoteFill} from "react-icons/bs"
import { AiOutlineLink, AiFillDislike, AiFillLike } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import { set } from 'mongoose';
import Comments from './comments';
import Header from './Header';
const Project = ({ user }) => {
//    const URL = "http://localhost:4000"
   const URL = "https://pronect-server.onrender.com";
    const [loading, setloading] = useState(true);
    const visible = window.screen.width >= "765" ? true : false;

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    const [project, setproject] = useState();
    const [liked,setliked] = useState();
    const [disliked,setdisliked] = useState();
    const [comment,setcomment] = useState();
    const [newcomments,setnewcomments] = useState([]);
    
        async function load() {
        const token = document.cookie;
        await axios.post(`${URL}/project/view`, {
            id, token
        }).then((res) => {
            setproject(res.data);
            setloading(false);
            set();
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
    async function likehandler(e) {
        e.preventDefault();
        const token = document.cookie;
        await axios.post(`${URL}/project/like`, {
            token, id: project._id
        }).then((res) => {
            setliked(true);
            setdisliked(false);
          
        }).catch((error) => {
            alert(error);
        })
    }
    async function dislikehandler(e) {
        e.preventDefault();
        const token = document.cookie;
        await axios.post(`${URL}/project/dislike`, {
            token, id: project._id
        }).then((res) => {
            setliked(false);
            setdisliked(true);
            
        }).catch((error) => {
            alert(error);
        })
    }
    async function commenthandler(e){
        e.preventDefault();
        const token = document.cookie;
        await axios.post(`${URL}/project/newcomment`,{
            token,id:project._id,comment
        }).then((res)=>{
            setnewcomments([...newcomments , res.data]);
            console.log(newcomments)
        }).catch((error)=>{
            alert(error);
        })
    }
    useEffect(() => {
        
        load();
      
        //    console.log(project ? project.likes.includes(user.username) : "dxfg")
       
    }, [])
    function set(){
        console.log(project.likes)
        setliked(project.likes.includes(user.username) ? true : false );
        setdisliked(project ? project.dislikes.includes(user.username) ? true : false : "");
    }
    return (
        <>
        { visible ? 
    <div>

        {loading ? <Loading />
            : project ? 
                <>
                <Header user={user}/>
                <div className='flex min-h-screen  bg-slate-950 flex justify-center'>

                <div id='review' style={{ backgroundColor: "#EEEEEE" }} className=' w-10/12 h-max my-4 p-6 rounded-lg '>
                    {/* <div className='mb-6 font-bold'></div> */}
                    <div className='flex flex-col gap-2'>
                            <a href={'/profile/' + user.username} id='profile' className='flex rounded-lg bg-blue-200 w-fit self-end px-4 py-2'>
                                <BsFillPersonFill className='self-center mr-2' size={24} />
                                <div className='flex flex-col mr-6 ml-2'>
                                    <h1 className='text-lg self-start '>{user.name}</h1>
                                    <h1 className='text-base self-start font-thin'>{user.domain} {user.clg}</h1>
                                </div>
                                <h2 className='self-center'>{user.rp}🔥</h2>
                                
                            </a>
                        <div className='flex justify-between'>
                            <h2 className='text-2xl font-semibold underline underline-offset-8 self-end'>{project.title}</h2>
                            <button className='border-2 border-blue-400 bg-blue-300 px-2 py-1 flex gap-1'><BsFillChatSquareQuoteFill className="self-center"/> Chat</button>
                        </div>
                        <h3 className='my-3 text-base font-serif	 leading-relaxed	text-justify	'>{project.discription}</h3>
                        {project.links ? project.links.map((element) => {
                            return <a href={element[1]} target='blank' className='flex gap-1 text-stone-600 cursor-pointer'><h1 className='font-semibold text-black'>{element[0]}</h1><AiOutlineLink className='self-center' /> {element[1]} </a>
                        }) : ""}

                        <div id="line" className='w-full h-0.5 bg-stone-500 rounded-lg'></div>
                        <div className='flex gap-2'>{
                            loading ? "" : !liked 
                                ? <button onClick={(e) => likehandler(e)} className='flex border-2 rounded-lg border-slate-200 px-2 py-1'>
                                    <AiFillLike color='gray' size={24} />{project.likes.length}
                                </button>
                                : <button className='flex border-2 rounded-lg border-green-400 px-2 py-1'>
                                    <AiFillLike color='green' size={24} />{project.likes.length + 1}
                                </button>
                        }
                            {
                                loading ? "" : !disliked 
                                    ? <button onClick={(e) => dislikehandler(e)} className='flex border-2 rounded-lg border-slate-200 px-2 py-1'>
                                        <AiFillDislike color='gray' size={24} />{project.dislikes.length}
                                    </button>
                                    : <button className='flex border-2 rounded-lg border-red-400 px-2 py-1'>
                                        <AiFillDislike color='red' size={24} />{project.dislikes.length + 1}
                                    </button>


                            }
                        </div>
                        <div className='flex flex-col ' >
                            <h1 className=''>Comments</h1>
                            <div className='flex'>
                                <input onChange={(e)=>{setcomment(e.target.value)}} placeholder={'Comment as ' + user.name} className='bg-transparent border-0 focus:outline-none pl-4 w-96 mr-4' />
                                <button onClick={(e)=>{commenthandler(e)}} className='border border-gray-400 rounded-md px-2 py-1 '>Comment</button>
                            </div>
                            {newcomments ? newcomments.map((element)=>{
                                return <Comments id={element}/>
                            }):""}
                            {project ? project.comments.map((element)=>{
                                return <Comments id={element}/>
                            }):""}
                           
                        </div>
                        {/* {project.members.length>"0" ?

            <div>
                <h1 className='font-thin text-xl mb-4'>Project Members:</h1>
                {project.members.map((element, index) => {
                    return <div className='flex gap-1 ml-2'>{index + 1}) {element[0]} / {element[1]} ✔️</div>
                })
                }

            </div>
            : ""} */}

                    </div>
                </div> </div> 
                </>: ""
        }
    </div> : <div className='self-center mx-auto text-2xl font-semibold p-4'>Currently Platform is unavailable for this screen size please use platform on a device with atleast 770 screen width </div> }</>
    )
}

export default Project