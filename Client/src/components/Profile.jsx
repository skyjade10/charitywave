
import dp from "../assets/images/dp.png";
import cover from "../assets/images/used.jpg";
import {MdArrowBack, MdVerified,MdMenu,MdMyLocation,MdPhone,MdEmail } from "react-icons/md";
import { CgWebsite } from 'react-icons/cg';
import { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {  } from "react";

const Profile = () => {

    var mData = {
        postId:"12900",
        mAddress:"wdfdhfjdhfjhdf",
        email:" World health Org",
        contact:"09722893465",
        website: "www.zana.com",
        homeAddress: "2516 Zamclay",
        dateCreated: "",
        verified: false,
        firstName: "Zambwe",
        lastName: "Nasilele",
        profileType: "Individual",
        location: "Kalulushi, Zambia", 
        profileImg: "",
        coverImg: "",
        bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur consequatur tenetur at, sit dolorem ipsum saepe similique voluptatem, animi, vero sapiente. Accusamus cupiditate nostrum consequatur dignissimos consectetur ea nulla minima."
    
    };


    // if(data!= null){
    //     mData = data;
    // }

    //get Id

    const getId = () => {
        console.log(mData.postId);
        navigate('/profile');
    }

    //Setting Name
    const proName = () => {
        let fn ="";
        let ln ="";
        if (mData.firstName!=null)
            fn = mData.firstName;
        
        if (mData.lastName!=null)
            ln = mData.lastName;

        return fn.concat(" ").concat(ln);
    }

    //Setting verified
    const proVeried = () => {
        let vr = false;
        if(mData.verified != null)
            vr = mData.verified;
            if(vr)
                return <MdVerified style={verifiedIconStyle}/>
            return <div></div>
    }

    //Setting image
    const proImage = () => {
        let vr = cover;
        if(mData.profileImg != null && mData.profileImg != ""){
            vr = "";
            vr = mData.profileImg;
            return vr;
        }
            
        return vr;
    }

    //Setting Media
    const proCover = () => {
        let vr = cover;
        if(mData.coverImg != null && mData.coverImg != ""){
            vr = "";
            vr = mData.proCover;
            return vr;
        }
            
        return vr;
    }

     //Setting profile status
     const proOrg = () => {
        let org = "Individual";
        if(mData.profileType!=null && mData.profileType != ""){
            org = mData.profileType;

            return <p >{org} </p>
        }

        return <p >{org} </p>
        
    }

    //Setting profile Location
    const proEmail = () => {
        let email = "";
        if(mData.location!=null && mData.email != ""){
            email = mData.email;

            return email;
        }

        return null
    }

    //Setting profile Location
    const proContact = () => {
        let contact = "";
        if(mData.contact!=null && mData.contact != ""){
            contact = mData.contact;

            return contact;
        }

        return null
    }

    //Setting profile Location
    const proAddress = () => {
        let homeAddress = "";
        if(mData.homeAddress!=null && mData.homeAddress != ""){
            homeAddress = mData.homeAddress;

            return homeAddress;
        }

        return null
    }

    //Setting profile Location
    const proWebsite = () => {
        let website = "";
        if(mData.website!=null && mData.website != ""){
            website = mData.website;

            return website;
        }

        return null
    }

    //Setting profile Location
    const proLocation = () => {
        let location = "";
        if(mData.location!=null && mData.location != ""){
            location = mData.location;

            return location;
        }

        return null
    }


    //Setting profile Location
    const proBio = () => {
        let bio = "";
        if(mData.bio!=null && mData.bio != ""){
            bio = mData.bio;

            return bio;
        }

        return null
    }



    const iconStyle = {color: "#465CF0", fontSize: "1.5em"}; 
    const bio = () => {
        return <div className=" ">
                    <div className="flex justify-around items-center my-2">

                        <div className=" grid grid-cols-2 gap-1 content-start text-left">
                            <p className=" font-bold">Name:</p> <p>{proName()}</p>
                            <p className=" font-bold">Email:</p> <p>{proEmail()}</p>
                            <p className=" font-bold">Phone:</p> <p>{proContact()}</p>
                            <p className=" font-bold">Address:</p> <p>{proAddress()}</p>
                            <p className=" font-bold">Website:</p> <p>{proWebsite()}</p>
                            <p className=" font-bold">Location:</p> <p>{proLocation()}</p>
                            <p className=" font-bold">Type:</p> <p>{proOrg()}</p>
                            
                        </div>
                    </div>
                    <div className="  flex flex-col items-center">
                        <p className=" font-bold">Bio:</p> 
                        <p className=" lg:w-1/2 border-t-2">{proBio()}</p>
                    </div>
                    
               </div>
    }


    const posts = () => {
        return <div className=" ">
                    <div className="flex justify-around items-center my-2">

                    POSTS POSTS
                    </div>
                    <div className="  flex flex-col items-center">
                        <p className=" font-bold">Bio:</p> 
                        <p className=" lg:w-1/2 border-t-2">{proBio()}</p>
                    </div>
                    
               </div>
    }

    const [postAboutToggle, setPostAboutToggle ] = useState(false);
    const location = useLocation();
    //const {addressToProfile } = location.state;

    const getProfile = async () => {

        try {

            const profile = await getVoyteContract.getProfile(voyteUser.address).send({
                feeLimit:100_000_000,
                callValue:0,
                shouldPollResponse:true
              });

              console.log(profile);
            
        } catch (error) {
            console.log(error);
        }

    }

   // useEffect(getProfile,[]);

    return (

        <div className=" overflow-y-scroll h-[600px]">
            <div className="fixed flex w-full  h-8 justify-end items-center m-4">
                {/* <MdArrowBack style={iconStyle}/> */}
                <Link to={"/editprofile"}>
                    <button className=" text-white shadow-md py-1 px-4 me-10 text-sm bg-purple-900 rounded-s-full rounded-e-full hover:bg-purple-800 "> Edit Profile</button>
                </Link>
            </div>
            <div className=" shadow justify-center flex  bg-zinc-600">
                <img src={proCover()} alt="" className=" h-32  lg:h-[300px] sm:h-[200px]"/>
            </div>
            <div className=" z-50 flex flex-row items-center -mt-4 sm:-mt-12 lg:-mt-20 ms-2 m-4 ">
                <img src={proImage()} alt="" className="w-20 h-20 sm:w-36 sm:h-36 lg:w-60 lg:h-60  
                rounded-full bottom-1 shadow-md border-2 sm:border-4 border-zinc-800 "/>
                <div className="flex flex-col items-start ms-4 sm:ms-4 lg:ms-10 w-full">
                    <div className="flex gap-2 flex-row w-full justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <h2 className=" font-bold lg:text-5xl">{proName()}</h2>
                            {proVeried()}
                        </div>
                        {/* <p className=" text-xs bg-fuchsia-900  px-2 py-1 mt-4 sm:px-4  sm:py-2 sm:mt-4  
                        sm:text-sm w-auto text-white rounded-full cursor-pointer ">Following</p> */}
                    </div>
                    <p className=" text-xs sm:text-sm md:text-base lg:text-lg">{proOrg()}</p>
                </div>
            </div>

            <hr />
            <div className=" flex justify-center flex-initial my-2">
                <div className="text-sm text-zinc-700 flex flex-col gap-2 ">
                    <div className=" flex flex-row gap-2 items-center">
                        <MdMyLocation/>
                        <p>{proLocation()}</p>
                    </div>
                    <div className=" flex flex-row gap-2 items-center">
                        <MdPhone/>
                        <p>{proContact()}</p>
                    </div>
                    <div className=" flex flex-row gap-2 items-center">
                        <MdEmail/>
                        <p>{proEmail()}</p>
                    </div>
                    <div className=" flex flex-row gap-2 items-center">
                        <CgWebsite/>
                        <p>{proWebsite()}</p>  
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex justify-center gap-2 h-10  font-bold ">
                <button className={` cursor-pointer w-20 border-b-2 ${postAboutToggle?"border-purple-900" :""} 
                ease-linear duration-75   hover:text-gray-500`} onClick={()=>{setPostAboutToggle(true)}}>Post</button>
                <div className=" flex items-center "><hr className=" w-[1px] h-[70%] bg-gray-400"/></div>
                <button className={` cursor-pointer w-20 border-b-2 ${postAboutToggle?"" :" border-purple-900 ease-linear duration-75"}
                   hover:text-gray-500`} onClick={()=>{setPostAboutToggle(false)}}>About</button>
            </div>
            <hr />
            <div>
                {!postAboutToggle && (bio()) }
                {postAboutToggle && (posts()) }
            </div>
        </div>
    )
}

export default Profile;