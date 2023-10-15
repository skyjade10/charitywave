
import cover from "../assets/images/cover4.jpg";
import user from "../assets/images/cover3.jpg"
import {MdArrowBack, MdVerified,MdMenu,MdMyLocation,MdPhone,MdEmail } from "react-icons/md";
import { CgWebsite } from 'react-icons/cg';
import { useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { useParams  } from "react-router-dom";
import {  } from "react";

import { contractAbi, contractAddress } from "./context/constants";
import { urlpath,decodePath, ecodeAddress, } from "../utils";
import { storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { BackendContext } from "./context/BackendContext";

const Profile = () => {

    const { voyteUser } = useContext(BackendContext)
    const [postAboutToggle, setPostAboutToggle ] = useState(false);
    var [ profileData, setProfileData ] = useState(null);
    const routeParams = useParams();

    //  var mmData = {
    //      postId:"12900",
    //      mAddress:"wdfdhfjdhfjhdf",
    //      email:" World health Org",
    //      contact:"09722893465",
    //      website: "www.zana.com",
    //      homeAddress: "2516 Zamclay",
    //      dateCreated: "",
    //      verified: false,
    //      firstName: "Zambwe",
    //      lastName: "Nasilele",
    //      profileType: "Individual",
    //      location: "Kalulushi, Zambia", 
    //      profileImg: "",
    //      coverImg: "",
    //      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur consequatur tenetur at, sit dolorem ipsum saepe similique voluptatem, animi, vero sapiente. Accusamus cupiditate nostrum consequatur dignissimos consectetur ea nulla minima."
    
    //  };


    
    //get Id

    const mData = profileData;

    const getId = () => {
        console.log(mData.postId);
    }

    //Setting Name
    const proName = () => {
        let fn ="";
        let ln ="";
         console.log("try", mData)
         if(mData != null){
            
             if (mData.firstName!=null)
                 fn = mData.firstName;
           
             if (mData.lastName!=null)
                 ln = mData.lastName;
         }

         return fn.concat(" ").concat(ln);
    }

    //Setting verified
    const proVeried = () => {
         let vr = false;
         if(mData != null){
            
             if(mData.verified != null)
                 vr = mData.verified;
                 if(vr)
                     return <MdVerified style={verifiedIconStyle}/>
                 return <div></div>
         }
    }

    //Setting image
    const proImage = () => {
        let vr = cover;
        
        if(mData != null){
            
            if(mData.profileImg != null){
                vr = "";
                vr = mData.profileImg;
                return vr;
            }
       }

            
    }

    //Setting Media
    const proCover = () => {
        let vr = cover;

        if(mData != null){
            
            if(mData.coverImg != null && mData.coverImg != ""){
                vr = "";
                vr = mData.coverImg;
                return vr;
            }
        }
            
        return '';
    }
    

     //Setting profile status
     const proOrg = () => {
         let org = "Individual";

         if(mData != null){
            
             if(mData.profileType!=null && mData.profileType != ""){
                 org = mData.profileType;
   
                 return org
             }
         }

         return org
        
    }

    //Setting profile Location
    const proEmail = () => {
         let email = "";
         if(mData != null){
            
             if(mData.email!=null && mData.email != ""){
                 email = mData.email;
   
                 return email;
             }
         }

         return email
    }

    //Setting profile Location
    const proContact = () => {
         let contact = "";

         if(mData != null){
            
             if(mData.phone!=null && mData.phone != ""){
                 contact = mData.phone;
   
                 return contact;
             }
         }

         return contact
    }

    //Setting profile Location
    const proAddress = () => {
         let homeAddress = "";
         if(mData != null){
            
             if(mData.physicalAddress!=null && mData.physicalAddress != ""){
                 homeAddress = mData.physicalAddress;
   
                return homeAddress;
             }
         }

         return homeAddress
    }

    //Setting profile Location
    const proWebsite = () => {
         let website = "";
         
         if(mData != null){
            
             if(mData.website!=null && mData.website != ""){
                 website = mData.website;
   
                 return website;
             }
         }

         return website
    }

    //Setting profile Location
    const proLocation = () => {
         let locationc = "";
         if(mData != null){

             if(mData.country!=null && mData.country != ""){
                locationc = mData.country;

                 console.log("My location",locationc)
   
                 return locationc;
             }
         }

         return locationc
    }


    //Setting profile Location
    const proBio = () => {
         let bio = "";
          if(mData != null){
            if(mData.bio!=null && mData.bio != ""){
                bio = mData.bio;
  
                return bio;
            }
          }

         return bio
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

    const [loading,setLoading ] = useState(false);
    const myTronweb = window.tronWeb;
    useEffect(() => {
        
        (async () => {

            try {

                const userAddress = decodePath(routeParams.user_address);
                
                const instance = await myTronweb.contract(contractAbi,contractAddress);
                const myProfile = await instance.getProfile( window.tronWeb.address.fromHex(userAddress)).call();
                const profileUrl = await getDownloadURL(ref(storage,"profileImg/"+urlpath));
                const coverUrl = await getDownloadURL(ref(storage,"coverImg/"+urlpath));

                var mmData = null;
                //setProfileData(myProfile);
                console.log("My Profile ", myProfile)
                if(myProfile.userAddress.userName.firstName != '' ){

                    mmData = {
                        
                        mAddress: myTronweb.toAscii(myProfile.userAddress.mAddress),
                        firstName: myProfile.userAddress.userName.firstName,
                        lastName: myProfile.userAddress.userName.lastName,
                        profileType: myTronweb.toAscii(myProfile.userAddress.ProfileType),
                        email: window.tronWeb.toAscii(myProfile.userAddress.Contact.email),
                        website: myTronweb.toAscii(myProfile.userAddress.Contact.website),  
                        phone: myProfile.userAddress.Contact.phone,
                        physicalAddress: myTronweb.toAscii(myProfile.userAddress.Contact.physicalAddress),
                        bio:myProfile.userAddress.bio, 
                        country: myTronweb.toAscii(myProfile.userAddress.Contact.country),  
                        verified: myProfile.userAddress.isVeried,

                        profileImg: profileUrl,
                        coverImg: coverUrl,
        
                    
                    };

                    proImage();
        
                    
                        
                }

                console.log("my dataaa", profileData);
                setProfileData(mmData)
                console.log("my data", mmData);
               
            } catch (error) {
                console.log(error);
            }
            
        })();
      
         return () => {
            console.log(mData)
         };
    }, []);

    return (
     <div className=" overflow-y-scroll h-[600px]">
        <div className="fixed flex w-full  h-8 justify-end items-center m-4">
            
            {/* <MdArrowBack style={iconStyle}/> */}
            <Link to={`/${ecodeAddress(voyteUser.address)}/editprofile`} state={profileData} >
                <button className=" text-white shadow-md py-1 px-4 me-10 text-sm bg-purple-900 rounded-s-full rounded-e-full hover:bg-purple-800 "> Edit Profile</button>
            </Link>
        </div>
        <div className=" shadow justify-center flex  bg-zinc-600">
            <img src={proCover()} alt="" className=" h-32  lg:h-[300px] sm:h-[200px]"/>
        </div>
        <div className=" z-50 flex flex-row items-center -mt-4 sm:-mt-12 lg:-mt-20 ms-2 m-4 ">
            <img src={proImage()} alt="" className="w-20 h-20 sm:w-36 sm:h-36 lg:w-60 lg:h-60  
             bottom-1 border-[1px] shadow-sm  sm:border-[1px] bg-gray-500 border-gray-700 "/>
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