import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoIosNotifications } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
const Notification = ({ id }) => {
    // const URL = "http://localhost:4000"
    const URL = "https://pronect-server.onrender.com";
    const history = useNavigate()
    const [notification, setnotification] = useState()
    async function load() {
        const token = document.cookie
        await axios.post(`${URL}/auth/notification`, {
            token, id
        }).then((res) => {
            setnotification(res.data);
        }).catch((error) => {
            alert(error);
        })
    }
    async function readhandler(){
        const token = document.cookie
        await axios.post(`${URL}/auth/markread`, {
            token, id
        }).then((res) => {
            document.getElementById("noti"+id).style.display="none"
        }).catch((error) => {
            alert(error);
        })
    }
    
    useEffect(() => {
        load();
        
    }, [])

    return (
        <>
            {notification && notification.active ?

                <div id={"noti" + id } className='bg-gray-500 mt-4 mx-6 rounded-lg p-2 flex'>
                    <div className='h-full w-0.5 bg-blue-400'></div>
                    <div className='flex flex-col'>
                        <div className='flex justify-between ml-2'>
                            <IoIosNotifications className="self-center" size={20} color="blue" />
                            <button onClick={()=>{readhandler()}} className='self-end text-blue-400 text-base'>Mark as Read</button>
                        </div>
                        <div className='text- leading-5 font-normal text-white ml-2'>{notification.content}</div>
                    </div>
                </div>
                : ""}</>
    )
}

export default Notification