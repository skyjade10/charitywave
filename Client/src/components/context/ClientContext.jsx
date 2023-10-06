import React, { useEffect, useState} from "react";


export const ClientContext = React.createContext();

export const ClientProvider = ({children}) => {

    const [ signInModalIsOpen, setSignInModalIsOpen ] = useState(false);
    const [ signUpModalIsOpen, setSignUpModalIsOpen ] = useState(false);
    const [ mnemonicModalOpen, setMnemonicModalOpen ] = useState(false);
    const [ transactOpen, setTransactOpen ] = useState(true);


    const validateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            console.log("meets the requirements");
            return (true)
            }
            console.log("You have entered an invalid email address!");
            return (false)
        }
    
    
    const checkPassword = (inputtxt) => { 

        var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,150}$/;

        if (inputtxt.match(decimal)) { 
            console.log("meets the requirements");
            return true;
        }
        else { 
            console.log("Password must contain");
            return false;
        }
    }
        
    const requiredTextLength =(text, maxlen) => {
        if(text.length <= maxlen){
            return true;
        }
        return false;
        
    }
    
    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        console.log(name,value);
        return {name,value};
    }

    

    return (
        <ClientContext.Provider value={{mnemonicModalOpen, setMnemonicModalOpen,signInModalIsOpen, setSignInModalIsOpen,signUpModalIsOpen, setSignUpModalIsOpen,validateEmail,checkPassword,requiredTextLength,handleChange}} >
            {children}
        </ClientContext.Provider>
    )
}