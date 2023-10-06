import React, {useState} from 'react'
import logo from '../assets/images/logoc.png'
import { CgProfile,CgSearch } from 'react-icons/cg'
import { MdMenu,MdOutlineListAlt,MdInfoOutline  } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import theme from '../colors';
import { useContext } from 'react'
import { BackendContext } from './context/BackendContext'
import { ClientContext } from './context/ClientContext'


const menuIconsStyle = {color:theme.purple, fontSize: "2.0em"}

const MenuItems = ({icon,title,menuOnClick}) => {
    
    return (
        <div className={` border-2 hover:border-2 hover:border-b-[#8E8DBE] flex flex-row items-center py-2 mx-5 gap-4 text-gray-600 cursor-pointer
        active:bg-gray-200 border-b-2 border-transparent hover:border-[${theme.purple}]`} onClick={menuOnClick}>
            {icon}
            <p>{title}</p>
        </div>
    )
}

const NavBar = () => {

    const { tronLinkConnected,tronLinkIsConnected,currentAccount,connectWallet,isLoggedIn,getVoyteContract } = useContext(BackendContext);
    const { setSignInModalIsOpen } = useContext(ClientContext);
    const [ searchToggle,setSearchToggle ] = useState(false);
    const [ menuToggle,setMenuToggle ] = useState(false);
    const [ walletConnected,setWalletConnected] = useState(false);
    const navigate = useNavigate();


    const connectWalletOnclick = (e) => {
        e.preventDefault();
        if(connectWallet()){

            setWalletConnected(true);
            alert("TronLink connected");
        }else{

            alert("Please Install TronLink or Login to Tronlink to continue");
        }
    }

    //Menu item onclick functions
    /**
     * First checks if tronLink is avalaible, if not asks user to install tronlink
     * if is checks if current user has been set. if curent user is null. calls connect wallet
     * the user. then checks again if the user has been set. then checks if the user address has a profile
     * @param {*} e 
     * @returns 
     */
    const profileOnclick = async (e) => {
        e.preventDefault();
        
        if(tronLinkConnected){
           if(currentAccount.base58 != null || currentAccount.base58 != ''){
             if(isLoggedIn){
                navigate('/profile');
                setMenuToggle(false)
                console.log("naviageting to profile");
             }else{
                //navigate('/login');
                setSignInModalIsOpen(true);
                setMenuToggle(false)
                console.log("navigating to login");
             }
             
           }
           
        }else{

            if(connectWallet()){
                setSignInModalIsOpen(true);
                setMenuToggle(false);
                return
            }else{
                setMenuToggle(false)
                return alert("TronLink not connected");
            }

            
        }
    }
    

    const SignInclick = async (e) => {
        e.preventDefault();
        
        if(tronLinkConnected){
           if(currentAccount.base58 != null || currentAccount.base58 != ''){
             
                //navigate('/login');
                setSignInModalIsOpen(true);
                setMenuToggle(false)
                console.log("navigating to login");
             
           }
           
        }else{

            if(connectWallet()){
                setSignInModalIsOpen(true);
                setMenuToggle(false);
                return
            }else{
                setMenuToggle(false)
                return alert("TronLink not connected");
            }

            
        }
    }



    const handleSearch = () =>{
        navigate('/search');
    }

    const iconsStyle = {color:theme.purple, fontSize: "2.0em"}
    const iconClass = " p-1 hover:bg-gray-300 active:bg-zinc-400 cursor-pointer"
    return (
        <nav className='fixed z-20 mb-10 w-full px-8 p-1 flex flex-row justify-between items-center border-b-2 bg-white'>
            <Link to={"/"}>
                <div className=' mx-2  w-24 cursor-pointer'>
                    {/* <img src={logo} alt="logo" /> */<p className=' text-[#7A306C] font-bold text-lg'>CharityWave</p>}
                </div>
            </Link>

            {searchToggle && (
                <div>
                    <input type="search" name="" id="" className=' text-gray-600 text-sm
                    md:w-[400px] lg:w-[500px] px-4 py-2 rounded-s-full 
                    rounded-e-full outline-none border-2 border-blue-500'
                    onSubmit={()=>{handleSearch()}}/>
                </div>
            )}
            
            <ul className='flex gap-4 items-center'>
                <li className={` ${iconClass}  `} onClick={()=>{
                    searchToggle?setSearchToggle(false): setSearchToggle(true)
                }}>{<CgSearch style={iconsStyle}/>}</li>
                <Link to={"/profile"}><li className={` ${iconClass}`}>{<CgProfile style={iconsStyle}/>}</li></Link>
                <li onClick={()=>{
                    menuToggle?setMenuToggle(false):setMenuToggle(true)
                    }} className={` ${iconClass}`}>{<MdMenu style={iconsStyle}/>}</li>
            </ul>

            {menuToggle &&
            (
                <div className=' fixed bg-gray-200  w-[250px] top-14 p-2 flex flex-col gap-1 end-0 border-2 rounded-sm'>
                    
                    {!walletConnected &&(
                        <div>
                            <button className=' border-2 border-white rounded-s-full rounded-e-full
                            px-4 py-1 mt-4 mx-5 text-gray-700 hover:bg-gray-300' onClick={SignInclick}>Login</button>
                        
                        </div>
                    )}
                    {!isLoggedIn &&(
                        <div>
                            <button className=' border-2 border-white rounded-s-full rounded-e-full
                            px-4 py-1 my-4 mx-5 text-gray-700 hover:bg-gray-300' onClick={connectWalletOnclick}>Connect Wallet</button>
                        
                        </div>
                    )}


                    <hr className=' border-gray-400'/>

                    {<MenuItems icon={<CgProfile style={menuIconsStyle} />} title="My Profile" menuOnClick={profileOnclick}/>}
                    {<MenuItems icon={<MdOutlineListAlt style={menuIconsStyle }/>} title="Post"/>}
                    {<MenuItems icon={<CgProfile style={menuIconsStyle}/>} title="Organisations"/>}
                    {<MenuItems icon={<CgProfile style={menuIconsStyle}/>} title="FAQ"/>}
                    {<MenuItems icon={<MdInfoOutline style={menuIconsStyle}/>} title="About"/>}
                    
                    {walletConnected && (
                        <div>
                            <hr className=' border-gray-400'/>
                            <button className={` bg-[${theme.purple}] border-2 border-[#7A306C] rounded-s-full rounded-e-full
                            px-4 py-1 my-4 mx-5 text-gray-700 hover:bg-gray-300`}>Sign Out</button>
                        </div>
                    )}
                    
                </div>
            ) 
            }
            
        </nav>
    )
}

export default NavBar;