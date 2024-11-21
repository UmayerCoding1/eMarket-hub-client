import React from 'react';
import { BiSolidError  as ErrorIcon} from "react-icons/bi";
const Error = ({children}) => {
    return (
      <div className='ml-20 w-56 h-10 bg-red-400 rounded-lg border-l-4 border-red-500 flex items-center  pl-3 font-normal text-xs text-white '>
         <ErrorIcon className='mr-2'/>
        {children}
      </div>

    )}
export default Error;