
import car from '../../assets/images/used.jpg';
import React, { useContext, useState, useEffect } from 'react';
import { BackendContext } from '../context/BackendContext';

import {MdVerified, MdMenu,MdOutlineDiversity3,MdLocationPin, MdLocationOn,MdMan4,MdLocationCity,MdGroups2} from "react-icons/md";
import {HiUserGroup} from "react-icons/hi";
import {CgOrganisation} from "react-icons/cg";

import { contractAddress , contractAbi } from '../context/constants';

const PostCardView = (data) => {


    // var mData = {
    //                 postId:"12900",
    //                 mAddress:"wdfdhfjdhfjhdf",
    //                 affiliation:" World health Org",
    //                 minAmount:"100 trx",
    //                 caption:"School fees",
    //                 message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A aperiam asperiores repellendus, expedita eos aliquid eveniet itaque. Consequatur exercitationem odit corrupti delectus eveniet. Mollitia nulla soluta ipsam alias, sapiente labore.",
    //                 mediaUrls: "",
    //                 dateCreated: "",
    //                 verified: true,
    //                 firstName: "Zambwe",
    //                 lastName: "Nasilele",
    //                 profileType: "Individual",
    //                 location: "Kalulushi, Zambia" 
                
    //             };

    // if(data!= null){
    //     mData = data;
    // }

    //get Id

    const getId = () => {
        console.log(mData.postId);
        return mData.postId;
        //navigate('/profile');
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

    //Setting Caption
    const proCaption = () => {
        let cap = "";
        if(mData.caption!=null && mData.caption != ""){
            cap = mData.caption;

            return <h5 className=" font-semibold">{cap} </h5>
        }
    }

    //Setting Message
    const proMessage = () => {
        let msg = "";
        if(mData.message!=null && mData.message != ""){
            msg = mData.message;

            return <p className=" text-sm text-left text-gray-700">{msg} </p>
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
        // if(mData.profileImg != null){
        //     vr = "";
        //     vr = mData.profileImg;
        //     return vr;
        // }
            
        return vr;
    }

    //Setting Media
    const proMedia = () => {
        let vr = proImage();
        // if(mData.mediaUrls != null && mData.mediaUrls != ""){
        //     vr = "";
        //     vr = mData.profileImg;
        //     return vr;
        // }
            
        return vr;
    }

    //Setting profile status
    const minIconStyle = {color:"purple"}


    const proOrg = () => {
        let org = "Individual";
        if(mData.profileType!=null && mData.profileType != ""){
            org = mData.profileType;

            return <div className=" flex text-sm gap-2 items-center">
                <MdVerified style={minIconStyle}/>
                <p className="text-sm">{org} </p>
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
        if(mData.location!=null && mData.location != ""){
            location = mData.location;

            return <div className=" flex text-sm gap-2 items-center">
                <MdLocationPin style={minIconStyle}/>
                <p className="text-xs">{location} </p>
            </div>
        }

        return null
    }

    //Setting profile Affiliation
    const proAffiliation = () => {
        let affli = "";
        if(mData.affiliation!=null && mData.affiliation != ""){
            affli = mData.affiliation;

            return <div className=" flex text-sm gap-2 items-center">
                <MdOutlineDiversity3 className=" " style={minIconStyle}/>
                <p className="text-xs cursor-pointer ">Zambia foundation</p>
            </div>
        }

        return null
    }

    const menuStyle = {color:"white", fontSize:"2.0em"}

    const cardViewHandleClick = (e) => {

        e.preventDefault();

        console.log("My id", getId());
    }

    return (
        <div className="mb-2 p-2 cursor-pointer border-2 rounded-md shadow-md" name="zana post" key={getId} onClick={(e)=>{cardViewHandleClick(e)}}>
            <div className="mb-2 flex flex-row justify-between pe-4">
                <div className=' flex flex-row justify-center items-center gap-1 cursor-pointer'>
                    <div className=' w-10  md:me-2 '>
                        <img className=' w-full h-full ' src={proImage()} alt="post-profile-pic" />
                    </div>
                    <h5 className=' font-bold'>{proName()}</h5>
                    {proVeried()}
                </div>
                <div className=' cursor-pointer'>
                    <MdMenu style={menuStyle} />
                </div>
            </div>
            <div className=' grid grid-cols-[auto,auto] gap-2 justify-center'>
            
                <div className=' w-36 md:me-2'>
                    <img className=' w-full h-full' src={proMedia()} alt="post-profile-pic" />
                </div>
                <div className=' grid grid-row[auto]'>
                    <div className=' flex flex-row items-center justify-between'>
                        {proCaption()}
                        <button className=' px-4 py-1 bg-purple-800 text-white rounded-s-full rounded-e-full text-sm'>donate</button>
                    </div>
                    {proMessage()}
                    <hr />
                    <div className=' flex flex-row  text-xs md:text-xs gap-2 text-gray-500'>
                        {proOrg()}
                        {proLocation()}
                        {proAffiliation()}
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}

const Posts = ({props}) => {

    const { postData, setPostsData } = useContext(BackendContext);

    const iconsStyle = {color:"blue", fontSize:"2.0em"}

    const getPost = () =>{
        num++;
        
         console.log("getting profile and Num is: ", num);
        
         //getProfiles();
        // console.log(profilesData)
     }
     

     const myAddress = "TJK1HyqM1XeVe1kY6RKkzwKWSU97hYrNhr";

     const myTronweb = window.tronWeb;

     useEffect(() => {

        (async () => {

            try {
                
                const instance = await myTronweb.contract(contractAbi,contractAddress);
                const mPosts = await instance.getUserPosts(myAddress).call();

                /*
                mPosts.forEach(element => {
                    
                    const mData = {
                        
                        postId: myTronweb.toUtf8(element.postId),
                        address: element.mAddress,
                        affiliation: element.affliation,
                        minAmount: myTronweb.toUtf8(element.minAmount),
                        caption: window.tronWeb.toUtf8(element.caption),
                        message: myTronweb.toUtf8(element.message),  
                        mediaUrl: myTronweb.toUtf8(element.mediaUrls),
                        dateCreated:element.dateCreated,
                        dateModifies: element.dateModified, 

                    
                    };

                    setPostData((prevState) => [...prevState,mData])
                    console.log(pagesData)
                });
                    */
                console.log("Posts ",mPosts);
            } catch (error) {
                console.log(error);
            }
            
        })();
      
        // return () => {
        // };
    }, []);


    const posts =  postData.map((items,index)=> {
        if (items == null || items == undefined){
            items ="";
            console.log("Item key",index);
        }
            
        return <PostCardView data={items}/>
    })

    return (
        <div>
            {posts}
        </div>
    )
}

export default Posts;