import React, { useEffect, useState } from 'react';

const ComeDown = ({offerEnd}) => {
    const [day,setDay] = useState(0);
    const [hrs,setHrs] = useState(0);
    const [min,setMin] = useState(0);
    const [sec,setSec] = useState(0);
    const endTime = offerEnd;
   

    const getTime = () => {
        const end = Date.parse(endTime);
        const now = Date.now();
        const def = (end - now) / 1000;
        if(def < 0){
            return;
        }

        setDay(Math.floor(def / 3600 / 24));
        setHrs(Math.floor((def / 3600)% 24));
        setMin(Math.floor((def / 3600)% 60));
        setSec(Math.floor((def) % 3600));
    }

    useEffect(() => {
        setInterval(() => {
            getTime();
        },1000)
    },[getTime])

    
    
    return (
        <div className="font-Rubik  flex items-center text-xs">
           <input className='bg-transparent  w-10 h-10 text-center outline-none' value={`${day}d`} type="text" name="" id="" readOnly/>: <br />
           <input className='bg-transparent  w-10 h-10 text-center outline-none' value={`${hrs}h`} type="text" name="" id="" readOnly/>: <br />
           <input className='bg-transparent  w-10 h-10 text-center outline-none' value={`${min}m`} type="text" name="" id="" readOnly/>: <br />
           <input className='bg-transparent  w-10 h-10 text-center outline-none' value={`${sec}s`} type="text" name="" id="" readOnly/> <br />
        </div>
    );
};

export default ComeDown;