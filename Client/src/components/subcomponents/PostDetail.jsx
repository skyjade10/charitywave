
import React, { useEffect, useState } from "react";

import { MdMenu, MdVerified } from "react-icons/md";
import media from '../../assets/images/used.jpg'


const PostDetailCard = ({data}) => {

    var mData = {
        postId:"12900",
        mAddress:"wdfdhfjdhfjhdf",
        affiliation:" World health Org",
        minAmount:"100 trx",
        caption:"School fees",
        message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A aperiam asperiores repellendus, expedita eos aliquid eveniet itaque. Consequatur exercitationem odit corrupti delectus eveniet. Mollitia nulla soluta ipsam alias, sapiente labore.",
        mediaUrls: "",
        dateCreated: "",
        verified: false,
        firstName: "Zambwe",
        lastName: "Nasilele",
        profileType: "Individual",
        location: "Kalulushi, Zambia" 
    
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
        let vr = media;
        if(mData.profileImg != null){
            vr = "";
            vr = mData.profileImg;
            return vr;
        }
            
        return vr;
    }

    //Setting Media
    const proMedia = () => {
        let vr = proImage();
        if(mData.mediaUrls != null && mData.mediaUrls != ""){
            vr = "";
            vr = mData.profileImg;
            return vr;
        }
            
        return vr;
    }

    //Setting Message
    const proMessage = () => {
        let msg = "";
        if(mData.message!=null && mData.message != ""){
            msg = mData.message;

            return <p className=" text-base text-left">{msg} </p>
        }
    }

    const verifiedIconStyle = {fontSize:"1.0em"};
    const menuIconStyle = {fontSize:"2.0em"};
    const imgStyle = {paddingTop:"0%"};

    //list people who have made donations

    const [ donorData, setDonorData ] = useState([{address:'2434343',name:'Zambwe Nasilele',amount:5000}]);

    const donorList = donorData.map((items) => {
        if(items != null && items != ""){

             const address = items.address;
             const name = items.name;
             const amount = items.amount;

            return <div className=" flex flex-row justify-center gap-4 items-center py-1">
                        <div className=" w-10 h-10 ">
                            <img className=" w-full h-full border-2 border-gray-500 rounded-full" src={media} alt="" />
                        </div>
                        <p>{`${name} donated ${amount} Trx`}</p>
                    </div>
        }

    })

    //shows donations made

    const [ donationData, setDonationData ] = useState([{address:'2434343',name:'Zambwe Nasilele',amount:5000}]);

    const donationList = donationData.map((items) => {
        if(items != null && items != ""){

             const address = items.address;
             const name = items.name;
             const amount = items.amount;

            return <div className=" flex flex-row justify-center gap-4 items-center py-1">
                        <div className=" w-10 h-10 ">
                            <img className=" w-full h-full border-2 border-gray-500 rounded-full" src={media} alt="" />
                        </div>
                        <p>{`${name} donations ${amount} Trx`}</p>
                    </div>
        }

    })

    

    const [donationDonorToggle, setDonationDonorToggle] = useState(false);


    return (
        <div className=" px-4 border-x-2">
            <div className=" flex flex-row justify-between py-2">
                <div className=" flex flex-row items-center gap-2 font-bold text-2xl cursor-pointer">
                    <div className=" w-12" style={imgStyle}>
                        <img className=" w-full h-full" src={proMedia()} alt="" />
                    </div>
                    <h5>{proName()}</h5>
                    {proVeried()}
                </div>
                <div className=" cursor-pointer">
                    <MdMenu style={menuIconStyle}/>
                </div>
            </div>
            
            <div className=" flex justify-center bg-[#1E1E1E] mb-2" style={imgStyle}>
                <img className=" w-auto h-full" src={proMedia()} alt="" />
            </div>
            {proMessage()}
            <hr className=" my-2"/>
            <div className=" flex flex-row justify-between">
                <div className=" flex flex-row justify-center gap-2">
                    <button className="  w-28 border-b-4 border-purple-900 hover:border-purple-500" onClick={()=>{
                        setDonationDonorToggle(true)
                        }} >Donors</button>
                    <button className=" w-28 border-b-4  border-purple-900 hover:border-purple-500"  onClick={()=>{setDonationDonorToggle(false)}} >Donations</button>
                </div>
                <button className=" bg-purple-900 hover:bg-purple-500 text-white py-2 px-6 rounded-s-full rounded-e-full" >Donate</button>
            </div>
            <hr className=" my-2"/>
            <div className="flex flex-col text-sm bg-gray-200 p-2 ">

                {donationDonorToggle && (donorList)}
                {!donationDonorToggle && (donationList)}
                
            </div>
        </div>
    )
}


const PostDetail = () => {

    return (
        <div>
            <PostDetailCard/>
        </div>
    )
}


export default PostDetail;