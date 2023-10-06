import React, { useEffect, useState} from "react";
import { contractAddress, contractAbi } from '../context/constants';

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
            if(!window.tron) return alert("Connect Tron link");

            if(tronLinkIsConnected){

                const accounts = await window.tronWeb.defaultAddress;
                setCurrentAccount(accounts);
                setTronLinkConnected(true);

                return true;
            }
 
             
         } catch (error) {
             console.log('my Connect wallet error',error);
         }

    }

    ///Contract methods

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

    

    return (
        <BackendContext.Provider value={{postData, setPostsData,pagesData, setPagesData,getVoyteContract,
                                        tronLinkIsConnected,tronLinkConnected,connectWallet,currentAccount,
                                        isLoggedIn,setIsLogged,voyteUser, setVoyteUser}} >
            {children}
        </BackendContext.Provider>
    )
}