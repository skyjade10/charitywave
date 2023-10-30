import React, { useEffect, useState} from "react";
import { contractAddress, contractAbi } from '../context/constants';

import { CURRENT_ACCOUNT,TRON_LINK_IS_CONNECTED,IS_LOGGED_IN,VOYTE_USER } from "./stateconstants";

export const BackendContext = React.createContext();

//const tron = window.tron;
//const tronWeb = tron.tronWeb;


const getVoyteContract = async () => {  
    try {
        
        const instance = await window.tronWeb.contract(contractAbi,contractAddress);
    
        console.log(instance);
        return instance;
    } catch (error) {
        console.log(error);
    }   
        
}


export const BackendProvider = ({children}) => {

    
    const [ postData, setPostsData ] = useState([]);
    const [ pagesData, setPagesData ] = useState([]);
    const [ tronLinkConnected, setTronLinkConnected ] = useState(false);
    //acount for the voyte user
    const [ voyteUser, setVoyteUser ] = useState({address:'',password:''});
    //account for the connected Tron link wallet
    const [currentAccount,setCurrentAccount] = useState('');
    const [ isLoggedIn, setIsLogged ] = useState(false);

    const tronLinkIsConnected = async () => {
        
        try {

            if(!window.tron) return alert("Please install TronLink extension");
            
            const connected = await window.tronWeb.request({
                method:'tron_requestAccounts',
                params: {
                    websiteIcon: '',
                    websiteName: 'www.google.com',
                  },
            });

            if(connected.code == 200){
                alert("TronLink connected");
                setTronLinkConnected(true);
                //save tronlink connection state even after refresh
                window.sessionStorage.setItem(TRON_LINK_IS_CONNECTED, true);
                console.log("my tron web",connected);
                return true;
            }
            console.log(accounts);
        } catch (error) {
            alert("TronLink not connected");
            setTronLinkConnected(false);
            console.log("my error",error);
            return false;
        }

    }

    const connectWallet = async () => {
     
        try {
            if(!window.tron){
                alert("Connect Tron link");
                return false;
            } 
                

            if(tronLinkIsConnected){

                const accounts = await window.tronWeb.defaultAddress;
                setCurrentAccount(accounts);
                //save account state even after refresh
                window.sessionStorage.setItem(TRON_LINK_IS_CONNECTED, true);
                setTronLinkConnected(true);

                return true;
            }
 
             
         } catch (error) {
             console.log('my Connect wallet error',error);
         }

    }

    ///Contract methods

    const deletePost = async () => {

    }

    const editPost = async () => {

    }

    const reportPost = () => {

    }

    const reportPage = () => {
        
    }

    const getPosts = async () => {
        try {
            const contract = getVoyteContract;

            const postId  = await getVoyteContract.bookId().call();
            //iterate from 0 till bookId
            for (let i = 0; i < postId; i++){
              const post = await getVoyteContract.books(i).call()
              if(post.name!="") // filter the deleted books
              {
                books.push(
                 // {id: i,name: book.name,description: book.description,price: tronWeb.fromSun(book.price)}
                )
              }
              
            }
            return books
            

        } catch (error) {
            
        }
    }


    useEffect(() => {

        if(JSON.parse(window.localStorage.getItem(VOYTE_USER)) !== null){
            setVoyteUser(JSON.parse(window.localStorage.getItem(VOYTE_USER)));
            setIsLogged(true)
        }

        if(JSON.parse(window.localStorage.getItem(CURRENT_ACCOUNT)) !== null){
            
            setCurrentAccount(JSON.parse(window.localStorage.getItem(CURRENT_ACCOUNT)))
        }
        if(window.localStorage.getItem(TRON_LINK_IS_CONNECTED) !== null){

            setTronLinkConnected(window.localStorage.getItem(TRON_LINK_IS_CONNECTED))
        }
        
        
      }, []);

    

    return (
        <BackendContext.Provider value={{postData, setPostsData,pagesData, setPagesData,getVoyteContract,
                                        tronLinkIsConnected,tronLinkConnected,connectWallet,currentAccount,
                                        isLoggedIn,setIsLogged,voyteUser, setVoyteUser}} >
            {children}
        </BackendContext.Provider>
    )
}