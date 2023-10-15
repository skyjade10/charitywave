
import React, { useContext, useState,useEffect } from 'react';
import * as bip39 from '@scure/bip39';
import { wordlist as english } from '@scure/bip39/wordlists/english';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router'
import { BackendContext } from '../context/BackendContext';
import { ClientContext } from '../context/ClientContext';





const MnemoniItem = ({title, classProps}) => {
    return (
        <li className={`cursor-pointer text-gray-800  ${classProps}`} >
            {title}
        </li>
    )
}

const MnemonicModal = (props) => {

    const { voyteUser, setVoyteUser,tronLinkConnected,setIsLogged } = useContext(BackendContext);
    const { setSignInModalIsOpen,setMnemonicModalOpen,miscData } = useContext(ClientContext);
    const [ radioBtnStatus,setRadioBtnStatus ] = useState({aa:false,bb:false,cc:false});
    const [ mnemonicDataM, setMnemonicDataM ] = useState(['']);
    const navigate = useNavigate();
    const location = useLocation();

    const mn = '';


    // const generateMnemo = () => {

    //     return  bip39.generateMnemonic(english) // default to 128

    // }
    

    const handleSubmit = async () => {
        navigate('/addprofile');
        setMnemonicModalOpen(false);
        
    }
    
    const handleRadio = async (e) => {
        var btn = document.getElementById("confirmBtn");
        let radioA = document.getElementById("aa").checked;
        let radioB = document.getElementById("bb").checked;
        let radioC = document.getElementById("cc").checked;
        

        
        if( radioA && radioB && radioC){
            btn.disabled = false;
        }

    }

    useEffect(() =>{
        var btn = document.getElementById("confirmBtn");
        btn.disabled = true;
        
        var mn = "";
        var mdata = miscData.data;
        if(mn != null && mdata != null){
            mn = mdata.split(' ');
            setMnemonicDataM((prevState) => mn);
            
        }
    },[]);

  return (
    <div className=' backdrop-blur-sm z-10 absolute w-full h-full bg-gray-500/50 flex justify-center items-center' >
        <div className=' max-w-[500px] w-2/4 sm:w-[300px] lg:w-[400px] bg-white px-4 rounded-md shadow-lg shadow-slate-700 ease-in' onClick={
            (e) => { e.stopPropagation()}
        }>
            <p>{mn}</p>
            <p className=' text-sm m-4'>Requires TronLink to login </p>
            <div className=' grid grid-cols-3 list-none gap-5 lg:gap-5'>
                {mnemonicDataM.map((item, index) => {

                    if(item != null && item != ''){

                        return (
                            <div className=' border-2 bg-gray-100 border-gray-500 rounded-md ' >
                                <MnemoniItem key = {item + index} title = {item} classProps = " my-1 text-xs lg:text-sm" />
                            </div>
                        )
                    }
                    return <div></div>
                })}
            </div>
        
            <p className="text-xs self-center m-2 text-gray-600">Please mark the box to confirm that youhave taken note</p>
            <div className=' flex flex-row gap-2 justify-center items-center'>
                <input type="radio" name="a" id="aa" onClick={(e) => handleRadio(e)}/>
                <input type="radio" name="b" id="bb" onClick={(e) => handleRadio(e)}/>
                <input type="radio" name="c" id="cc" onClick={(e) => handleRadio(e)}/>
            </div>
            <button className=' text-xs text-white shadow-sm shadow-purple-800 m-4 py-2 px-4 bg-purple-600 
            rounded-s-md rounded-e-md hover:bg-purple-500 disabled:bg-purple-300 disabled:shadow-none' id='confirmBtn' disabled='' onClick={handleSubmit}>Confirm</button>
            
        </div>
    </div>
  )
}

export default MnemonicModal