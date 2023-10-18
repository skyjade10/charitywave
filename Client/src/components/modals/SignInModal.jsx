
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BackendContext } from '../context/BackendContext';
import { ClientContext } from '../context/ClientContext';
import { contractAbi, contractAddress } from '../context/constants';
import { VOYTE_USER, IS_LOGGED_IN } from '../context/stateconstants';

const SiginModal = () => {

    const { voyteUser, setVoyteUser,tronLinkConnected,getVoyteContract,isLoggedIn,setIsLogged,currentAccount,connectWallet } = useContext(BackendContext);
    const { setSignInModalIsOpen,setSignUpModalIsOpen,handleChange } = useContext(ClientContext);
    const [ signUpLoader, setSignUpLoader] = useState(false);

    const Loader = (classProps) => {
        return (
            <div className=" flex justify-center items-center py-3">
                <div className={` animate-spin rounded-full h-10 w-10  ${classProps} border-b-4 border-purple-500`}/>
            </div>
        )
    }
    
    const handlePasswordChange = (mData) => {
        let {name, value} = mData;
        
        if(!isLoggedIn)
            setVoyteUser((prevState)=>({...prevState, address:currentAccount.base58,password:value}));
        
    }

    const handleSubmit = async () => {
        const signInInfo = document.getElementById("signin-info");
        const loginError = document.getElementById("login-error");
        try {
            
            if(connectWallet){

                if(voyteUser.password !== '' && voyteUser.password != null){

                    setSignUpLoader(true);
                    const instance = await window.tronWeb.contract(contractAbi,contractAddress);
                    const login = await instance.login(voyteUser.address,voyteUser.password).call({shouldPollResponse:true});
        
                    
                      if(login.success){
                        window.localStorage.setItem(VOYTE_USER, JSON.stringify(voyteUser));
                        window.localStorage.setItem(IS_LOGGED_IN, true);
                        setIsLogged(true);
                        signInInfo.classList.remove("hidden");
                        signInInfo.innerText = "Login Successffully"
                        setTimeout(() => {
                            setSignUpLoader(false);
                            setSignInModalIsOpen(false)
                        }, 3000);
                      }else{
                        loginError.classList.remove("hidden")
                        loginError.innerText = "Please check your password and try again"
                      }
                }else{
                    loginError.classList.remove("hidden")
                    loginError.innerText = "password cannot be empty"
                    
                }
            }else{
                signInInfo.classList.add("content");
                signInInfo.value = " Please connect TronLink"
            }
        } catch (error) {
            setSignUpLoader(false);
            console.log(error.message)
            if(error.code == "INVALID_ARGUMENT"){
                signInInfo.classList.remove("hidden");
                signInInfo.innerText = "Please connect wallet"
            }
        }
    }

  return (
    <div className=' backdrop-blur-sm z-10 absolute w-full h-full bg-gray-500/50 flex justify-center items-center'>
        { signUpLoader && (<div className=' flex flex-col justify-center items-center z-20 absolute  backdrop-blur-sm h-[340px] 
         max-w-[500px] w-5/6 sm:w-[700px] lg:w-[700px]' id='signUpLoader'><Loader/></div>)}
        <div className=' backdrop-blur-sm z-10 absolute w-full h-full bg-gray-500/50 flex justify-center items-center' onClick={() => {setSignInModalIsOpen(false)}}>
            <div className=' transition ease-out duration-200 max-w-[500px] w-10/12 sm:w-9/12 md:w-[400px] lg:w-[400px] bg-white px-4 rounded-md shadow-md' onClick={
                (e) => { e.stopPropagation()}
            }>
                <div className='flex flex-initial justify-end items-center'>
                    <p className=' w-7 border-2 p-1 m-2 text-center rounded-sm shadow-sm cursor-pointer hover:bg-gray-300' onClick={() => {setSignInModalIsOpen(false)}}>x</p>
                </div>
                <p className=' hidden p-2 bg-gray-100 text-gray-700' id='signin-info'></p>
                <p className=' text-sm'>Requires TronLink to login</p>
                <div className={` flex flex-col justify-center gap-1 items-start `}>
                    <p className={` font-bold text-sm mt-2 text-gray-700`}>Password</p>
                    <p className="hidden text-xs text-red-600 " id='login-error'></p> 
                    <input name="country" className={` border-2 w-full outline-none p-2 text-sm text-gray-900
                    border-gray-300 bg-gray-50 rounded-md hover:border-purple-500 focus:border-purple-800`} onChange={(e)=>{handlePasswordChange(handleChange(e));}}/>
                </div>
                <p className="text-xs self-center m-2 text-gray-600">Dont have an account ? <span className="underline cursor-pointer " onClick={() => {setSignInModalIsOpen(false); setSignUpModalIsOpen(true) }}>Sign Up now</span></p>
                <button className=' text-xs text-white m-4 py-2 px-4 bg-purple-600 rounded-s-md rounded-e-md' onClick={handleSubmit}>Login</button>
                
            </div>
        </div>
    </div>
  )
}

export default SiginModal