
import React, { useContext, useState } from 'react';
import { BackendContext } from '../context/BackendContext';
import { ClientContext } from '../context/ClientContext';

const TransactModal = () => {

    const { voyteUser, setVoyteUser } = useContext(BackendContext);
    const { setSignInModalIsOpen } = useContext(ClientContext);
    
    const handleCountry = (mData) => {
        let {name, value} = mData;

        setVoyteUser((prevState)=>({...prevState, address:currentAccount.base58,password:value}));
        
    }

    const handleSubmit = () => {

    }

  return (
    <div className='backdrop-blur-sm z-10 absolute w-full h-full bg-gray-500/50 flex justify-center items-center' onClick={() => {setSignInModalIsOpen(false)}}>
        <div className=' max-w-[500px] w-2/4 sm:w-[300px] lg:w-[400px] bg-white px-4 rounded-md shadow-md ease-in' onClick={
            (e) => { e.stopPropagation()}
        }>
            <div className='flex flex-initial justify-end items-center'>
                <p className=' w-7 border-2 p-1 m-2 text-center rounded-sm shadow-sm cursor-pointer hover:bg-gray-300' onClick={() => {setSignInModalIsOpen(false)}}>x</p>
            </div>
            <p className=' text-sm'>Requires TronLink to login</p>
            <div className={` flex flex-col justify-center gap-1 items-start `}>
                <p className={` font-bold text-sm mt-2 text-gray-700`}>Password</p>
                <p className=" text-xs text-red-600"></p> 
                <input name="country" className={` border-2 w-full outline-none p-2 text-sm text-gray-900
                 border-gray-300 bg-gray-50 rounded-md hover:border-purple-500 focus:border-purple-800`} onChange={(e)=>{handleCountry(handleChange(e));}}/>
            </div>
            <button className=' text-xs text-white m-4 py-2 px-4 bg-purple-600 rounded-s-md rounded-e-md'>Login</button>
        </div>
    </div>
  )
}

export default TransactModal