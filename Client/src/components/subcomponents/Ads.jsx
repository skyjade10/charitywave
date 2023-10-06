import React, { useContext } from "react"

const myScrollBar = () => {
    return (
        " overflow-x-hidden scrollbar-track-fuchsia-300 scrollbar-thumb-fuchsia-700 scrollbar-none  scrollbar-rounded-md  hover:scrollbar-thin "
    )
}

const Ads = () => {


    return (
        <div className= {` h-[70%] bg-[#CB0030] overflow-y-scroll w-auto ${myScrollBar}`}>
            {"hello"}
        </div>
    )
}

export default Ads;