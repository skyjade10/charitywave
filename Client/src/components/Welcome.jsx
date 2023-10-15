import React,{ useState} from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import mainImage from '../assets/images/cover4.jpg'
import sub1 from '../assets/images/cover3.jpg'
import tap from '../assets/images/tap.jpg'
import { BackendContext } from "./context/BackendContext";
import { MinAbout } from '../components'

const Listm =({text,link,classProps}) =>{
    return (
        <Link to={link}>
            <button className={` hover:bg-blue-500 active:bg-gray-500 cursor-pointer rounded-md
             text-white bg-purple-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4
             transition ease-linear delay-150 hover:-translate-y-1 duration-300 hover:scale-110 
             text-xs sm:text-sm md:text-sm lg:text-base ${classProps}`}>
                <p>{text}</p>
            </button>
        </Link>
        
    )
}

const Welcome = () => {

    const { getVoyteContract,tronLinkIsConnected,connectWallet,currentAccount } = useContext(BackendContext);

    return (
        <div className=" object-contain mb-0">
            <div className=" lg:h-[600px]">
                <img className=" w-full h-full" src={mainImage} alt="main" />
            </div>
            <div className="absolute mx-8 top-10 mt-10 sm:top-20 sm:mt-40 md:top-20 md:mt-40 lg:top-40 text-white flex flex-col gap-4">
                <div>
                    <h2 className=" text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(112,26,117,0.8)]">
                        Welcome to Charity Wave
                    </h2>

                    <p className=" text-sm sm:text-sm md:text-base lg:text-base drop-shadow-[0_1.2px_1.2px_rgba(112,26,117,0.8)] ">
                        A donation platform, helping you reach million
                    </p>
                </div>
            </div>
            <div className="absolute w-full -mt-7 ">
                <div className="flex flex-col lg:flex-row  justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                    <Listm link={"/post"} text="Donate"/>
                    <Listm link={"/page"} text="Organizations"/>
                </div>
            </div>

            <div className=" flex flex-col mt-10 gap-2 lg:flex-col bg-gray-300 ">
                <div className=" flex flex-col justify-center items-center px-4  gap-2 m-4 text-gray-600 text-sm lg:flex-row">
                    <div className="  lg:w-[500px]">
                        <img className=" w-full h-full" src={sub1} alt="main" />
                    </div>
                    <p className=" text-start">
                    Giving changes lives. A child gets an education, a family gets a home, a community gains hope. Donations bridge gaps, offering warmth in winter, food during hunger, and education for dreams. Stories abound, like Sarah, whose scholarship enabled college, breaking generations of poverty. Every donation, big or small, paints a brighter future.
                    </p>
                </div>

                <div className=" flex flex-col justify-center items-center px-4 gap-2 m-4 text-gray-600 text-sm lg:flex-row-reverse">
                    <div className="  lg:w-[500px]">
                        <img className=" w-full h-full" src={tap} alt="main" />
                    </div>
                    <p className=" text-end">
                    Time is a precious gift. Volunteering builds communities. Skills shared teach, heal, uplift. From teaching kids to coding for nonprofits, every contribution adds value. It's not just about money; it's about heart. Volunteer. Make a difference.
                    </p>
                </div>
            </div>
            <MinAbout/>
        </div>
    )
}

export default Welcome;