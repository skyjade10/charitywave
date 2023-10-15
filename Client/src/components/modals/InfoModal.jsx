
import React, { useContext, useState } from 'react';
import { BackendContext } from '../context/BackendContext';
import { ClientContext } from '../context/ClientContext';

const InfoModal = (props) => {

    const { voyteUser, setVoyteUser } = useContext(BackendContext);
    const { setSignInModalIsOpen } = useContext(ClientContext);
    
    const handleCountry = (mData) => {
        let {name, value} = mData;

        setVoyteUser((prevState)=>({...prevState, address:currentAccount.base58,password:value}));
        
    }

    const handleSubmit = () => {

    }

  return (
    <div className=' z-30 absolute w-full h-full flex justify-center top-10 items-start' >
        <div className=' max-w-[500px] w-2/4 sm:w-[300px] lg:w-[400px] bg-white px-4 my-5  rounded-md shadow-md ease-in' onClick={
            (e) => { e.stopPropagation()}
        }>
            <div className='flex flex-initial justify-end items-center'>
                <p className=' w-7 border-2 p-1 m-2 text-center rounded-sm shadow-sm cursor-pointer hover:bg-gray-300' onClick={() => {setSignInModalIsOpen(false)}}>x</p>
            </div>
            
            <div className={` flex flex-col justify-center gap-1 items-start `}>
                <p className=' text-sm'>{props.data}</p>
                <p className={` font-bold text-sm mt-2 text-gray-700`}>Info</p>
            </div>
        </div>
    </div>
  )
}

export default InfoModal