import React, { useState, useContext, useRef,useEffect } from 'react';
import { MdEmail,MdLock  } from 'react-icons/md';
import { IoPersonSharp } from 'react-icons/io5';

const InputMethod = ({vType,hold, classProps,icon,iconEye,mName,mHandleChange}) => {
    return (
        <div className=" flex flex-row border-b-2 mb- mt-2">
            <div className="self-center text-red ">
                {icon }
            </div>
            <input type={vType} placeholder={hold} name={mName} className={`w-full px-2 focus:outline-0 ${classProps}`} onChange={mHandleChange}/>
            <div className="self-center ">
                {iconEye}
            </div>
        </div>
    )
}

const SignUp = () => {

    const iconStyle = {color: "#465CF0", fontSize: "2.0em"};

    const [ dataSet, setDataSet ] = useState('');
    const [ passowrdAccepted,setPassowrdAccepted ] = useState(false);
    const [ emailAccepted, setEmailAccepted ] = useState(false);
    const lengthAccepted = useRef({firstname:false,lastname:false,email:false,password:false,repassword:false});

    const myHandler = (e,maxleng) => {

        try {

            let name =  handleChange(e).name;
            let value = handleChange(e).value;
            let maxLen = maxleng;
            console.log("name: ",name," value: ",value," Length: ",maxLen);
            if(name=="password"){
                if(checkPassword(value))
                    setPassowrdAccepted(true);
                setPassowrdAccepted(false);
            }
            if(name=="email"){
                if(checkPassword(value))
                    setEmailAccepted(true);
                setEmailAccepted(false);
            }
    
            if(value.length < maxLen){
                lengthAccepted.current.name=true;
                console.log("Field char length: ", lengthAccepted.current.name);
                console.log("Field char length: ", value.length);
            }
                
            if(value.length > maxLen){
                lengthAccepted.current.name=false;
                console.log("Field char length: ", lengthAccepted.current.name);
                console.log("Field char length: ", value.length);
            }
            
            setSignUpFormData((prevState) =>({...prevState,name:value}));
            
        } catch (error) {
            console.log("My handler error",error)
        }

    }

    const checVa = () => {
        console.log("var check: ", lengthAccepted.current.firstname);
    }

    useEffect(checVa);

    return(
        <form className="flex flex-col bg-white rounded-[10px] m-4 p-4 text-sm">
            <InputMethod icon={<IoPersonSharp style={iconStyle}/>} vType={"text"} hold={"First Name"} mName={"firstname"} mHandleChange={(e)=>{myHandler(e,20)}}/>
            {lengthAccepted.current.firstname &&(<p className='text-[10px] '>You have exceeded the number of characters Allowed! </p>)}
            <InputMethod icon={<IoPersonSharp style={iconStyle}/>} vType={"text"} hold={"Last Name"} mName={"lastname"} mHandleChange={(e)=>{myHandler(e,150)}}/>
            <InputMethod icon={<MdEmail style={iconStyle}/>} vType={"email"} hold={"Email"} mName={"email"} mHandleChange={(e)=>{myHandler(e,150)}}/>
            <InputMethod icon={<MdLock style={iconStyle}/>} vType={"password"} hold ={"Password"} mName={"password"} mHandleChange={(e)=>{myHandler(e,150)}}/>
            <InputMethod icon={<MdLock style={iconStyle}/>} vType={"password"} hold ={"Re-Enter Password"} mName={"repassword"} mHandleChange={(e)=>{myHandler(e,150)}}/>

            <button type="submit" className='bg-[#465CF0] rounded-sm text-[#ffffff] m-4 p-2' onClick={""}>Sign Up</button>

            <p className="text-xs self-center">Already have an account ? <span className="underline cursor-pointer">Sign In</span></p>

        </form>
    )
}

export default SignUp;