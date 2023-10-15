
import car from '../../assets/images/user.png';
import React, { useContext, useState, useEffect } from 'react';
import { BackendContext } from '../context/BackendContext';

import {MdVerified, MdMenu,MdOutlineDiversity3,MdLocationPin, MdLocationOn,MdMan4,MdLocationCity,MdGroups2} from "react-icons/md";
import {HiUserGroup} from "react-icons/hi";
import {CgOrganisation} from "react-icons/cg";
import { Link } from 'react-router-dom';

import { storage } from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { urlpath } from '../../utils';
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
        
        if(mData != null){
            if(mData.profileImge != null){
                vr = "";
                vr = mData.profileImge;
                return vr;
            }
       }
            
    }



    //Setting profile status
    const proOrg = () => {
        let org = "Individual";
        if(mData.profileType!=null && mData.profileType != ""){
            org = mData.profileType;

            return <div className=" flex text-sm gap-2 items-center">
                <MdGroups2 style={minIconStyle}/>
                <p className="text-xs">{org} </p>
            </div>
        }

        return <div className=" flex text-sm gap-2 items-center">
                <MdGroups2 style={minIconStyle}/>
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
        <Link to={"/profile" } state={mData.mAddress}>
            
            <div className=' bg-gray-100 grid grid-cols-[auto,auto] gap-2 justify-start  my-4 border-2 rounded-md p-2 shadow-md'>
                
                <div className='  w-36 md:me-2 '>
                    <img className=' w-full h-full max-w-24 max-h-24 ' src={proImage()} alt="" id='profileimagec'/>
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

    const myTronweb = window.tronWeb;

    const [load, setLoad] = useState(false);
    const [lastIndex, setLastIndex ] = useState(false);
    const [ perPage, setPerPage ] = useState(4);
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [ initIndex, setInitIndex ] = useState(true)

    let num = 0;

    useEffect(() => {

        (async () => {
            try {

                const instance = await myTronweb.contract(contractAbi,contractAddress);

                let profileCounter = await instance.getProfileCounter().call();
                console.log("Counter  ",profileCounter.totalProfiles.toNumber());
                
                let total  = profileCounter.totalProfiles.toNumber()

                if(initIndex){

                    num = currentIndex;

                    for(let i = 0; i < perPage ; i++){
    
                        setLoad(true);
                        if(num > total){
                            setLastIndex(true)
                            break;
                        }
                        setLastIndex(false)
    
                        const maDress = await instance.getProfileAddress(1).call();
                        
                       
                        if(myTronweb.isAddress(maDress.userAddress) ){
                            const myProfile = await instance.getProfile(myTronweb.address.fromHex(maDress.userAddress)).call();
                           
                            
                            if(myProfile.userAddress.userName.firstName != null)
                            
                            
                            if(myProfile.userAddress.userName.firstName != ''){
                                
                                var url = ''
                                try {
                                const profileUrl = await getDownloadURL(ref(storage,"profileImg/"+urlpath));
                                url = profileUrl;
                                
                                } catch (error) {
                                    console.log(error)
                                }
                                const mData = {
                                    
                                    mAddress: myProfile.userAddress.mAddress,
                                    firstName: myProfile.userAddress.userName.firstName,
                                    lastName: myProfile.userAddress.userName.lastName,
                                    profileType: myTronweb.toUtf8(myProfile.userAddress.ProfileType),
                                    email: window.tronWeb.toUtf8(myProfile.userAddress.Contact.email),
                                    website: myTronweb.toUtf8(myProfile.userAddress.Contact.website),  
                                    phone: myProfile.userAddress.Contact.phone,
                                    physicalAddress: myTronweb.toUtf8(myProfile.userAddress.Contact.physicalAddress),
                                    bio:myProfile.userAddress.bio, 
                                    country: myTronweb.toUtf8(myProfile.userAddress.Contact.country), 
                                    verified: myProfile.userAddress.isVeried,
    
                                    profileImge: url,
    
                                    
                                
                                };
                                
            
                                setPagesData((prevState) => [...prevState,mData])
                                console.log(pagesData)
                                num ++;
                            }
                            
    
                        }
    
                    }

                    setLoad(false);
                }

                setCurrentIndex(num);
                
            } catch (error) {
                setCurrentIndex(num);
                console.log(error);
            }
            
        })();
      
        // return () => {
        // };
    },[initIndex]);

    const Loader = (classProps) => {
        return (
            <div className=" flex justify-center items-center py-3">
                <div className={` animate-spin rounded-full h-10 w-10  ${classProps} border-b-4 border-purple-500`}/>
            </div>
        )
    }

    const profiles =  pagesData.map((items,index)=> {
        if (items == null || items == undefined){
            items ="";
            console.log("Item key",index);
        }
            
        return <PagesCardView data={items} />
    })

    return (
        <div className=' max-h-screen overflow-y-auto px-2'>
            {profiles}
            <div>
                { load?  <Loader/> : lastIndex ? <p className=' text-gray-700'>No more pages</p> : <button className=' border-b-2 px-6 py-1 animate-pulse text-gray-700' onClick={()=>{setInitIndex(true)}}>more...</button>}
                
            </div>
        </div>
    )
}

export default Pages;