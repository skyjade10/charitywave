
import car from '../../assets/images/used.jpg';
import React, { useContext, useState, useEffect } from 'react';
import { BackendContext } from '../context/BackendContext';

import {MdVerified, MdMenu,MdOutlineDiversity3,MdLocationPin, MdLocationOn,MdMan4,MdLocationCity,MdGroups2} from "react-icons/md";
import {HiUserGroup} from "react-icons/hi";
import {CgOrganisation} from "react-icons/cg";
import { Link } from 'react-router-dom';

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { contractAddress , contractAbi } from '../context/constants';

const PagesCardView = ({data}) => {

    

    // var mData = {
    //                 postId:"12900",
    //                 mAddress:"wdfdhfjdhfjhdf",
    //                 minAmount:"100 trx",
    //                 message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A aperiam asperiores repellendus, expedita eos aliquid eveniet itaque. Consequatur exercitationem odit corrupti delectus eveniet. Mollitia nulla soluta ipsam alias, sapiente labore.",
    //                 mediaUrls: "",
    //                 dateCreated: "",
    //                 verified: true,
    //                 firstName: "Zambwe",
    //                 lastName: "Nasilele",
    //                 profileType: "Individual",
    //                 location: "Kalulushi, Zambia" 
                
    //             };

    const mData = data;
    //  if(data!= null){
    //      mData = data;
    //  }

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


    //Setting Message
    const proMessage = () => {
        let msg = "";
        if(mData.bio!=null && mData.bio != ""){
            msg = mData.bio;

            return <p className=" min-w-[90vh] min-h-[50px] text-sm text-left text-gray-700">{msg} </p>
        }
    }

    //Setting verified
    const proVeried = () => {
        let vr = false;
        if(mData.verified != null)
            vr = mData.verified;
            if(vr)
                return <MdVerified style={minIconStyle}/>
            return <div></div>
    }

    //Setting image
    const proImage = () => {
        let vr = car;
        return vr;
        //  if(mData.profileImg != null){
            
        //     return vr;
        //  }
            
    }



    //Setting profile status
    const proOrg = () => {
        let org = "Individual";
        if(mData.profileType!=null && mData.profileType != ""){
            org = mData.profileType;

            return <div className=" flex text-sm gap-2 items-center">
                <MdVerified style={minIconStyle}/>
                <p className="text-xs">{org} </p>
            </div>
        }

        return <div className=" flex text-sm gap-2 items-center">
                <MdVerified style={minIconStyle}/>
                <p className="text-xs">{org} </p>
            </div>
    }

    //Setting profile Location
    const proLocation = () => {
        let location = "";
        if(mData.country!=null && mData.country != ""){
            location = mData.country;

            return <div className=" flex text-sm gap-2 items-center">
                <MdLocationPin style={minIconStyle}/>
                <p className="text-xs">{location} </p>
            </div>
        }

        return null
    }


    const minIconStyle = {color:"purple"}

    return (
        <Link to={"/profile"}>
            
            <div className=' grid grid-cols-[auto,auto] gap-2 justify-center  my-4 border-2 rounded-md p-2 shadow-md'>
                
                <div className='  w-36 md:me-2'>
                    <img className=' w-full h-full' src={proImage()} alt="post-profile-pic" id='profileimagec'/>
                </div>
                <div className=' grid grid-row[auto]'>
                    <div className=' flex flex-row items-center justify-between'>
                        
                        <div className=' flex flex-row justify-center items-center gap-1 cursor-pointer'>
                            <h5 className=' font-bold'>{proName()}</h5>
                            {proVeried()}
                        </div>
                    </div>
                    {proMessage()}
                    <hr />
                    <div className=' flex flex-row text-gray-500 text-xs md:text-xs gap-2'>
                        {proOrg()}
                        {proLocation()}
                    </div>
                    
                </div>
            </div>
        </Link>
    )
}

const Pages = ({props}) => {

    const { pagesData, setPagesData} = useContext(BackendContext);

    const menuStyle = {color:"blue", fontSize:"2.0em"}

    const getProfile = () =>{
        num++;
        
         console.log("getting profile and Num is: ", num);
        
         //getProfiles();
        // console.log(profilesData)
     }



    const myAddress = "TJK1HyqM1XeVe1kY6RKkzwKWSU97hYrNhr";
    const myTronweb = window.tronWeb;
    var profCounter = 0;

    useEffect(() => {

        (async () => {

            try {
                
                const instance = await myTronweb.contract(contractAbi,contractAddress);
                const myProfile = await instance.getProfile(myAddress).call();
    
                const mData = {
                    
                    mAddress: myTronweb.toUtf8(myProfile.mAddress),
                    firstName: myProfile.userName.firstName,
                    lastName: myProfile.userName.lastName,
                    profileType: myTronweb.toUtf8(myProfile.ProfileType),
                    email: window.tronWeb.toUtf8(myProfile.Contact.email),
                    website: myTronweb.toUtf8(myProfile.Contact.website),  
                    phone: myProfile.Contact.phone,
                    physicalAddress: myTronweb.toUtf8(myProfile.Contact.physicalAddress),
                    bio: myTronweb.toUtf8(myProfile.bio), 
                    country: myTronweb.toUtf8(myProfile.country),
                    coverImg: myTronweb.toUtf8(myProfile.coverImg),
                    profileImg: myTronweb.toUtf8(myProfile.profileImg),  
                    verified: myProfile.isVeried,
    
                
                };
    
                setPagesData((prevState) => [...prevState,mData])
                console.log(pagesData)
                profCounter ++;
    
                console.log("my name  ",window.tronWeb.toUtf8(myProfile.bio));
            } catch (error) {
                console.log(error);
            }
            
        })();
      
        // return () => {
        // };
    }, []);


    const profiles =  pagesData.map((items,index)=> {
        if (items == null || items == undefined){
            items ="";
            console.log("Item key",index);
        }
            
        return <PagesCardView data={items} />
    })

    return (
        <div>
            {profiles}
        </div>
    )
}

export default Pages;