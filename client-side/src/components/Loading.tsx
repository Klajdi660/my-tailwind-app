import { FunctionComponent } from 'react';
import { loader } from '../assets/img';

export const Loading: FunctionComponent = () => {
  return (
    // Loading 1
    // <img 
    //   src={loader} 
    //   alt="loader" 
    //   className="w-[100px] h-[100px] object-contain"
    // />
    
    // Loading 2 
    // <div className="wrapper">
    //   <div className="circle"></div>
    //   <div className="circle"></div>
    //   <div className="circle"></div>
    //   <div className="shadow"></div>
    //   <div className="shadow"></div>
    //   <div className="shadow"></div>
    // </div>

    // Loading 3
    <div className='animate-ping w-16 h-16 m-8 rounded-full bg-orange-5'> 
    </div>
  );
};
