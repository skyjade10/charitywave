import React, { useContext } from "react"
import pic from '../../assets/images/Borehole.jpg'

const myScrollBar = () => {
    return (
        " overflow-x-hidden scrollbar-track-fuchsia-300 scrollbar-thumb-fuchsia-700 scrollbar-none  scrollbar-rounded-md  hover:scrollbar-thin "
    )
}

const Ads = () => {


    return (
        <div className= {`mt-4 rounded-md h-[80vh]  bg-slate-50 overflow-y w-auto ${myScrollBar}`}>
            <div className="p-2">
                <h5 className=" font-bold my-2">Nazama Foundation</h5>
                <img src={pic} alt="" />
                <p className=" text-sm">
                    We hope for a day, when every individual will have fresh, clean drinking water. And that is our mission.
                </p>
            </div>
        </div>
    )
}

export default Ads;