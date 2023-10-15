import { Ads,Followed,Pages,Posts,PostDetail} from "./";

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

const Home = ({left,main}) => {
    return (
        <div className="">
            <div className=" grid gap-2 lg:grid-cols-[25%,auto,20%] md:grid-cols-[25%,auto,20%]  item-center px-4 h-full">
                <div className=" hidden md:contents">
                    {left}
                </div>
                <div className=" relative  px-2  overflow-y">
                    {main}
                </div>
                <div className=" hidden lg:contents">
                    <Ads/>
                </div>
            </div>
        </div>
    )
}

export default Home;