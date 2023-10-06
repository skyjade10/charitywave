import React,{ useState} from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import mainImage from '../assets/images/hopecover.jpg'
import { BackendContext } from "./context/BackendContext";

const Listm =({text,link,classProps}) =>{
    return (
        <Link to={link}>
            <button className={` hover:bg-blue-500 active:bg-gray-500 cursor-pointer rounded-md text-white bg-blue-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 ${classProps}`}>
                <p>{text}</p>
            </button>
        </Link>
        
    )
}

const Welcome = () => {

    const { getVoyteContract,tronLinkIsConnected,connectWallet,currentAccount } = useContext(BackendContext);

    return (
        <div className=" object-contain ">
            <div className=" lg:h-[500px]">
                <img className=" w-full h-full" src={mainImage} alt="main" />
            </div>
            <div className="absolute mx-8 top-40 md:mt-40 lg:top-40 text-white flex flex-col gap-4">
                <div>
                    <h2 className="   md:text-2xl lg:text-4xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(112,26,117,0.8)]">
                        Welcome to Charity Wave
                    </h2>

                    <p className="drop-shadow-[0_1.2px_1.2px_rgba(112,26,117,0.8)] ">
                        A donation platform, helping you reach million
                    </p>
                </div>
            </div>
            <div className="absolute w-full -mt-7 ">
                <div className="flex flex-col lg:flex-row  justify-center gap-4">
                    <Listm link={"/post"} text="Donations"/>
                    <Listm link={"/page"} text="Organizations"/>
                    <Listm link={"/search"} text="SignUp"/>
                    
                    
                </div>
            </div>

            <div className=" flex flex-col mt-10 gap-2 lg:flex-col bg-gray-300 ">
                <div className=" flex flex-col justify-center items-center px-4  gap-2 m-4 text-gray-600 text-sm lg:flex-row">
                    <div className="  lg:w-[500px]">
                        <img className=" w-full h-full" src={mainImage} alt="main" />
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste eveniet adipisci sit pariatur neque obcaecati modi fuga temporibus, corporis perspiciatis nam laudantium quod natus sequi inventore sapiente commodi voluptate! Accusamus.
                    </p>
                </div>

                <div className=" flex flex-col justify-center items-center px-4 gap-2 m-4 text-gray-600 text-sm lg:flex-row-reverse">
                    <div className="  lg:w-[500px]">
                        <img className=" w-full h-full" src={mainImage} alt="main" />
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste eveniet adipisci sit pariatur neque obcaecati modi fuga temporibus, corporis perspiciatis nam laudantium quod natus sequi inventore sapiente commodi voluptate! Accusamus.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Welcome;