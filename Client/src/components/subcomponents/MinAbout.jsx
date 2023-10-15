
import React from 'react'
import { Link } from 'react-router-dom'

const MinAbout = () => {
  return (
    <div className=' w-full bg-gray-950 text-white bottom-5 items-center flex flex-col justify-center'>
        <ul className=' flex flex-col md:flex-row lg:flex-row gap-2 my-5 justify-center items-center'>
            <Link to="/about"><li className=' cursor-pointer hover:text-gray-400'><p>About</p></li></Link>
            <Link to="/about"><li className=' cursor-pointer hover:text-gray-400'><p>Contact</p></li></Link>
            <li className=' flex flex-row gap-1 text-sm text-gray-500'><p>&copy;</p> Copyright 2023</li>
        </ul>
    </div>
  )
}

export default MinAbout