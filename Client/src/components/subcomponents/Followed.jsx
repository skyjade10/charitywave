

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

const Followed = () => {
    return (
        <div className="h-[80vh] grid">
            <button className=" shadow-lg bg-fuchsia-900 pt-2 pb-2 ps-4 pe-4 w-auto text-white rounded-full cursor-pointer self-center">Create</button>
            <div className=" flex flex-rol gap-2 m-2">
            <button className=" shadow-lg bg-fuchsia-900 pt-2 pb-2 ps-4 pe-4 w-auto text-white rounded-full cursor-pointer self-center">Donate Post</button>
            <button className=" shadow-lg bg-fuchsia-900 pt-2 pb-2 ps-4 pe-4 w-auto text-white rounded-full cursor-pointer self-center">Post</button>

            </div>
            <p className="mt-4 mb-1">Groups</p>
            <div className={`overflow-y-scroll h-[100%] ${myScrollBar}`}>
                <p>{}</p>
                <hr />
                <GroupFunc/>
                <GroupFunc/>
                <GroupFunc/>
                <GroupFunc/>
                <GroupFunc/>
                <GroupFunc/>
                <GroupFunc/>
            </div>

            <p className="mt-4 mb-1">Suggestion</p>
            <div className={`overflow-y-scroll h-[100%] ${myScrollBar}`}>
                <hr />
                <GroupFunc/>
                <GroupFunc/>
                <GroupFunc/>
                <GroupFunc/>
                <GroupFunc/>
                <GroupFunc/>
            
            </div>
        </div>
    )
}


export default Followed;