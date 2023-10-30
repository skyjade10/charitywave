
import React, { useEffect, useState , useContext} from "react";

import { MdMenu, MdVerified } from "react-icons/md";
import { CgDanger } from 'react-icons/cg'
import theme from "../../colors";
import media from '../../assets/images/cover3.jpg'
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { urlpath } from "../../utils";
import { storage } from "../../firebase";
import { getDownloadURL,ref } from "firebase/storage";

import { contractAbi, contractAddress } from "../context/constants";
import { async } from "@firebase/util";
import { ClientContext } from "../context/ClientContext";
import { BackendContext } from "../context/BackendContext";


const MenuItems = ({icon,title,menuOnClick}) => {
    
    return (
        <div className={` border-2 hover:bg-gray-200 flex flex-row items-center px-3 py-1 gap-4 text-gray-600 cursor-pointer
        active:bg-gray-200 border-b-2 border-transparent hover:border-[${theme.purple}]`} onClick={menuOnClick}>
            {icon}
            <p>{title}</p>
        </div>
    )
}

const menuIconsStyle = {color:theme.purple, fontSize: "1.5em"}

const PostDetailCard = ({data}) => {

    const { setTransactModalOpen,setTransactionData } = useContext(ClientContext)
    const { voyteUser } = useContext(BackendContext);
    const mData = data[0];

    const getId = () => {
        console.log(mData.postId);
        return mData.postId.toNumber();
    }

    const donate = (mpostID,mname,maddress) => {
        console.log("Check t=data",mpostID,mname,maddress);
        setTransactionData((prevState) => ({...prevState,name:mname,address:maddress,postId:mpostID}))
    }


    //Setting Name
    const proName = () => {
        let fn ="";
        let ln ="";
        if(mData != null){

            if (mData.firstName != null)
                fn = mData.firstName;
           
            if (mData.lastName != null)
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
        let vr = media;
        if(mData != null){
            
             if(mData.profileImg != null){
                 vr = "";
                 vr = mData.profileImg;
                 return vr;
             }
        }
            
        return vr;
    }

    //Setting Media
    
    const proMedia = () => {
        let vr = proImage();

        if(mData != null){
            
            if(mData.mediaURL!=null && mData.mediaURL != ""){
                vr = mData.mediaURL;
    
                return <img className=" w-full h-full" src={vr} alt="" />
            }
        }
            
        return <img className=" w-full h-full" src={proImage()} alt="" />;
    }

    const viewAllText = () => {
        const mainText = document.getElementById("main-text")
        if(mainText.classList.contains("line-clamp-4")){
            mainText.classList.remove('line-clamp-4')
        }else{
            mainText.classList.add('line-clamp-4')
        }
        
    }

    //Setting Message
    const proMessage = () => {
        let msg = "";
        if(mData != null){
            
            if(mData.message!=null && mData.message != ""){
                msg = mData.message;
    
                return <p  id="main-text" className="line-clamp-4 cursor-pointer text-sm  md:text-base text-left" onClick={viewAllText}>{msg}  </p>
            }
        }
    }
    //Setting Message
    const proCaption = () => {
        let cap = "";
        
        if(mData != null){

            if(mData.caption!=null && mData.caption != ""){
                cap = mData.caption;
    
                return <p className="line-clamp-4 text-base text-left my-1">{cap} </p>
            }
        }
    }

    const preloadImg = () => {
        console.log("data",mData)
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

    

    const [ profilePreloadImg, setProfilePreloadImg ] = useState({image:''})
    const [ mediaPreloadImg, setMediaPreloadImg ] = useState({image:''})

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
                        {/* <div className=" w-10 h-10 ">
                            <img className=" w-full h-full border-2 border-gray-500 rounded-full" src={media} alt="" />
                        </div>
                        <p>{`${name} donated ${amount} Trx`}</p> */}
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
                        {/* <div className=" w-10 h-10 ">
                            <img className=" w-full h-full border-2 border-gray-500 rounded-full" src={media} alt="" />
                        </div>
                        <p>{`${name} donations ${amount} Trx`}</p> */}
                    </div>
        }

    })

    const moreToggle = () => {

        const moreMenu = document.getElementById('more-menu');

        if(moreMenu.classList.contains('hidden')){
            moreMenu.classList.remove('hidden');
        }else{
            moreMenu.classList.add('hidden');
        }
    }

    const checkAddress = () => {

        if(mData != null && userAddress !== null){
            if(mData.address === voyteUser.address){
                console.log("Check address", mData.address)
                setOwnPost(true)
            }
        }else{
            setOwnPost(false)
        }
    }

    const [donationDonorToggle, setDonationDonorToggle] = useState(false);
    const [ownPost, setOwnPost ] = useState(false);

    useEffect(()=> {
    
        if(mData != null ){
            
            preloadImg();
            preloadCoverImg();
        }

        checkAddress();
        

    },[]);

    return (
        <div className=" px-4 ">
            <div className=" flex flex-row justify-between py-2">
                <div className=" flex flex-row items-center gap-2 font-bold text-2xl cursor-pointer">
                    <div className=" w-12" style={imgStyle}>
                        <img className=" w-full h-full" src={profilePreloadImg.image.src} alt="" />
                    </div>
                    <h5>{proName()}</h5>
                    {proVeried()}
                </div>
                <div className=" cursor-pointer" onClick={()=>{console.log("hello world")}}>
                    <MdMenu style={menuIconStyle} onClick={moreToggle}/>
                    <div id="more-menu" className=" hidden bg-white border-2 text-sm rounded-md absolute end-4">
                        <ul>
                            { ownPost && (<MenuItems icon={<CgDanger style={menuIconsStyle}/>} title="Report" menuOnClick={()=> navigate('/pages')}/> )}
                            { !ownPost && (<MenuItems icon={<CgDanger style={menuIconsStyle}/>} title="Delete" menuOnClick={()=> navigate('/faq')}/> )}
                        </ul>
                    </div>
                </div>
            </div>
            {proCaption()}
            <div className=" flex justify-center bg-[#1E1E1E] mb-2" style={imgStyle}>
                <img className=" w-full h-full" src={mediaPreloadImg.image.src} alt="" />
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
                <button className=" bg-purple-900 hover:bg-purple-500 text-white py-2 px-6 rounded-s-full rounded-e-full" onClick={() => {
                                setTransactModalOpen(true); 
                                donate(getId(),proName(),mData.address);
                                }}>Donate</button>
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


    const [ postDetailData, setPostDetailData ] = useState([]);
    const location = useLocation();
    const routeParams = useParams();

    const myTronweb = window.tronWeb;

    useEffect(() => {

       (async () => {

           try {

            const instance = await myTronweb.contract(contractAbi,contractAddress);
            const postid = routeParams.post_id;
            const postindex = routeParams.post_index;

            if( postid != null && postindex != null) {
                const mPost = await instance.getUserPost(postindex).call();

                const myProfile = await instance.getProfile(myTronweb.address.fromHex(mPost.mAddress)).call();
                const profileUrl = await getDownloadURL(ref(storage,"profileImg/"+urlpath(window)));

                let url = ''
                try {
                    const mediaUrl = await getDownloadURL(ref(storage,"postimg/"+ urlpath(window) + "/" + mPost.postId));
                    url = mediaUrl
                } catch (error) {
                    console.log(error)
                }
            
                if(mPost.postId == postid){
                    const mData = {
        
                        postId: mPost.postId,
                        address: mPost.mAddress,
                        affiliation: mPost.affliation,
                        minAmount: mPost.minAmount,
                        caption: mPost.caption,
                        message: mPost.message,  
                        dateCreated:mPost.dateCreated,
                        
                        firstName: myProfile.userAddress.userName.firstName,
                        lastName: myProfile.userAddress.userName.lastName,
                        profileType: myTronweb.toUtf8(myProfile.userAddress.ProfileType),
                        bio:myProfile.userAddress.bio, 
                        country: myTronweb.toUtf8(myProfile.userAddress.Contact.country), 
                        verified: myProfile.userAddress.isVeried,

                        profileImg: profileUrl,
                        mediaURL: url,
        
                    
                    };
        
                    setPostDetailData((prevState) => [...prevState,mData])
                    console.log(postDetailData)
                
                }
                
            }
              
           } catch (error) {
               console.log(error);
           }
           
       })();
     
       // return () => {
       // };
   }, []);

    return (
        <div className=" bg-white mt-4 mb-10 pb-5 rounded-md">
            <PostDetailCard data = {postDetailData}/>
        </div>
    )
}


export default PostDetail;