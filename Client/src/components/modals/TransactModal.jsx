
import React, { useContext, useState,useEffect } from 'react';
import { BackendContext } from '../context/BackendContext';
import { ClientContext } from '../context/ClientContext';
import { InfoModal } from "../../components"

const TransactModal = () => {

    const { voyteUser, setVoyteUser,tronLinkConnected } = useContext(BackendContext);
    const { setSignInModalIsOpen,handleChange,setTransactModalOpen,transactionData } = useContext(ClientContext);
    const [transactInfo, setTransactInfo ] = useState({});
    
    const handleCountry = (mData) => {
        let {name, value} = mData;

        setVoyteUser((prevState)=>({...prevState, address:currentAccount.base58,password:value}));
        
    }

    const getName = () => {
        if(transactionData != null){
            return transactionData.name
        }

        return ''
    }
    const getId = () => {
        if(transactionData != null){
            return transactionData.postId
        }

        return ''
    }
    const getAddress = () => {
        if(transactionData != null){
            return window.tronWeb.address.fromHex(transactionData.address)
        }

        return ''
    }

    const handleSubmit = () => {

        try {

            console.log(transactionData)
            window.tronWeb.transactionBuilder.sendTrx(getAddress(), 2000);
            //setTransactModalOpen(false);
        } catch (error) {
            console.log()
        }

        return <InfoModal data ={"hello"}/>;
    }


  return (
    <div className='backdrop-blur-sm z-10 absolute w-full h-full bg-gray-500/50 flex justify-center items-center' >
        <div className=' w-10/12 sm:w-9/12 md:w-[400px] lg:w-[400px] bg-white px-4 rounded-md shadow-md ease-in' onClick={
            (e) => { e.stopPropagation()}
        }>
            <div className='flex flex-initial justify-end items-center'>
                <p className=' w-7 border-2 p-1 m-2 text-center rounded-sm shadow-sm cursor-pointer hover:bg-gray-300' onClick={() => {setTransactModalOpen(false)}}>x</p>
            </div>
            { tronLinkConnected ? <p className=' text-sm'></p> : <p className=' text-sm'>Please connect wallet to continue</p>}
            <p className=' text-sm text-gray-700 font-bold'>Donating to: </p>
            <div className='flex flex-initial flex-col items-start'>
                <p className=' text-sm text-gray-700 font-bold'>Name</p>
                <p className=' text-sm text-gray-700'>{getName()}</p>
                <p className=' text-sm text-gray-700 font-bold'>Address</p>
                <p className=' text-sm text-gray-700'>{getAddress()}</p>
                <p className=' text-sm text-gray-700 font-bold'>Post ID</p>
                <p className=' text-sm text-gray-700 '>{getId()}</p>
            </div>
            <div className={` flex flex-col justify-center gap-1 `}>
                <p className={` font-bold text-sm mt-2 text-gray-700 px-2 justify-start`}>Amount</p>
                <p className=" text-xs text-red-600"></p> 
                <div className=' w-full flex flex-row justify-center items-center gap-2 px-2'>
                    <input type={'number'} name="country" className={` border-2 w-full outline-none p-2 text-sm text-gray-900
                    border-gray-300 bg-gray-50 rounded-md hover:border-purple-500 focus:border-purple-800`} onChange={(e)=>{handleSubmit(handleChange(e));}}/>
                    <p className=' text-sm text-gary-700 font-semibold px-2'>Trx</p>
                </div>
            </div>
            
            <button className=' justify-self-center self-center text-xs text-white m-4 py-2 px-4 bg-purple-600 rounded-s-md rounded-e-md' onClick={handleSubmit}>Donate</button>
        </div>

    </div>
  )
}

export default TransactModal