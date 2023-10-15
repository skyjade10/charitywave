import React, { useContext } from "react"

const myScrollBar = () => {
    return (
        " overflow-x-hidden scrollbar-track-fuchsia-300 scrollbar-thumb-fuchsia-700 scrollbar-none  scrollbar-rounded-md  hover:scrollbar-thin "
    )
}

const Ads = () => {


    return (
        <div className= {`mt-4 rounded-md h-[80vh]  bg-slate-50 overflow-y w-auto ${myScrollBar}`}>
            {""}
        </div>
    )
}

export default Ads;