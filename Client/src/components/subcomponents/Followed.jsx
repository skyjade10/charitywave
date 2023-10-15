
import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router"

import ShortUniqueId from 'short-unique-id';

const myScrollBar = () => {
    return (
        " overflow-x-hidden scrollbar-track-fuchsia-300 scrollbar-thumb-fuchsia-700 scrollbar-none  scrollbar-rounded-md  hover:scrollbar-thin "
    )
}

const GroupFunc = () => {
    return (
        <div className="flex items-center m-2 gap-2">
            <img src={""} alt="" className="w-[60px] h-[60px] rounded-full "/>
            <h5>Zana Foundation  </h5>
        </div>
    )
}

const createOnHover = () => {
    const hover = document.getElementById("hovercreate");
    hover.style.display = "inline";

}

const createOnOut = () => {
    const hover = document.getElementById("hovercreate");
    hover.style.display = "none";


}





const Followed = () => {

    const [suggestionsData, setSuggestionsData ] = useState([null]);
    const [emergencyData, setEmergencyData ] = useState([null]);
    const navigate = useNavigate();

    const creatPost = () => {
        navigate("/creatpost");
    }

    return (
        <div className="h-[80vh] flex flex-col bg-slate-50 rounded-md p-2 mt-4 shadow-md">
            <div className=" w-full" onClick={createOnHover} onMouseOver={createOnHover} onMouseOut={createOnOut}>
                <button className={`w-full shadow-lg bg-fuchsia-900 pt-2 pb-2 ps-4 pe-4 text-white rounded-full 
                cursor-pointer self-center `}  >Create</button>
                <div className=" hidden" id="hovercreate">
                    <div className="  flex flex-col gap-2 m-2 ">
                        <button className=" shadow-lg bg-fuchsia-900 pt-2 pb-2 ps-4 pe-4 w-auto text-white rounded-full cursor-pointer self-center"
                         onClick={creatPost}>Donate Post</button>
                    </div>
                </div>
            </div>
            <p className="mt-4 mb-1 font-semibold">Emergency</p>
            <div className={`overflow-y h-[100%] ${myScrollBar}`}>
                <hr />

                {emergencyData.map((items) => {

                    if(emergencyData !== null && emergencyData != ''){
                        return <GroupFunc prop ={items}/>
                    }

                    return <div></div>
                })}
                
            </div>

            <p className="mt-4 mb-1 font-semibold">Suggestion</p>
            <div className={`overflow-y h-[100%] ${myScrollBar}`}>
                <hr />
                {suggestionsData.map((items) => {

                    if(suggestionsData !== null && suggestionsData != ''){
                        return <GroupFunc prop ={items}/>
                    }

                    return <div className=" text-center"> No suggestions</div>
                })}
                
            </div>
        </div>
    )
}


export default Followed;