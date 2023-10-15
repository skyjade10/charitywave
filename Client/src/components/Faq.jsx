import React, { useContext, useState,useRef } from "react";

import { decodePath, urlpath ,randomPostId } from "../utils";


const Faq = () => {



    const para = " text-sm"
    const header = " text-lg"

    const text = () => {
        console.log("address to string encode",urlpath );
        console.log("address to string decode", decodePath(urlpath));
        console.log("random",randomPostId() );
    }

    return (
        <div className="background-gradient w-full min-h-screen grid grid-col-[auto] justify-center">
            
            <div className="bg-gray-50 flex w-fit md:w-[500px] lg:w-[700px] flex-col text-left items-center  border-2 rounded-lg shadow-md m-4 gap-4 ">
                <div className=" mt-4 font-bold border-b-2 w-3/4 mx-4 pb-2">
                        <h2>FAQ</h2>
                </div>
                <div className="px-20 flex-initial  items-start text-gray-800">
                    <div className={` ${para}`}>
                        <h2 className={` ${header}`}>1. What is the purpose of Affiliation? </h2>
                        <p className=" ms-5">This is an open place and anyone can create an if they need help. but how do you tell, if someone is genuine for those that have not been veried?</p>
                        <p className=" ms-5">The person can ask for Affiliation from an already veried person or organisation. And the Affiliated to oraganisation, acknowleges you, giving assurance to donors </p>
                        {/* <ul className=" ms-10">
                            <li>Its shows that the person</li>
                        </ul> */}

                    </div>
                </div>
                

            </div>
            
        </div>
    )
}

export default Faq;