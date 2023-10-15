
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router'
import { BackendContext } from '../context/BackendContext';
import { ClientContext } from '../context/ClientContext';
import * as bip39 from '@scure/bip39';
import { wordlist as english } from '@scure/bip39/wordlists/english';
import { IS_LOGGED_IN, VOYTE_USER } from '../context/stateconstants';

import { contractAddress, contractAbi } from '../context/constants';

const SignUpModal = () => {

    const { setVoyteUser,tronLinkConnected,setIsLogged,currentAccount,getVoyteContract } = useContext(BackendContext);
    const { checkPassword,requiredTextLength,handleChange,setSignUpModalIsOpen,setSignInModalIsOpen,setMnemonicModalOpen,setMiscData } = useContext(ClientContext);
    const [ signUpData, setSignUpData ] = useState({address:'',password:''});
    const [ passwordStatus, setPasswordStatus ] = useState({message:'',isValid:false});
    const [ signUpLoader, setSignUpLoader] = useState(false);
    const [ addressChangeInfo, setAddresChangeInfo ] = useState('');
    var addressText = '';

    const navigate = useNavigate();

    const Loader = (classProps) => {
        return (
            <div className=" flex justify-center items-center py-3">
                <div className={` animate-spin rounded-full h-10 w-10  ${classProps} border-b-4 border-purple-500`}/>
            </div>
        )
    }
    

    //checks if Last name meet the requirements i.e length
    const handlePassword = (mData) => {
        let {name, value} = mData;
        
        console.log("sign up modal ", value);

         if(requiredTextLength(value,30)){
            setPasswordStatus((prevState) => ({...prevState, message:"",isValid:true}));
            setSignUpData((prevState) => ({...prevState, password:value}));
            if(checkPassword(value)){
                setPasswordStatus((prevState) => ({...prevState, message:"",isValid:true}));
                setSignUpData((prevState) => ({...prevState, password:value}));
            }else{
                setPasswordStatus((prevState) => ({...prevState, message:"Password must contain number characters",isValid:false}));
            }
         }else{
            setPasswordStatus((prevState) => ({...prevState, message:"Character length exceeded (Max is 30 chars)",isValid:true}));
         }

        
    }


    const handleUint = (value) => {
        
        
        if(value == null )
             value = ' ';
        // var valuem = window.tronWeb.fromAscii(value);
        
        var valuem = value;

         var valueLength = toString(valuem).length;
         console.log("valueLength :",valueLength)
         var paddText = '';
         const num = Math.pow(2,255);
         console.log("num :",num)
         if(valueLength < num){
             var holder = num-valueLength;
             console.log("valueLength",valueLength);
             console.log("holder",holder);
             paddText = valuem.padEnd(num,'0');
             console.log("PaddesText",paddText);
             return paddText;
         }
 
         console.log("holder",value);
         return value;
         
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

    const handleSubmit = async () => {
        if(tronLinkConnected){
            setSignUpLoader(true);

            try {
                

                const instance = await window.tronWeb.contract(contractAbi,contractAddress);
                const mnemonic = bip39.generateMnemonic(english); 
                const mn =  window.tronWeb.fromMnemonic(mnemonic)
                
                var signUp = await instance.creatUser(signUpData.address,signUpData.password,mn.privateKey).send({
                    feeLimit:100_000_000,
                    callValue:0,
                    shouldPollResponse:true
                });
   
                console.log(signUp);
                  if(signUp.success){
                      setVoyteUser((prevState) => ({...prevState,address:signUpData.address,password:signUpData.password}))
                      setIsLogged(true);
                      //saving session data
                      window.localStorage.setItem(VOYTE_USER, JSON.stringify(signUpData));
                      window.localStorage.setItem(IS_LOGGED_IN, true);
                      setSignUpLoader(false);
                      setMiscData((prevState) => ({...prevState,data:mnemonic}));
                      setMnemonicModalOpen(true);
                      setSignUpModalIsOpen(false);
                       
                }
            } catch (error) {
                console.log(error);
                setSignUpLoader(false);
                alert(error.message)
            }
        }
    }



    useEffect(()=> {

        addressText = 'To change Address please connect to a different Wallet account';
        setAddresChangeInfo((prevState) => addressText);
        setSignUpData((prevState) => ({...prevState,address:currentAccount.base58}));
        console.log("in use effex address",currentAccount);

    },[])

  return (
    <div className='backdrop-blur-sm z-10 absolute w-full h-full bg-gray-500/50 flex justify-center items-center ease-in-out duration-1000' >
        { signUpLoader && (<div className=' flex flex-col justify-center items-center z-20 absolute  backdrop-blur-sm h-[340px] 
         max-w-[500px] w-5/6 sm:w-[700px] lg:w-[700px]' id='signUpLoader'><Loader/></div>)}
        <div className=' max-w-[500px] w-5/6 sm:w-[700px] lg:w-[700px] bg-white px-4 rounded-md shadow-md ease-in' onClick={
            (e) => { e.stopPropagation()}
        }>
            <div className='flex flex-initial justify-end items-center'>
                <p className=' w-7 border-2 p-1 m-2 font-bold text-center rounded-sm shadow-sm cursor-pointer
                 hover:bg-gray-300' onClick={() => {setSignUpModalIsOpen(false)}}>x</p>
            </div>
            <p className=' text-sm'>Requires TronLink to Sign Up</p>
            <div className={` flex flex-col justify-center gap-1 items-start `}>
                <p className={` font-bold text-sm mt-2 text-gray-700`}>Address</p>
                <p className=" text-xs text-green-600" id='textaddress'>{addressChangeInfo}</p> 
                <p name="address" value={""} className={` border-2 w-full h-10 p-2 text-xs md:text-sm text-gray-900
                 border-gray-300 bg-gray-50 rounded-md`}>{signUpData.address}</p>
            </div>
            <div className={` flex flex-col justify-center gap-1 items-start `}>
                <p className={` font-bold text-sm mt-2 text-gray-700`}>Password</p>
                <p className=" text-xs text-red-600">{passwordStatus.message}</p> 
                <input name="password"  className={` border-2 w-full outline-none p-2 text-sm text-center text-gray-900
                 border-gray-300 bg-gray-50 rounded-md hover:border-purple-500 focus:border-purple-800`} onChange={(e)=>{handlePassword(handleChange(e));}}/>
            </div>
            <p className="text-xs self-center m-2 text-gray-600">Already have an account ? <span className="underline cursor-pointer " onClick={() => {setSignInModalIsOpen(true); setSignUpModalIsOpen(false) }}>SignIn</span></p>
            <button className=' text-xs text-white m-4 py-2 px-4 bg-purple-600 hover:bg-purple-500 rounded-s-md rounded-e-md' onClick={handleSubmit}>Sign Up</button>
            
        </div>
    </div>
  )
}

export default SignUpModal