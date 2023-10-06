import { Ads,Followed,Pages,Posts,PostDetail} from "./";

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

const Home = ({left,main}) => {
    return (
        <div className="background-gradient grid justify-center ">
            <div className=" mx-4 mt-4 grid grid-flow-row md:grid-flow-col md:grid-cols-[30%,auto] gap-2,
            lg:grid-cols-[25%,auto,20%] gap-3 absolute w-full ">
                <div className=" hidden md:contents">
                    {left}
                </div>
                <div className=" relative border-s-2 border-e-2">
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