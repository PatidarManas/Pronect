import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Comments = ({ id }) => {
    const URL = "http://localhost:4000";
    const [comment, setcomment] = useState('')
    async function load() {
        await axios.post(`${URL}/project/comment`, {
            id
        }).then((res) => {
            setcomment(res.data);
        }).catch((error) => {
            alert(error);
        })
    }
    useEffect(()=>{
        load()
    },[])
    return (
        <>
            {
                comment ?

                    <div className='flex gap-2 mt-6 items-center' >
                        <div className='bg-blue-500 text-xl p-1 rounded-full w-9 h-9 flex justify-center content-center text-white'>{comment.username[0]}</div>
                        <div className='flex flex-col'>
                            <h1 className='text-sm font-light'>{comment.username}</h1>
                            <h2>{comment.content}</h2>
                        </div>
                    </div >
                    : ""}
        </>
    )
}

export default Comments