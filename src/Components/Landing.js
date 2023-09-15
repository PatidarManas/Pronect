import React, { useEffect } from 'react'
import bg from "../bg.jpg"
import build from "../build.png"
import pronect from "../pronect.png"
import { AiFillWechat } from "react-icons/ai"
import { BsGraphUp, BsArrowRight } from "react-icons/bs"
const Landing = () => {
    const visible = window.screen.width >= "765" ? true : false;

    useEffect(() => {
     
    
    const callback = function (entries) {
        entries.forEach((entry) => {


            if (entry.isIntersecting) {
                entry.target.classList.add("animate-fadeIn");

            } else {
                entry.target.classList.remove("animate-fadeIn");

            }
        });
    };

    const observer = new IntersectionObserver(callback);

    const targets = document.querySelectorAll(".js-show-on-scroll");
    targets.forEach(function (target) {
        target.classList.add("opacity-0");
        observer.observe(target);
    });
}, [])
    

    return (
        <>
            {visible ? <> <div style={{ backgroundImage: `url(${bg})`, backgroundColor: "black", backgroundRepeat: "no-repeat" }} className='flex flex-col text-white w-full px-10 min-h-screen'>
                <div id='header' className='flex w-full  justify-between mt-6 '>
                    <div className=' flex flex-col text-white -mt-2'>
                        <img src={pronect} className='h-20' />
                    </div>
                    <div className=''><a href="/signup" className='bg-gray-400 rounded-lg  px-4 py-2 flex gap-2 hover:bg-blue-400 text-lg text-black'>Get Started<BsArrowRight fill='black' className='self-center' /></a></div>
                </div>
                <div className='flex flex-col mt-36 w-1/2'>
                    <h1 className='text-6xl font-semibold'>Let's Create Together</h1>
                    <p className='text-lg mt-2 font-light'>Why to limit you and your work to yourself.<br></br> Let the world know what you did</p>
                    <a href="/signup" className='rounded-md px-4 py-2 mr-20 mt-6 border  border-white self-end bg-cyan-600 hover:bg-cyan-400 w-fit flex gap-1'>Get Started <BsArrowRight className='self-center' /></a>
                </div>
                <div className='flex flex-col mt-52 items-center w-full '>
                    <h1 className='text-2xl font-semibold'>Destiny isn't the AI its the Human Inteligence</h1>
                    <h2 className='text-lg font-thin'>So lets not ignore what we do</h2>
                    <div className='flex mt-20 gap-28 mb-20'>
                        <div className='flex flex-col w-64 h-64 items-center border border-white rounded-md p-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="5em" viewBox="0 0 640 512">
                                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                <style dangerouslySetInnerHTML={{ __html: "svg{fill:#ffffff}" }} />
                                <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
                            </svg>

                            <h1 className='text-white font-bold text-center text-2xl my-2'>Build</h1>
                            <p className='text-white font-thin text-center '>Give your all to your work, and watch your projects flourish into excellence.</p>
                        </div>
                        <div className='flex flex-col w-64 h-64  items-center border border-white rounded-md p-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="5em" viewBox="0 0 512 512">
                                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                <style dangerouslySetInnerHTML={{ __html: "svg{fill:#ffffff}" }} />
                                <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                            </svg>
                            <h1 className='text-white font-bold text-2xl my-2 '>Upload</h1>
                            <p className='text-white font-thin text-center'>Upload your project & proactively connect with right audience to maximize its impact.</p>
                        </div>
                        <div className='flex flex-col w-64 h-64  items-center border border-white rounded-md p-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="5em" viewBox="0 0 512 512">
                                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                <style dangerouslySetInnerHTML={{ __html: "svg{fill:#ffffff}" }} />
                                <path d="M500.3 7.3C507.7 13.3 512 22.4 512 32V176c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48V71L352 90.2V208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48V64c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2h61.7c10.7 0 20.7 5.3 26.6 14.2L213.3 304H240c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V352c0-26.5 21.5-48 48-48H74.7zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368H496c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400H336c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z" />
                            </svg>

                            <h1 className='text-white font-bold text-2xl my-2 '>Colabrate</h1>
                            <p className='text-white font-thin text-center'>Seek appreciation for your efforts and collaborate to innovate together.</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mt-20 items-center'>
                    <h1 className='text-2xl font-semibold'>Power Of Pro-nect</h1>
                    <h2 className='text-lg font-thin'>Dont ignore the chance to be at right place</h2>
                    <section>

                        <div class="my-3 mb-6  ml-2 bg-gradient-to-b from-gray-800  to-orange-400 w-1 h-52 rounded js-show-on-scroll">
                        </div>

                        <div class="flex">




                            <div class="">
                                <div class="relative">
                                    <span
                                        class="absolute -left-3 -top-3 h-10 rounded-full w-10 home-campaign-glowing-icon-glow  bg-orange-400 blur-xl -z-20"></span>
                                    <svg height="24" viewBox="0 0 24 24" version="1.1" width="24"
                                        class="octicon octicon-briefcase fill-gray-50">
                                        <path
                                            d="M7.5 1.75C7.5.784 8.284 0 9.25 0h5.5c.966 0 1.75.784 1.75 1.75V4h4.75c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 21.25 22H2.75A1.75 1.75 0 0 1 1 20.25V5.75C1 4.784 1.784 4 2.75 4H7.5Zm-5 10.24v8.26c0 .138.112.25.25.25h18.5a.25.25 0 0 0 .25-.25v-8.26A4.235 4.235 0 0 1 18.75 13H5.25a4.235 4.235 0 0 1-2.75-1.01Zm19-3.24v-3a.25.25 0 0 0-.25-.25H2.75a.25.25 0 0 0-.25.25v3a2.75 2.75 0 0 0 2.75 2.75h13.5a2.75 2.75 0 0 0 2.75-2.75Zm-6.5-7a.25.25 0 0 0-.25-.25h-5.5a.25.25 0 0 0-.25.25V4h6Z">
                                        </path>
                                    </svg>

                                </div>

                                <div class="mt-6 ml-2 bg-gradient-to-b from-orange-400  to-gray-800 w-1 h-96 rounded js-show-on-scroll">
                                </div>
                            </div>

                            <div>
                                <h3 class="pl-10 text-sm  text-white md:text-lg lg:text-2xl">One Team, One Project</h3>
                                <p class="pl-10 pt-10 text-5xl font-semibold text-white w-3/4 leading-snug js-show-on-scroll">One project, multiple team members? No problem, we've got you covered. <span
                                    class="text-orange-400"> Easily and quickly add multiple users to the same project.</span></p>
                            </div>

                        </div>

                    </section>
                    <section>
                        <div class="my-3 mb-6  ml-2 bg-gradient-to-b from-gray-800  to-blue-400 w-1 h-52 rounded js-show-on-scroll">
                        </div>

                        <div class="flex">




                            <div class="">
                                <div class="relative">
                                    <span
                                        class="absolute -left-3 -top-3 h-10 rounded-full w-10 home-campaign-glowing-icon-glow  bg-blue-400 blur-xl -z-20"></span>
                                    <BsGraphUp size={24} />


                                </div>

                                <div class="mt-6 ml-2 bg-gradient-to-b from-blue-400  to-gray-800 w-1 h-96 rounded js-show-on-scroll">
                                </div>
                            </div>

                            <div>
                                <h3 class="pl-10 text-sm  text-white md:text-lg lg:text-2xl"> Freedom!</h3>
                                <p class="pl-10 pt-10 text-5xl font-semibold text-white w-3/4 leading-snug js-show-on-scroll">Unleash your creativity across any domain -  <span
                                    class="text-blue-400">no limits, no boundaries!. </span> 50*+ Catgegories and expanding</p>
                            </div>

                        </div>
                    </section>




                    <section>
                        <div class="my-3 mb-6  ml-2 bg-gradient-to-b from-gray-800  to-rose-400 w-1 h-52 rounded js-show-on-scroll">
                        </div>

                        <div class="flex">




                            <div class="">
                                <div class="relative">
                                    <span
                                        class="absolute -left-3 -top-3 h-10 rounded-full w-10 home-campaign-glowing-icon-glow  bg-rose-400 blur-xl -z-20"></span>

                                    <svg height="24" viewBox="0 0 24 24" version="1.1" width="24" data-view-component="true" class="fill-gray-50">
                                        <path
                                            d="M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 19.5v-8A2.5 2.5 0 0 1 5.5 9Zm-1.5 2.5v8a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-13a1 1 0 0 0-1 1Zm3-4.25V9h9V7.25c0-2.67-1.922-4.75-4.5-4.75-2.578 0-4.5 2.08-4.5 4.75Z">
                                        </path>
                                    </svg>




                                </div>

                                <div class="mt-6 ml-2 bg-gradient-to-b from-rose-400  to-gray-800 w-1 h-96 rounded js-show-on-scroll">
                                </div>
                            </div>

                            <div>
                                <h3 class="pl-10 text-sm  text-white md:text-lg lg:text-2xl"> Protection</h3>
                                <p class="pl-10 pt-10 text-5xl font-semibold text-white w-3/4 leading-snug js-show-on-scroll"> Worried about your project getting copied? No worries! Our <span
                                    class="text-rose-400"> AI-based platform ensures it remains plagiarism-free.</span> </p>
                            </div>

                        </div>

                    </section>
                    <section>


                        <div class="my-3 mb-6  ml-2 bg-gradient-to-b from-gray-800  to-purple-400 w-1 h-52 rounded js-show-on-scroll">
                        </div>

                        <div class="flex">

                            <div class="">
                                <div class="relative">
                                    <span
                                        class="absolute -left-3 -top-3 h-10 rounded-full w-10 home-campaign-glowing-icon-glow  bg-purple-400 blur-xl -z-20"></span>
                                    <AiFillWechat size={30} />

                                </div>

                                <div class="mt-6 ml-2 bg-gradient-to-b from-purple-400  to-gray-800 w-1 h-96 rounded js-show-on-scroll">
                                </div>
                            </div>

                            <div>
                                <h3 class="pl-10 text-sm  text-white md:text-lg lg:text-2xl"> Chat and feedback</h3>
                                <p class="pl-10 pt-10 text-5xl font-semibold text-white w-3/4 leading-snug js-show-on-scroll">Initiate<span
                                    class="text-purple-400"> productive conversations </span>through chat and gain<span
                                        class="text-purple-400"> insightful feedback</span> to enhance your endeavors.</p>
                            </div>

                        </div>
                    </section>
                </div>
            </div> </> : <div className='self-center mx-auto text-2xl font-semibold p-4'>Currently Platform is unavailable for this screen size please use platform on a device with atleast 770 screen width </div>} </>
    )
}

export default Landing