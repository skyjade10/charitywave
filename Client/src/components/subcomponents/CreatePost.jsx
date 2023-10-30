
import React, { useContext, useState,useRef } from "react";
import { ClientContext } from "../context/ClientContext";
import cover from '../../assets/images/user.png'
import { useNavigate } from "react-router";
import { BackendContext } from "../context/BackendContext";
import { MdKeyboardArrowDown } from 'react-icons/md'

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { randomPostId, urlpath } from "../../utils";

import ShortUniqueId, { DEFAULT_UUID_LENGTH } from 'short-unique-id';

import { contractAddress, contractAbi } from '../../components/context/constants';

import { Loader } from '../../components'




const CreatePost = () => {


    //checks if the affliation meet the requirements i.e length
    const handleAffliation = (mData) => {
        let {name, value} = mData;
        console.log('adding value', value)

         if(value == null && value == ''){
             console.log('adding address')
             
             setAffiliation((prevState)=>({...prevState, value:value,message:"",isValid:true}));
         }else{

             if(requiredTextLength(value,100)){
                setAffiliation((prevState)=>({...prevState, value:value,message:"",isValid:true}));
                console.log(affiliation);
             }else{
                
                setAffiliation((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
                console.log(affiliation);
             }
         }
            
    }

    //checks if Caption name meet the requirements i.e length
    const handleCaption = (mData) => {
        let {name, value} = mData;
         if(requiredTextLength(value,100)){
            setCaption((prevState)=>({...prevState, value:value,message:"",isValid:true}));
            console.log(caption);
         }else{
            
            setCaption((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
            console.log(caption);
         }
    }


    //checks if Home meet the requirements i.e length
    const handleAmount = (mData) => {
        let {name, value} = mData;
        var num = 0;

        if(value != null && value != ''){
            
           num = value;

           if(requiredTextLength(value,1000)){
              setAmount((prevState)=>({...prevState, value:num,message:"",isValid:true}));
              console.log(amount);
           }else{
              
              setAmount((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
              console.log(amount);
           }
        }

        setAmount((prevState)=>({...prevState, value:num,message:"",isValid:true}));
    }

    const onPostFileChange = (e) => {

        const fileInfo = document.getElementById('file-error')
        const imageContainer = document.getElementById('postimage')
        const inputTag = e.target;
        var reader = new FileReader();

        let proUrl = "postimg/"+ urlpath(window)+ "/" + postid;
        let file = e.target.files[0];
        if(file.type === 'image/png' || file.type === 'image/jpeg' ){
            if(file.size < 5500000){
                if(!fileInfo.classList.contains('hidden')){
                    fileInfo.classList.add('hidden')
                }

                setPostImgState((prevState) => ({...prevState, selectedFile: file,fileUrl:proUrl}));
                reader.onload = function () {
                    imageContainer.src = reader.result;
                }

                reader.readAsDataURL(inputTag.files[0])
            }else{
                fileInfo.classList.remove('hidden')
                fileInfo.innerText = "Image too big"
            }
        }else{
            fileInfo.classList.remove('hidden')
            fileInfo.innerText = "Supports images only"
        }
        
    }

     //checks if bio meet the requirements i.e length
    const handleBio = (mData) => {
        let {name, value} = mData;
         if(requiredTextLength(value,1000)){
            setBio((prevState)=>({...prevState, value:value,message:"",isValid:true}));
            console.log(bio);
         }else{
            
            setBio((prevState)=>({...prevState, message:"Character length exceeded (Max is 1000 chars)",isValid:false}));
            console.log(bio);
         }
    }


    const [ postImgState,setPostImgState ] = useState({selectedFile: null,fileUrl:''});
    const [ loading, setLoading ] = useState(false)


    const handleFileUpload  = async (e) => {
 
        try {

            console.log(e.target.value);
            
            if(postImgState.selectedFile != null){

                setLoading(true);
                let imageRef = ref(storage, `${postImgState.fileUrl}`);

                var upload = await uploadBytes(imageRef,postImgState.selectedFile);
                
                if (upload) {
                    console.log("upload true",postImgState.selectedFile)
                    return true
                 }else{
                    console.log("upload false")
                    setLoading(false)
                    return false
                 }
              
            }
            
        } catch (error) {
            console.log(error)
        }
        
    };


    const { tronLinkConnected,isLoggedIn,voyteUser,setVoyteUser,setIsLogged } = useContext(BackendContext);
    const { validateEmail,checkPassword,requiredTextLength,handleChange} = useContext(ClientContext);

    const  [affiliation, setAffiliation] = useState({value:null,message:"",isValid:true});
    const  [caption, setCaption] = useState({value:null,message:"",isValid:true});
    const  [amount, setAmount] = useState({value:null,message:"",isValid:true});
    const  [bio, setBio] = useState({value:null,message:"",isValid:true});

    let postid =  randomPostId();
    const navigate = useNavigate();

    const getAff = () => {
        if(affiliation.value != null && affiliation.value != ''){
            return affiliation.value
        }

        return "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb"
    }

    const handleSubmit = async () => {

        const  trW = window.tronWeb;

        if(isLoggedIn){
            console.log("add islogged")
            if(tronLinkConnected){
                console.log("add tron")
                try {
            
                    const instance = await window.tronWeb.contract(contractAbi,contractAddress);
                    console.log("My address ", affiliation.value)
                    if(handleFileUpload()){

                        const createPost = await instance.addPost(
                            postid,voyteUser.address,voyteUser.password,getAff(),amount.value,caption.value,bio.value,postImgState.fileUrl
                        ).send({
                            feeLimit:400_000_000,
                            callValue:0,
                            shouldPollResponse:true
                          });
            
                          if(createPost.success){
                            console.log(createPost);
                            setLoading(false)
                            
                          }
    
                          console.log(createPost);
                          alert("post created")
                    }

                } catch (error) {
                    console.log(error);
                    setLoading(false)
                }
            }
        }

    }

    

    const handleByte32 = (value) => {
        
       // setVoyteUser((prevState) => ({...prevState, address:contractAddress}));
       // console.log("voyte user ",voyteUser)
       console.log("injected",value);
       if(value == null )
            value = ' ';
        var valuem = window.tronWeb.fromAscii(value);
        
        var valueLength = valuem.length;
        var paddText = '';
        if(valueLength < 66){
            var holder = 66-valueLength;
            console.log("valueLength",valueLength);
            console.log("holder",holder);
            paddText = valuem.padEnd(66,'0');
            console.log("PaddesText",paddText);
            return paddText;
        }

        console.log("holder",value);
        console.log("b32",b32);
        return value;
        
    }

    const inPutClass = " border-2 w-full outline-none p-2 text-sm text-gray-900 border-gray-300 bg-gray-50 rounded-md hover:border-purple-500 focus:border-purple-800";
    const textClass = " font-bold text-sm mt-2";
    const divClass = " flex flex-col justify-center items-start ";
    return (
        <div className=" bg-gray-50 flex flex-col justify-center items-center border-2 rounded-lg shadow-md m-4 px-5 gap-4 ">
            <div className="w-full flex flex-col justify-center items-center  m-1 text-sm text-gray-900 px-2 sm:px-10 md:px-15 lg:px-20">
                {loading && (
                    <div className=" absolute z-20 top-1/2 backdrop-blur-sm w-26">
                        <Loader />
                    </div>
                )}
            <div className=" mt-4 font-bold border-b-2 w-full  pb-2">
                <h2>Create Post</h2>
            </div>
                    <p className=" text-md text-bold "></p>
                    <div className=' h-36 my-3 md:me-2 m-1'>
                        <img className=' w-full h-[150px] bg-slate-500 shadow-md border-2 shadow-gray-400' src={cover} alt="" id="postimage" />
                    </div>
                    
                    <p className="hidden text-xs text-red-600 " id='file-error'></p> 
                    <div className="flex flex-col gap-1 justify-center items-center text-xs mt-2">
                        <input id="file-input" type={'file'} accept=".jpg,.jpeg,.png,.PNG" name="profileimg" onChange={onPostFileChange}/>
                    </div>
                </div>
            <div className="flex flex-col gap-4 w-full sm:w-3/4 md:w-3/4 lg:w-3/4">

                <div className={` ${divClass}`}>
                    <p className={` ${textClass}`}>Affiliation </p> 
                    <p className=" text-xs text-red-600">{affiliation.message}</p> 
                    <input name="firstname" className={` ${inPutClass} `} onChange={(e)=>{handleAffliation(handleChange(e));}}/>
                </div>

                <div className={` ${divClass}`}>
                    <p className={` ${textClass}`}>Amount</p>
                    <p className=" text-xs text-red-600">{amount.message}</p>  
                    <input name="amount" type={"number"} className={` ${inPutClass}`} onChange={(e)=>{handleAmount(handleChange(e));}}/>
                </div>
                <div className={` ${divClass}`}>
                    <p className={` ${textClass}`}>Caption</p>
                    <p className=" text-xs text-red-600">{caption.message}</p>  
                    <input name="email" className={` ${inPutClass}`} onChange={(e)=>{handleCaption(handleChange(e));}}/>
                </div>

                
            </div>

            <div className="  flex flex-col items-center w-full sm:w-3/4 md:w-3/4 lg:w-3/4">
                <p className={` ${textClass}`}>Bio:</p> 
                <p className=" text-xs text-red-600">{bio.message}</p> 
                <textarea className={` ${inPutClass} w-1/3 h-[150px] rounded-md text-sm`} onChange={(e)=>{handleBio(handleChange(e));}}/>
            </div>

            <div className=" flex justify-end p-5 w-4/6">
                <b className= {`bg-purple-900 py-1  px-6 rounded-s-full rounded-e-full cursor-pointer text-white font-normal ${loading? 'disable': ''} hover:bg-purple-800`} onClick={handleSubmit}>Post</b>
            </div>

        </div>
        
    )
}

export default CreatePost;