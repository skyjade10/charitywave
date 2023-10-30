import React, { useContext, useState,useRef } from "react";
import { ClientContext } from "./context/ClientContext";
import cover from '../assets/images/user.png'
import { useNavigate } from "react-router";
import { BackendContext } from "./context/BackendContext";
import { MdKeyboardArrowDown } from 'react-icons/md'

import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Loader } from '../components'

import { contractAddress, contractAbi } from '../components/context/constants';
import {  urlpath  } from "../utils";

const AddProfile = () => {

   

    //checks if the names meet the requirements i.e length
    const handleFirstName = (mData) => {
        let {name, value} = mData;
            
         if(requiredTextLength(value,31)){
            setFirstName((prevState)=>({...prevState, value:value,message:"",isValid:true}));
            console.log(firstName);
         }else{
            
            setFirstName((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
            console.log(firstName);
         }
    }

    //checks if Last name meet the requirements i.e length
    const handleLastName = (mData) => {
        let {name, value} = mData;
         if(requiredTextLength(value,31)){
            setLastName((prevState)=>({...prevState, value:value,message:"",isValid:true}));
            console.log(lastName);
         }else{
            
            setLastName((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
            console.log(lastName);
         }
    }

    //checks if Last name meet the requirements i.e length
    const handleEmail = (mData) => {
        let {name, value} = mData;
         if(requiredTextLength(value,31)){
            setEmail((prevState)=>({...prevState, value:value,message:"",isValid:true}));
            console.log(email);
         }else{
            
            setEmail((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
            console.log(email);
         }

         if(validateEmail(value)){
            setEmail((prevState)=>({...prevState, value:value,message:"",isValid:true}));
            console.log(email);
            
        }else{
            setEmail((prevState)=>({...prevState, message:"Enter a valid email",isValid:false}));
            console.log(email);
        }
    }

    //checks if Home meet the requirements i.e length
    const handleHomeAddress = (mData) => {
        let {name, value} = mData;
         if(requiredTextLength(value,31)){
            setHomeAddress((prevState)=>({...prevState, value:value,message:"",isValid:true}));
            console.log(homeAddress);
         }else{
            
            setHomeAddress((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
            console.log(homeAddress);
         }
    }

    //checks if Home meet the requirements i.e length
    const handleWebsite = (mData) => {
        let {name, value} = mData;
         if(requiredTextLength(value,31)){
            setWebsite((prevState)=>({...prevState, value:value,message:"",isValid:true}));
            console.log(website);
         }else{
            
            setWebsite((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
            console.log(website);
         }
    }

    //checks if Home meet the requirements i.e length
    const handleCountry = (mData) => {
        let {name, value} = mData;
         if(requiredTextLength(value,31)){
            setCountry((prevState)=>({...prevState, value:value,message:"",isValid:true}));
            console.log(country);
         }else{
            
            setCountry((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
            console.log(country);
         }
    }

    //checks if Home meet the requirements i.e length
    const handleCity = (mData) => {
        let {name, value} = mData;
         if(requiredTextLength(value,31)){
            setCity((prevState)=>({...prevState, value:value,message:"",isValid:true}));
            console.log(city);
         }else{
            
            setCity((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
            console.log(city);
         }
    }

    //checks if Home meet the requirements i.e length
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


    const handleContact = (mData) => {
        let {name, value} = mData;

        try {

            var num = 0;
            num = parseInt(value);

            if(requiredTextLength(value,31)){
                setContact((prevState)=>({...prevState, value:num,message:"",isValid:true}));
                console.log(contact);
             }else{
                
                setContact((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
                console.log(contact);
             }
            
        } catch (error) {
            setContact((prevState)=>({...prevState, message:"Please enter a valid number",isValid:false}));
            console.log(contact);
            
        }

         
    }

    const [ proImgState,setProImgState ] = useState({selectedFile: null,fileUrl:''});
    const [ coverImgState,setCoverImgState ] = useState({selectedFile: null,fileUrl:''});

    const onProfileFileChange = (e) => {

        const fileInfo = document.getElementById('profileimage-error')
        const imageContainer = document.getElementById('profileimage')
        const inputTag = e.target;
        var reader = new FileReader();

        let proUrl = "profileImg/" + urlpath;
        let file = e.target.files[0];
        if(file.type === 'image/png' || file.type === 'image/jpeg' ){
            if(file.size < 5500000){
                if(!fileInfo.classList.contains('hidden')){
                    fileInfo.classList.add('hidden')
                }

                setProImgState((prevState) => ({...prevState, selectedFile: e.target.files[0],fileUrl:proUrl}));
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


    const onCoverFileChange = (e) => {

        const fileInfo = document.getElementById('coverimage-error')
        const imageContainer = document.getElementById('coverimage')
        const inputTag = e.target;
        var reader = new FileReader();
        
        let covUrl = "coverImg/" + urlpath;
        let file = e.target.files[0];
        if(file.type === 'image/png' || file.type === 'image/jpeg' ){
            if(file.size < 5500000){
                if(!fileInfo.classList.contains('hidden')){
                    fileInfo.classList.add('hidden')
                }

                setCoverImgState((prevState) => ({...prevState, selectedFile: e.target.files[0],fileUrl:covUrl}));
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

    const [loadingInfo, setLoadingInfo] = useState('');
    const handleFileUpload  = async (e) => {
 
        try {

            if(e.target.name === 'profileimg'){

                if(proImgState.selectedFile != null){

                    setSignUpLoader(true)
                    setLoadingInfo('Uploading profile image please wait...')
                    let imageRef = ref(storage, `${proImgState.fileUrl}`);
                    var upload = await uploadBytes(imageRef,proImgState.selectedFile);

                    if(upload){
                        setLoadingInfo('Profile image uploaded')
                        setTimeout(() => {
                            setSignUpLoader(false)
                        }, 3000);
                    }
                    
                  
                }
            }
            
            if(e.target.name === 'coverimg'){

                if(coverImgState.selectedFile != null){
                    setSignUpLoader(true)
                    setLoadingInfo('Uploading cover image please wait...')
                    let imageRefc = ref(storage, `${coverImgState.fileUrl}`);
                    var uploadn = await uploadBytes(imageRefc,coverImgState.selectedFile);
                    

                    if(uploadn){
                        setLoadingInfo('Profile image uploaded')
                        setTimeout(() => {
                            setSignUpLoader(false)
                        }, 3000);
                    }
    
                }
            }

        } catch (error) {
            console.log('',error.message)
            setLoadingInfo('Something went, please check your connection')
            setTimeout(() => {
                setSignUpLoader(false)
            }, 3000);
            
        }
        
    };


    const { tronLinkConnected,isLoggedIn,voyteUser,setVoyteUser,setIsLogged } = useContext(BackendContext);
    const { validateEmail,checkPassword,requiredTextLength,handleChange,setMnemonicModalOpen} = useContext(ClientContext);
    const [ signUpLoader, setSignUpLoader] = useState(false);

    

    const  [firstName, setFirstName]= useState({value:null,message:'', isValid:true});
    const  [lastName, setLastName] = useState({value:null,message:"",isValid:true});
    const  [email, setEmail] = useState({value:null,message:"",isValid:true});
    const  [contact, setContact] = useState({value:null,message:"",isValid:true});
    const  [website, setWebsite] = useState({value:null,message:"",isValid:true});
    const  [homeAddress, setHomeAddress] = useState({value:null,message:"",isValid:true});
    const  [profileType, setProfileType] = useState({value:null,message:"",isValid:true});
    const  [country, setCountry] = useState({value:null,message:"",isValid:true});
    const  [city, setCity] = useState({value:null,message:"",isValid:true});
    const  [bio, setBio] = useState({value:null,message:"",isValid:true});


    const navigate = useNavigate();

    

    const handleSubmit = async () => {


        //username tupple
        const mFirstN =  firstName.value;
        const mLastN =  lastName.value;
        const username =[ mFirstN,mLastN];
        console.log("ussername tuple", username);

        //contact tupple
        const mEmail =  handleByte32(email.value);
        const mWebsite =  handleByte32(website.value);
        const mContact =  contact.value;
        const mHome =  handleByte32(homeAddress.value);
        const mCountry = handleByte32(country.value);
        const mycontact = [mEmail,mWebsite,mContact,mHome,mCountry];

        console.log("contact tuple",mycontact);

       // const mBio = bio.value //string
        //const mCountry = country

        if(isLoggedIn){
            console.log("add islogged")
            if(tronLinkConnected){
                console.log("add tron")
                try {
                    
                    const instance = await window.tronWeb.contract(contractAbi,contractAddress);
                    setSignUpLoader(true)
                    const signUp = await instance.createProfile(
                        voyteUser.address,voyteUser.password,username,mycontact,bio.value, 
                        handleByte32(profileType.value)
                    ).send({
                        feeLimit:400_000_000,
                        callValue:0,
                        shouldPollResponse:true
                      });
        
                      if(signUp.success){
                        setSignUpLoader(false)
                        setIsLogged(true);
                        navigate('/profile');
                        setMnemonicModalOpen(false);
                        alert("account profile created")
                      }

                      console.log(signUp);

                } catch (error) {
                    console.log(error);
                }
            }
        }

    }

    

    const menuTypeItemToggle = () => {

        const menuItemContainer = document.getElementById("menu-item-container");
        menuItemContainer.style.display = 'inline'

    }

    const menuTypeItemSelect = (e) => {

        e.preventDefault()
        

        const mValue = e.target.innerText.trim();

        console.log(mValue);

        if(mValue !== ''){

            if(mValue == "Organisation" || mValue == "Individual" || mValue == "Group"){

                const selectedMenuItem = document.getElementById("menu-item-selected");
                selectedMenuItem.innerText = mValue;
    
                setProfileType((prevState) => ({...prevState,value:mValue}));
        
                const menuItemContainer = document.getElementById("menu-item-container");
                menuItemContainer.style.display = 'none'
                console.log("inste");
            }
        }


    }

    const handleByte32 = (value) => {
        
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
        return value;
        
    }


    const inPutClass = " border-2 w-full outline-none p-2 text-sm text-gray-900 border-gray-300 bg-gray-50 rounded-md hover:border-purple-500 focus:border-purple-800";
    const textClass = "ps-2 font-bold text-sm mt-2";
    const divClass = " flex flex-col justify-center items-start mx-5 w-full md:w-5/12";
    return (
        <div className="background-gradient w-full grid grid-cols-[auto] justify-center ">
            <div className="bg-gray-50 flex flex-col justify-center items-center  w-fit sm:w-[500px] md:w-[600px] lg:w-[700px] border-2 rounded-lg shadow-md m-4 gap-4 ">
                <div className=" mt-4 font-bold border-b-2 w-3/4 mx-4 pb-2">
                    <h2 >Create Profile</h2>
                </div>
                <div className=" w-full px-10">
                    { signUpLoader && (<div className=' flex flex-col justify-center items-center z-20 fixed  backdrop-blur-sm h-screen
                    max-w-[500px] w-5/6 sm:w-[700px] lg:w-[700px] gap-4' id='signUpLoader'>
                        <p id="loadinginfo">{loadingInfo}</p>
                        <Loader/>
                        <button className=" hover:bg-purple-400 rounded-md px-4 py-1 bg-purple-600 text-white cursor-pointer" onClick={()=>setSignUpLoader(false)}>cancel</button>
                        </div>)}
                    <div className=" w-auto m-1 text-sm text-gray-900">
                        <p className=" text-md font-semibold ">Cover Image</p>
                        <div className=' w-full  md:me-2 m-1 bg-[#F2F5F7] border-2 border-dotted flex flex-col justify-center items-center'>
                            <img className=' max-h-[200px] aspect-auto' src={cover} alt="" id="coverimage" />
                        </div>
                        <p className="hidden text-xs text-red-600 " id='coverimage-error'></p> 
                        <div className="flex flex-row justify-between items-center text-xs mt-2 px-5">
                            <input type={'file'} name="coverimg" onChange={onCoverFileChange}/>
                            { <button className=" px-2 py-[2px] border-[1px] bg-[#EFEFEF] border-[#767676] rounded-sm"  name="coverimg" onClick={handleFileUpload}>Upload</button> }
                        </div>
                    </div>

                    <div className=" flex flex-col items-center justify-center m-1 text-sm text-gray-900">
                        <p className=" text-md font-semibold ">Profile Image</p>
                        <div className=' w-auto md:me-2 m-1 bg-[#F2F5F7] border-2 border-dotted '>
                            <img className=' w-[150px] h-[150px]' src={cover} alt="" id="profileimage" />
                        </div>
                        <p className="hidden text-xs text-red-600 " id='profileimage-error'></p> 
                        <div className="flex flex-row justify-between items-center text-xs mt-2">
                            <input type={'file'} name="profileimg" onChange={onProfileFileChange}/>
                            { <button className=" px-2 py-[2px] border-[1px] bg-[#EFEFEF] border-[#767676] rounded-sm" name="profileimg" onClick={handleFileUpload}>Upload</button> }
                        </div>
                    </div>
                </div>
                <div className=" flex flex-wrap gap-2 justify-center w-full">
                    <div className={` ${divClass}`}>
                        <p className={` ${textClass}`}>First Name </p> 
                        <p className=" text-xs text-red-600">{firstName.message}</p> 
                        <input name="firstname" className={` ${inPutClass} `} onChange={(e)=>{handleFirstName(handleChange(e))}}/>
                    </div>

                    <div className={` ${divClass}`}>
                        <p className={` ${textClass}`}>Last Name</p> 
                        <p className=" text-xs text-red-600">{lastName.message}</p> 
                        <input name="lastname" className={` ${inPutClass} `} onChange={(e)=>{handleLastName(handleChange(e));}}/>
                    </div>

                    <div className={` ${divClass}`}>
                        <p className={` ${textClass}`}>Email</p>
                        <p className=" text-xs text-red-600">{email.message}</p>  
                        <input name="email" className={` ${inPutClass}`} onChange={(e)=>{handleEmail(handleChange(e));}}/>
                    </div>

                    <div className={` ${divClass}`}>
                        <p className={` ${textClass}`}>Phone</p>
                        <p className=" text-xs text-red-600">{contact.message}</p>  
                        <input name="phone" className={` ${inPutClass}`} onChange={(e)=>{handleContact(handleChange(e));}}/>
                    </div>

                    <div className={` ${divClass}`}>
                        <p className={` ${textClass}`}>Address</p> 
                        <p className=" text-xs text-red-600">{homeAddress.message}</p> 
                        <input name="address" className={` ${inPutClass}`} onChange={(e)=>{handleHomeAddress(handleChange(e));}}/>
                    </div>

                    <div className={` ${divClass}`}>
                        <p className={` ${textClass}`}>Website</p> 
                        <p className=" text-xs text-red-600">{website.message}</p> 
                        <input name="website" className={` ${inPutClass}`} onChange={(e)=>{handleWebsite(handleChange(e));}}/>
                    </div>

                    <div className={` ${divClass}`}>
                        <p className={` ${textClass}`}>Country</p>
                        <p className=" text-xs text-red-600">{country.message}</p> 
                        <input name="country" className={` ${inPutClass}`} onChange={(e)=>{handleCountry(handleChange(e));}}/>
                    </div>

                    <div className={` ${divClass}`}>
                        <p className={` ${textClass}`}>City</p>
                        <p className=" text-xs text-red-600">{city.message}</p> 
                        <input name="city" className={` ${inPutClass}`} onChange={(e)=>{handleCity(handleChange(e));}}/>
                    </div>

                    
                </div>
                <div className={` relative inline-block px-5 md:px-7 text-left w-full md:w-6/12 justify-items-start self-start`} >

                    <p className={` ${textClass}`}>Type</p>

                    <div className=" flex flex-row justify-between items-center cursor-pointer px-2 py-2 border-[2px] h-10 bg-slate-50 border-gray-300 hover:bg-gray-200 rounded-md " onClick={menuTypeItemToggle}>
                        <p  className="text-gray-900  text-sm "  id="menu-item-selected"></p>
                        <MdKeyboardArrowDown style={{fontSize:"1.8em"}}/> 
                    </div>
        
                    <div className=" hidden absolute border rounded-md bg-white right-8  shadow-lg ring-1 ring-black ring-opacity-5 mt-2 " id="menu-item-container">
                        <div className=" cursor-pointer " role="none">
                            <p  className="text-gray-900 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem"  id="menu-item-0" value ="Individual" onClick={menuTypeItemSelect}>Individual</p>
                            <p  className="text-gray-900 block px-4 py-2 text-sm  hover:bg-gray-200" role="menuitem"  id="menu-item-1" value ="Group" onClick={menuTypeItemSelect}>Group</p>
                            <p  className="text-gray-900 block px-4 py-2 text-sm  hover:bg-gray-200" role="menuitem"  id="menu-item-2" value ="Organisation" onClick={menuTypeItemSelect}>Organisation</p>
                        </div>
                    </div>
                </div>

                <div className="  flex flex-col items-center px-8 w-full">
                    <p className={` ${textClass}`}>Bio:</p> 
                    <p className=" text-xs text-red-600">{bio.message}</p> 
                    <textarea id="text-area" className={` ${inPutClass} h-[250px] rounded-md text-sm`} onChange={(e)=>{handleBio(handleChange(e));}}/>
                </div>

                <div className=" flex justify-end px-8 py-5 w-full">
                    <b className=" bg-purple-900 py-1 px-6 rounded-s-full rounded-e-full cursor-pointer text-white font-normal hover:bg-purple-800 " onClick={handleSubmit}>Save</b>
                </div>

            </div>
            
        </div>
    )
}

export default AddProfile;