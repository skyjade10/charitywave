import { Ads,Followed,Pages,Posts,PostDetail} from "./";

const Home = () => {
    return (
        <div className=" mx-4 mt-4 grid grid-flow-row md:grid-flow-col md:grid-cols-[30%,auto] gap-2,
         lg:grid-cols-[25%,auto,20%] gap-3 absolute">
            <div className=" hidden md:contents">
                <Followed/>
            </div>
            <div className=" relative">
                <Posts/>
            </div>
            <div className=" hidden lg:contents">
                <Ads/>
            </div>
        </div>
    )
}

export default Home;