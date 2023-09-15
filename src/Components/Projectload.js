import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaProjectDiagram } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
const Projectload = ({id}) => {
    // const URL = "http://localhost:4000"
    const URL = "https://pronect-server.onrender.com";
    const history = useNavigate()

    const [project, setproject] = useState()
    async function load() {
        const token = document.cookie
        
        await axios.post(`${URL}/project/view`, {
            id,token
        }).then((res) => {
            setproject(res.data);

        }).catch((error) => {
            alert(error);
        })
    }

    useEffect(() => {
        load();
    }, [])

    return (<>
        {project ? <div className='flex flex-col'>
            <h1 className='flex gap-2 text-xl	 text-lg mt-4 mb-2  cursor-pointer'><FaProjectDiagram className='self-center' size={20} />{project.title}</h1>
            <p className='text-base font-serif ml-2 leading-relaxed	text-justify line-clamp-2	'>{project.discription}</p>
            <a href={"../../project/"+ project._id} className='bg-gray-300 rounded-lg border-2 border-black px-2 py-1 text-black w-fit self-end'>See More</a>
        </div>
            : "" }
    </>
    )
}

    export default Projectload;