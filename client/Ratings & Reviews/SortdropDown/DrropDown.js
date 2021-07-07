import React, {useState} from 'react'

const DropDown = (props) => {
    const {setCountReview} = props
    const [dropDown, setDropDown] = useState(false)
    const {value, handler,setAllBareValue} = props
    return (
        
        <div className="flex">
        <h1 className="font-semibold text-gray-600 text-lg underline">{value}</h1>
        <div className="flex">
        <div  className="relative " onClick={() => setDropDown(!dropDown)}>
        <button onClick={()=> setDropDown(!dropDown)} className="relative z-10 block rounded-md bg-white p-2 focus:outline-none">
        <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        </button>
        {dropDown ?  
        <>
        <div  className="fixed inset-0  z-10 "></div>
         <div x-show="dropdownOpen" onClick= {() => {setDropDown(false)}}className="absolute right-0 mt-2 py-2 w-48 bg-white  z-20 	">
         <a href="#" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white" onClick={() => {handler('relevance'); setAllBareValue({sort:'relevant',startSort: props.allBareValue.startSort}); setCountReview(2)}}>
         relevance
         </a>
         <a href="#" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white" onClick={() => {handler('helful'); setAllBareValue({sort:'helpful', startSort: props.allBareValue.startSort}); setCountReview(2)}} >
             helful
         </a>
         <a href="#" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white" onClick={() => {handler('newest'); setAllBareValue({sort:'newest', startSort: props.allBareValue.startSort}); setCountReview(2)}}>
             newest
        </a>
      
        </div>
        </>
  
  : ''}
 </div>
 </div>
 </div>
    )
}

export default DropDown;