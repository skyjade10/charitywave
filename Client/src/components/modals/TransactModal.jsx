
import React, { useContext, useState,useEffect } from 'react';
import { BackendContext } from '../context/BackendContext';
import { ClientContext } from '../context/ClientContext';
import { InfoModal } from "../../components"
import { async } from '@firebase/util';

const TransactModal = () => {

    const { voyteUser, setVoyteUser,tronLinkConnected } = useContext(BackendContext);
    const { setSignInModalIsOpen,handleChange,setTransactModalOpen,transactionData } = useContext(ClientContext);
    const [transactInfo, setTransactInfo ] = useState({amount:0});
    
    const handleAmount = (mData) => {
        let {name, value} = mData;

        console.log(value)
        if(value != null && value > 0){

            let mValue = value*1000000
            setTransactInfo((prevState)=>({...prevState, amount:mValue}));
        }
    }
    
    const getMiniAmount = () => {
        if(transactionData != null){
            if(transactionData.minAmount != null){
                return transactionData.minAmount*1000000
            }
        }

        return 0
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
            console.log(transactInfo.amount)
            return window.tronWeb.address.fromHex(transactionData.address)
            //return window.tronWeb.address.toHex("TYKNuXd6RbCM1gpD6rE67DUELbVvaJj394")
        }

        return ''
    }

    const handleSubmit = async () => {

        try {

            
            let tronweb = window.tronWeb
            let amount = getMiniAmount() + transactInfo.amount
            console.log("amoutn",amount)
            //setTransactModalOpen(false);
            
            console.log("getmin",getMiniAmount())
            if (tronweb && tronweb.defaultAddress.base58) {
                let tx = await tronweb.trx.sendTransaction("TYKNuXd6RbCM1gpD6rE67DUELbVvaJj394", amount)
               // let signedTx = await tronweb.trx.sign(tx)
              //  console.log(tx);
                //console.log(signedTx);
                
            }
        } catch (error) {
            console.log(error)
        }

        return <InfoModal data ={"hello"}/>;
    }

    useEffect(()=>{

        if(transactionData != null){
            if(transactionData.minAmount > 0){
                const mAmount  = document.getElementsByName('mini-amount');
                mAmount.classList.remove('hidden')
            }
        }

    },[]);


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
                <div name="mini-amount" className='hidden flex-col items-start'>
                    <p className=' text-sm text-gray-700 font-bold'>Mini Amount</p>
                    <p className=' text-sm text-gray-700 '>{getMiniAmount()} Trx</p>
                </div>
            </div>
            <div className={` flex flex-col justify-center gap-1 `}>
                <p className={` font-bold text-sm mt-2 text-gray-700 px-2 justify-start`}>Amount</p>
                <p className=" text-xs text-red-600"></p> 
                <div className=' w-full flex flex-row justify-center items-center gap-2 px-2'>
                    <div className='flex flex-row w-full justify-center items-center border-2  border-gray-300 bg-gray-50 rounded-md hover:border-purple-500 focus:border-purple-800'>
                        <div name="mini-amount" className='hidden flex-row justify-center items-center'>
                            <p className='ms-2'>h </p>
                            <p className=' ms-2'> +</p>
                        </div>
                        <input autocomplete="off" type='number' name="country" className={`  w-full outline-none p-2 text-sm text-gray-900
                        `} onChange={(e)=>{handleAmount(handleChange(e));}}/>
                    </div>
                    <p className=' text-sm text-gary-700 font-semibold px-2'>Trx</p>
                </div>
            </div>
            
            <button className=' justify-self-center self-center text-xs text-white m-4 py-2 px-4 bg-purple-600 rounded-s-md rounded-e-md' onClick={handleSubmit}>Donate</button>
        </div>

    </div>
  )
}

export default TransactModal