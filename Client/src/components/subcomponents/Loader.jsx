const Loader = (classProps) => {
    return (
        <div className=" flex justify-center items-center py-3">
            <div className={` animate-spin rounded-full h-10 w-10  ${classProps} border-b-4 border-purple-500`}/>
        </div>
    )
}

export default Loader;