import React, { useContext, useState,useRef } from "react";
import { ClientContext } from "./context/ClientContext";
import cover from '../assets/images/user.png'
import { useNavigate } from "react-router";
import { BackendContext } from "./context/BackendContext";
import { MdKeyboardArrowDown } from 'react-icons/md'

import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import ShortUniqueId from 'short-unique-id';

import { contractAddress, contractAbi } from '../components/context/constants';

const AddProfile = () => {

   

    //checks if the names meet the requirements i.e length
    const handleFirstName = (mData) => {
        let {name, value} = mData;
            
         if(requiredTextLength(value,100)){
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
         if(requiredTextLength(value,100)){
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
         if(requiredTextLength(value,100)){
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
         if(requiredTextLength(value,100)){
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
         if(requiredTextLength(value,100)){
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
         if(requiredTextLength(value,100)){
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
         if(requiredTextLength(value,100)){
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

            if(requiredTextLength(value,100)){
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
    const { randomUUID, sequentialUUID } = new ShortUniqueId({ length: 10 });

    const onProfileFileChange = (e) => {

        console.log(e.target.name);

        let proUrl = "voyte/profileImg/" + randomUUID();
        setProImgState((prevState) => ({...prevState, selectedFile: e.target.files[0],fileUrl:proUrl}));

        console.log("Url ",proImgState.fileUrl," Selected file", proImgState.selectedFile);
        
    }


    const onCoverFileChange = (e) => {

        console.log(e.target.name);
        
        let covUrl = "voyte/coverImg/" + randomUUID();
        setCoverImgState((prevState) => ({...prevState, selectedFile: e.target.files[0],fileUrl:covUrl}));

        console.log("Url ",coverImgState.fileUrl," Selected file", coverImgState.selectedFile);
       
    }

    const handleFileUpload  = async (e) => {
 
        try {

            console.log(e.target.value);
            
            if(e.target.name == 'profileimg')
                if(proImgState.selectedFile != null){
                    let imageRef = ref(storage, `${proImgState.fileUrl}`);
                    var upload = await uploadBytes(imageRef,proImgState.selectedFile);
                    console.log(" Profile Image Uploaded",upload);

                    let getUrl = await getDownloadURL(upload.ref)
                    console.log(" Profile Image downloaded",getUrl);

                    //Show the uploaded image
                    var setImage ='';
                    if( getUrl != '' && getUrl != null){

                        setImage = document.getElementById("profileimage");
                        setImage.src = `${getUrl}`;
                    }else{

                        setImage.src = cover;
                    }


                  
                }
            if(e.target.name == 'coverimg')
                if(proImgState.selectedFile != null){
                    let imageRefc = ref(storage, `${coverImgState.fileUrl}`);
                    var uploadn = await uploadBytes(imageRefc,coverImgState.selectedFile);
                    console.log(" Cover Image Uploaded",uploadn);

                    let getUrl = await getDownloadURL(uploadn.ref);
                    console.log(" Cover Image downloaded",getUrl);

                    //Show the uploaded image
                    var setImage = '';
                    if( getUrl != '' && getUrl != null){
                        setImage = document.getElementById("coverimage");
                        setImage.src = `${getUrl}`;
                    }else{

                        setImage.src = cover;
                    }

                }
        } catch (error) {
            console.log(error)
        }
        
    };


    const { tronLinkConnected,isLoggedIn,voyteUser,setVoyteUser,setIsLogged } = useContext(BackendContext);
    const { validateEmail,checkPassword,requiredTextLength,handleChange} = useContext(ClientContext);

    const  [firstName, setFirstName]= useState({value:null,message:'', isValid:true});
    const  [lastName, setLastName] = useState({value:null,message:"",isValid:true});
    const  [email, setEmail] = useState({value:null,message:"",isValid:true});
    const  [contact, setContact] = useState({value:null,message:"",isValid:true});
    const  [website, setWebsite] = useState({value:null,message:"",isValid:true});
    const  [homeAddress, setHomeAddress] = useState({value:null,message:"",isValid:true});
    const  [profileType, setProfileType] = useState({value:null,message:"",isValid:true});
    const  [country, setCountry] = useState({value:null,message:"",isValid:true});
    const  [city, setCity] = useState({value:null,message:"",isValid:true});
    const  [profileImg, setProfileImg] = useState({value:null,message:"",isValid:true});
    const  [coverImg, setCoverImg] = useState({value:null,message:"",isValid:true});
    const  [bio, setBio] = useState({value:null,message:"",isValid:true});

    const navigate = useNavigate();

    

    const handleSubmit = async () => {

        const  trW = window.tronWeb;

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
        const mycontact = [mEmail,mWebsite,mContact,mHome];

        console.log("contact tuple",mycontact);

       // const mBio = bio.value //string
        //const mCountry = country

        if(!isLoggedIn){
            console.log("add islogged")
            if(tronLinkConnected){
                console.log("add tron")
                try {
                    
                    const instance = await window.tronWeb.contract(contractAbi,contractAddress);
                    const signUp = await instance.createProfile(
                        voyteUser.address,username,mycontact,handleByte32(bio.value),handleByte32(country.value), 
                        handleByte32(proImgState.fileUrl), handleByte32(coverImgState.fileUrl),handleByte32(profileType.value)
                    ).send({
                        feeLimit:400_000_000,
                        callValue:0,
                        shouldPollResponse:true
                      });
        
                      if(signUp.success){
                        console.log('');
                        setIsLogged(true);
                        navigate('/profile');
                        setMnemonicModalOpen(false);
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
        

        const mValue = e.target.innerText.toLowerCase().trim();

        console.log(mValue);

        if(mValue !== ''){

            if(mValue == "organisation" || mValue == "individual" || mValue == "group"){

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
        <div className="background-gradient w-full grid grid-cols-[auto] justify-center ">
            <div className="bg-gray-50 flex w-[700px] flex-col justify-center items-center border-2 rounded-lg shadow-md m-4 gap-4 ">
                <div className=" mt-4 font-bold border-b-2 w-3/4 mx-4 pb-2">
                    <h2>Creating Profile</h2>
                </div>
                <div className=" grid grid-cols-2 gap-4  w-2/3">
                    <div className=" m-1 text-sm text-gray-900">
                        <p className=" text-md text-bold ">Cover Image</p>
                        <div className=' w-36 md:me-2 m-1'>
                            <img className=' w-full h-[150px] aspect-auto' src={cover} alt="cover-pic" id="coverimage" />
                        </div>
                        <div className="flex flex-row justify-between items-center text-xs mt-2">
                            <input type={'file'} name="coverimg" onChange={onCoverFileChange}/>
                            <button className=" px-2 py-[2px] border-[1px] bg-[#EFEFEF] border-[#767676] rounded-sm"  name="coverimg" onClick={handleFileUpload}>Upload</button>
                        </div>
                    </div>

                    <div className="  m-1 text-sm text-gray-900">
                        <p className=" text-md text-bold ">Profile Image</p>
                        <div className=' w-36 md:me-2 m-1'>
                            <img className=' w-full h-[150px]' src={cover} alt="profile-pic" id="profileimage" />
                        </div>
                        <div className="flex flex-row justify-between items-center text-xs mt-2">
                            <input type={'file'} name="profileimg" onChange={onProfileFileChange}/>
                            <button className=" px-2 py-[2px] border-[1px] bg-[#EFEFEF] border-[#767676] rounded-sm" name="profileimg" onClick={handleFileUpload}>Upload</button>
                        </div>
                    </div>
                    <div className={` ${divClass}`}>
                        <p className={` ${textClass}`}>First Name </p> 
                        <p className=" text-xs text-red-600">{firstName.message}</p> 
                        <input name="firstname" className={` ${inPutClass} `} onChange={(e)=>{handleFirstName(handleChange(e));}}/>
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

                    <div className={` relative inline-block text-left`} >
    
                        <p className={` ${textClass}`}>Type</p>
                        <div className=" flex flex-row justify-between items-center cursor-pointer px-2 py-2 border-[2px] h-10 bg-slate-50 border-gray-300 hover:bg-gray-200 rounded-md " onClick={menuTypeItemToggle}>
                            <p  className="text-gray-900  text-sm "  id="menu-item-selected"></p>
                            <MdKeyboardArrowDown style={{fontSize:"1.8em"}}/> 
                        </div>
            
                        <div className=" absolute border rounded-md bg-white right-0  shadow-lg ring-1 ring-black ring-opacity-5 mt-2 " id="menu-item-container">
                            <div className=" cursor-pointer " role="none">

                                <p  className="text-gray-900 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem"  id="menu-item-0" value ="individual" onClick={menuTypeItemSelect}>Individual</p>
                                <p  className="text-gray-900 block px-4 py-2 text-sm  hover:bg-gray-200" role="menuitem"  id="menu-item-1" value ="group" onClick={menuTypeItemSelect}>Group</p>
                                <p  className="text-gray-900 block px-4 py-2 text-sm  hover:bg-gray-200" role="menuitem"  id="menu-item-2" value ="organisation" onClick={menuTypeItemSelect}>Organisation</p>
                                {/* <input name="type" className={` ${inPutClass}`} /> */}
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="  flex flex-col items-center m-4 w-4/6">
                    <p className={` ${textClass}`}>Bio:</p> 
                    <p className=" text-xs text-red-600">{bio.message}</p> 
                    <textarea className={` ${inPutClass} w-1/3 h-[250px] rounded-md text-sm`} onChange={(e)=>{handleBio(handleChange(e));}}/>
                </div>

                <div className=" flex justify-end p-5 w-4/6">
                    <b className=" bg-purple-900 py-1 px-6 rounded-s-full rounded-e-full cursor-pointer text-white font-normal hover:bg-purple-800 " onClick={handleSubmit}>Save</b>
                </div>

            </div>
            
        </div>
    )
}

export default AddProfile;