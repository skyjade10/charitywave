import React, { useContext, useState,useRef } from "react";
import { ClientContext } from "./context/ClientContext";
import cover from '../assets/images/used.jpg'
import { useNavigate } from "react-router";

const EditProfile = () => {

    const { profileData, setProfileData } = useState(
        {
            firstName: "Zambwe",
            lastName: "Nasilele",
            email:" World health Org",
            contact:"09722893465",
            website: "www.zana.com",
            homeAddress: "2516 Zamclay",
            profileType: "Individual",
            location: "Kalulushi, Zambia", 
            profileImg: "",
            coverImg: "",
            bio: "Lm ipsuissimos consectetur ea nulla minima."
    
        }
    );

    const { validateEmail,checkPassword,requiredTextLength,handleChange} = useContext(ClientContext);

    const  [firstName, setFirstName]= useState({message:'', isValid:true});
    const  [lastName, setLastName] = useState({message:"",isValid:true});
    const  [email, setEmail] = useState({message:"",isValid:true});
    const  [contact, setContact] = useState({message:"",isValid:true});
    const  [website, setWebsite] = useState({message:"",isValid:true});
    const  [homeAddress, setHomeAddress] = useState({message:"",isValid:true});
    const  [profileType, setProfileType] = useState({message:"",isValid:true});
    const  [country, setCountry] = useState({message:"",isValid:true});
    const  [city, setCity] = useState({message:"",isValid:true});
    const  [profileImg, setProfileImg] = useState({message:"",isValid:true});
    const  [coverImg, setCoverImg] = useState({message:"",isValid:true});
    const  [bio, setBio] = useState({message:"",isValid:true});

    const navigate = useNavigate();

    //checks if the names meet the requirements i.e length
    const handleFirstName = (mData) => {
        let {name, value} = mData;

         if(requiredTextLength(value,100)){
            setFirstName((prevState)=>({...prevState, message:"",isValid:true}));
         }else{
            
            setFirstName((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
         }
    }

    //checks if Last name meet the requirements i.e length
    const handleLastName = (mData) => {
        let {name, value} = mData;

         if(requiredTextLength(value,100)){
            setLastName((prevState)=>({...prevState, message:"",isValid:true}));
         }else{
            
            setLastName((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
         }
    }

    //checks if Last name meet the requirements i.e length
    const handleEmail = (mData) => {
        let {name, value} = mData;

         if(requiredTextLength(value,100)){
            setLastName((prevState)=>({...prevState, message:"",isValid:true}));
         }else{
            
            setEmail((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
           
         }

         if(validateEmail(value)){
            setEmail((prevState)=>({...prevState, message:"",isValid:true}));
            
        }else{
            setEmail((prevState)=>({...prevState, message:"Enter a valid email",isValid:false}));
        }
    }

    //checks if Home meet the requirements i.e length
    const handleHomeAddress = (mData) => {
        let {name, value} = mData;

         if(requiredTextLength(value,100)){
            setHomeAddress((prevState)=>({...prevState, message:"",isValid:true}));
         }else{
            
            setHomeAddress((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
         }
    }

    //checks if Home meet the requirements i.e length
    const handleWebsite = (mData) => {
        let {name, value} = mData;

         if(requiredTextLength(value,100)){
            setWebsite((prevState)=>({...prevState, message:"",isValid:true}));
         }else{
            
            setWebsite((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
         }
    }

    //checks if Home meet the requirements i.e length
    const handleCountry = (mData) => {
        let {name, value} = mData;

         if(requiredTextLength(value,100)){
            setCountry((prevState)=>({...prevState, message:"",isValid:true}));
         }else{
            
            setCountry((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
         }
    }

    //checks if Home meet the requirements i.e length
    const handleCity = (mData) => {
        let {name, value} = mData;

         if(requiredTextLength(value,100)){
            setCity((prevState)=>({...prevState, message:"",isValid:true}));
         }else{
            
            setCity((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
         }
    }

    //checks if Home meet the requirements i.e length
    const handleBio = (mData) => {
        let {name, value} = mData;

         if(requiredTextLength(value,1000)){
            setBio((prevState)=>({...prevState, message:"",isValid:true}));
         }else{
            
            setBio((prevState)=>({...prevState, message:"Character length exceeded (Max is 1000 chars)",isValid:false}));
         }
    }


    const handleContact = (mData) => {
        let {name, value} = mData;

        try {

            var num = 0;
            num = parseInt(value);

            if(requiredTextLength(value,100)){
                setContact((prevState)=>({...prevState, message:"",isValid:true}));
             }else{
                
                setContact((prevState)=>({...prevState, message:"Character length exceeded (Max is 100 chars)",isValid:false}));
             }
            
        } catch (error) {
            setContact((prevState)=>({...prevState, message:"Please enter a valid number",isValid:false}));
            
        }

         
    }


    

    const handleSubmit = () => {

    }

    const handleCancel = () => {
        navigate('/profile');
    }

    const inPutClass = " border-2 w-full outline-none p-2 text-sm text-gray-900 border-gray-300 bg-gray-50 rounded-md hover:border-purple-500 focus:border-purple-800";
    const textClass = " font-bold text-sm mt-2";
    const divClass = " flex flex-col justify-center items-start ";
    return (
        <div className=" w-full grid grid-cols-[auto] justify-center ">
            <div className="flex w-[700px] flex-col justify-center items-center border-2 rounded-lg shadow-md m-4  ">

                <div className=" grid grid-cols-2 gap-4 p-4 w-2/3">
                    <div className=" m-1 text-sm text-gray-900">
                        <div className=' w-36 md:me-2 m-1'>
                            <img className=' w-full h-full' src={cover} alt="post-profile-pic" />
                        </div>
                        <p> select cover</p>
                    </div>

                    <div className=" m-1 text-sm text-gray-900">
                        <div className=' w-36 md:me-2 m-1'>
                            <img className=' w-full h-full' src={cover} alt="post-profile-pic" />
                        </div>
                        <p> select cover</p>
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

                    <div className={` ${divClass}`}>
                        <p className={` ${textClass}`}>Type</p> 
                        <input name="type" className={` ${inPutClass}`} />
                    </div>
                    
                </div>

                <div className="  flex flex-col items-center m-4 w-4/6">
                    <p className={` ${textClass}`}>Bio:</p> 
                    <p className=" text-xs text-red-600">{bio.message}</p> 
                    <textarea className={` ${inPutClass} w-1/3 h-[250px] rounded-md text-sm`} onChange={(e)=>{handleBio(handleChange(e));}}/>
                </div>

                <div className=" flex justify-between p-5 w-4/6">
                    <b className=" bg-purple-900 py-1 px-6 rounded-s-full rounded-e-full cursor-pointer text-white font-normal hover:bg-purple-800 " onClick={handleCancel}>Cancle</b>
                    <b className=" bg-purple-900 py-1 px-6 rounded-s-full rounded-e-full cursor-pointer text-white font-normal hover:bg-purple-800 " onClick={handleSubmit}>Save</b>
                </div>

            </div>
            
        </div>
    )
}

export default EditProfile;