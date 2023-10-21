
import car from '../../assets/images/cover3.jpg';
import React, { useContext,useRef, useState, useEffect } from 'react';
import { BackendContext } from '../context/BackendContext';
import { ClientContext } from '../context/ClientContext';


import {MdVerified, MdMenu,MdOutlineDiversity3,MdLocationPin, MdLocationOn,MdMan4,MdLocationCity,MdGroups2} from "react-icons/md";

import { contractAddress , contractAbi } from '../context/constants';
import { urlpath, ecodeAddress } from '../../utils';

import { storage } from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const PostCardView = ({data}) => {

    


    const mData = data;

    const getId = () => {
        console.log(mData.postId);
        return mData.postId.toNumber();
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
        return <div></div>
    }

    //Setting Message
    const proMessage = () => {
        let msg = "";
        if(mData.message!=null && mData.message != ""){
            msg = mData.message;

            return <p className="truncate  text-sm text-left text-gray-700">{msg} </p>
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
    /*
    const proImage = () => {
        let vr = car;

        if(mData != null){
            if(mData.profileImg!=null && mData.profileImg != ""){
                vr = mData.profileImg;
    
                return vr
            }
        }
            
        return vr;
    }

    */

    //Setting Media
    /*
    const proMedia = () => {
        let vr = proImage();
        console.log(mData.mediaUrl)
        if(mData != null){

            if(mData.mediaUrl != null && mData.mediaUrl != ""){
                vr = "";
                vr = mData.mediaUrl;
                return vr;
            }
        }
        return vr;
    }

    */

    //Setting profile status
    const minIconStyle = {color:"purple"}


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
                <p className="text-xs cursor-pointer ">{window.tronWeb.address.fromHex(affli)}</p>
            </div>
        }

        return null
    }


    const profileOnclick = async (e) => {
        e.preventDefault();
        navigate(`/${ecodeAddress((window.tronWeb.address.toHex(mData.affiliation)))}`, { state: window.tronWeb.address.toHex(mData.affiliation) });
        
    }

    
    const { setTransactModalOpen,setTransactionData,currentIndex, setCurrentIndex } = useContext(ClientContext)
    const [ profilePreloadImg, setProfilePreloadImg ] = useState({image:''})
    const [ mediaPreloadImg, setMediaPreloadImg ] = useState({image:''})
    const donate = (mpostID,mname,maddress,minmount) => {
        console.log("Check t=data",mpostID,mname,maddress);
        setTransactionData((prevState) => ({...prevState,name:mname,address:maddress,postId:mpostID,minAmount:minmount}))
    }

    const menuStyle = {color:"gray", fontSize:"2.0em"}
    const navigate = useNavigate();

    const cardViewHandleClick = (e) => {

        e.preventDefault();

        navigate(`/post/${mData.postIndex}/${mData.postId}`)

        console.log("My id", getId());
    }

    const preloadImg = () => {
        const img = new Image();
        img.src = mData.profileImg;
        img.onload = () => {
            setProfilePreloadImg((prevState) => ({...prevState,image:img}) );
            console.log("image loaded");
        }

        img.onerror = () => {
            console.log(error);
        }
    }

    const preloadCoverImg = () => {
        const img = new Image();
        img.src = mData.mediaUrl;
        img.onload = () => {
            setMediaPreloadImg((prevState) => ({...prevState,image:img}) );
            console.log("image loaded");
        }

        img.onerror = () => {
            setMediaPreloadImg((prevState) => ({...prevState,image:profilePreloadImg.image}) );

            console.log("error");
        }
    }

    useEffect(()=> {
    
        preloadImg();
        preloadCoverImg();

    },[]);

    return (
        <div className=" bg-white mb-2 p-2 cursor-pointer border-2 justify-items-stretch rounded-md shadow-md" name="zana post" key={getId} onClick={(e)=>{cardViewHandleClick(e)}}>
            <div className="mb-2 flex flex-row justify-between pe-4 w-full ">
                <div className=' flex flex-row justify-center items-center gap-1 cursor-pointer'>
                    <div className=' w-10  md:me-2 '>
                        <img className=' w-full h-full ' src={profilePreloadImg.image.src} alt="" />
                    </div>
                    <h5 className=' font-bold'>{proName()}</h5>
                    {proVeried()}
                </div>
                <div className=' cursor-pointer'>
                    <MdMenu style={menuStyle} />
                </div>
            </div>
            <div className=' grid grid-cols-[auto,auto] justify-start gap-2 w-full'>
            
                <div className=' w-36 md:me-2 bg-gray-200'>
                    {<img className=' w-full h-full' src={mediaPreloadImg.image.src} alt="" />}
                </div>
                <div className=' grid grid-row[auto]'>
                    <div className = " w-full ow-span-full">
                        <div className='flex flex-row justify-between items-center gap-2' onClick={
                             (e) => { e.stopPropagation()}
                        }>
                            {proCaption()}
                            <button className=' px-4 py-1 bg-purple-800 text-white  rounded-s-full rounded-e-full text-sm' onClick={() => {
                                setTransactModalOpen(true); 
                                donate(getId(),proName(),mData.address,mData.minAmount);
                                }}>donate</button>
                        </div>
                    </div>
                    {proMessage()}
                    <hr />
                    <div className=' flex flex-row items-center  text-xs md:text-xs gap-2 text-gray-500'>
                        {proOrg()}
                        {proLocation()}
                        <Link  to={`/${ecodeAddress(window,mData.mAddress)}`} >
                            <div  onClick={
                                (e) => { e.stopPropagation()
                                    profileOnclick(e)
                                }
                            }>{proAffiliation()}</div>
                        </Link>
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
     

     const { currentIndex, setCurrentIndex } = useContext(ClientContext)
     const [load, setLoad] = useState(false);
     const [lastIndex, setLastIndex ] = useState(false);
     const [ perPage, setPerPage ] = useState(4);
  
     const [ initIndex, setInitIndex ] = useState(true)

     let num = 0;

     useEffect(() => {

        (async () => {

            try {
                const myTronweb = window.tronWeb;

                const instance = await myTronweb.contract(contractAbi,contractAddress);

                const postId = await instance.getPostCounter().call();

                let total  = postId.postCounter.toNumber()

                if(initIndex){

                    console.log("Current index", currentIndex)
                    num = currentIndex;

                    for(let i = 0; i < perPage; i++){

                        setLoad(true);
                        if(num > total){
                            setLastIndex(true)
                            break;
                        }
                        setLastIndex(false)
    
                        const mPosts = await instance.getUserPost(num).call();
                        const myProfile = await instance.getProfile(myTronweb.address.fromHex(mPosts.mAddress)).call();
                        const profileUrl = await getDownloadURL(ref(storage,"profileImg/"+urlpath(window)));
                       
                        let url = ''
                        try {
                            const getMediaUrl = await getDownloadURL(ref(storage,"postimg/"+ urlpath(window) + "/" + mPosts.postId));
                            url = getMediaUrl
                        } catch (error) {
                            console.log(error)
                        }
            
                        const mData = {
                            
                            postIndex: i,
    
                            postId: mPosts.postId,
                            address: mPosts.mAddress,
                            affiliation: mPosts.affliation,
                            minAmount: mPosts.minAmount,
                            caption: mPosts.caption,
                            message: mPosts.message,  
                           // mediaUrl: mPosts.mediaUrls,
                            dateCreated:mPosts.dateCreated,
                            
                            firstName: myProfile.userAddress.userName.firstName,
                            lastName: myProfile.userAddress.userName.lastName,
                            profileType: myTronweb.toUtf8(myProfile.userAddress.ProfileType),
                            bio:myProfile.userAddress.bio, 
                            country: myTronweb.toUtf8(myProfile.userAddress.Contact.country), 
                            verified: myProfile.userAddress.isVeried,
    
                            profileImg: profileUrl,
                            mediaUrl: url,
        
                        };
    
                        setPostsData((prevState) => [...prevState,mData])

                        
                        num ++;
                        setCurrentIndex(num)
                    }

                    setLoad(false);
                    
                }

                console.log("set num",num)
                setCurrentIndex(num)

                
                
            } catch (error) {
              
                console.log(error)
            }
            
        })();
      
         return () => {
            console.log("num in return",num)
         };
    }, [initIndex]);

    const Loader = (classProps) => {
        return (
            <div className=" flex justify-center items-center py-3">
                <div className={` animate-spin rounded-full h-10 w-10  ${classProps} border-b-4 border-purple-500`}/>
            </div>
        )
    }


    const posts =  postData.map((items,index)=> {
        if (items == null || items == undefined){
            items ="";
            console.log("Item key",index);
        }

        return <PostCardView data={items}/>
    })

    return (
        <div className=' mt-2 rounded-md p-2 w-full'>

            {posts }
            
            <div>
                { load?  <Loader/> : lastIndex ? <p className=' text-gray-700'>No posts</p> : <button className=' border-b-2 px-6 py-1 animate-pulse text-gray-700' onClick={()=>{setInitIndex(true)}}>more...</button>}
                
            </div>
        </div>
    )
}

export default Posts;