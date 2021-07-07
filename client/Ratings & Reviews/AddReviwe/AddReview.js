import React, {useState, useEffect} from 'react'
import StarRating from '../Ratings Stars/EditRatingStars'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import ChooseCharacteristics from './ChooseCharacteristics.js';
import UplodePhoto from './UplodePhoto.js';
import axios from 'axios';
import { bool } from 'prop-types';

const AddReview = (props) => {
    const {addButton, setaddButton, reviewsMeta, productId} = props
    const [popNumber, setpopNumber] = useState(1)
    const [bodyTextLenght, setBodyText] = useState(50)
    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [bodyInput, setBodyInput] = useState('')
    const [summuryInput, setSummuryInput] = useState('')
    const [recommendInput, setRecommendInput] = useState('')
    const [ratingInput, setRatingInput] = useState(0)
    const [characteriticsInput, setCharacteriticsInput] = useState({Size:null, Width:null, Comfort:null, Quality:null, Length:null, Fit:null })
    // to get the id of characteristics
    const [characteristicsId, setCharactristicsId] = useState([])
    //For the post request 
    const [urlInput, setUrlInput] = useState([])

  //   // for the post request
    const handlePostRequest = () => {
      let boolean = false;
      if (recommendInput === "true") {
        boolean = true;
      }
      let characteristicsStore = {}
      reviewsMeta.map((element) =>{
        if (characteriticsInput[element[0]]) {
          characteristicsStore[`${element[1].id}`] = +characteriticsInput[element[0]]
        }
      })
      let postObject = {
        product_id: productId,
        rating: +ratingInput,
        summary: summuryInput,
        body: bodyInput,
        recommend: boolean,
        name: nameInput,
        email: emailInput,
        photos: urlInput,
        characteristics: characteristicsStore,
    } 
     axios.post('/api/reviews', postObject).then((result) => {
       console.log(result);
     })
  }
        
    ///// pages in the addreview form 
    const toTheNextPage = () => {
      if (popNumber === 1) {
        return (
          <>
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
               Write Your Review
            </h3>
            {/* {I have to pass a props for the pruct name} */}
            <h5>About the [Product Name Here]</h5>
            <div class="mt-4">
              {/* {for the rating star} */}
              <h6 className="pb-3"> Overall rating* </h6>
              <StarRating  setRatingInput={setRatingInput}/>
            </div>
            <div class="mt-4">
              {/* {to recommend the product} */}
            <h6 className="pb-3">Do you recommend the product ?*</h6>
            <div className="flex gap-2">
             <div className="flex">
              <input type='radio' name="recommend" value={true}  onChange={(event)=> { setRecommendInput(event.target.value)}}/>
              <label ><AiOutlineLike /></label>
             </div>
             <div className="flex">
              <input type='radio' name="recommend" value={false} onChange={(event)=> { setRecommendInput(event.target.value)}}/>
              <label ><AiOutlineDislike /></label>
             </div>
            </div>
            </div>
          </>
        )
      } else if ( popNumber === 2) {
        return (
        <>
        <div class="mt-4 justify-items-center">
        {/* {to recommend the product} */}
        <h6 className="pb-3">Characteristics* </h6>
        <ChooseCharacteristics setCharacteriticsInput={setCharacteriticsInput}  characteriticsInput={characteriticsInput}/>
 
        </div>
        </>
        )
      } else if (popNumber === 3) {

        return (
        <div class="mt-4 justify-items-center">
        {/* {to Review summary and body} */}
        <div>
        <form>
        <h6 className="pb-4 pt-4"> Review summary</h6>
        <textarea required="" name="message"   maxlength="60" className=" min-h-[100px] max-h-[300px] h-15  w-96 appearance-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4" placeholder="Example: Best purchase ever!" spellcheck="false" onChange={(event) =>{setSummuryInput(event.target.value)}}></textarea>
        <h6 className="pb-4 pt-4"> Review body*</h6>
        <textarea required="" name="message" minlength="50"  maxlength="1000" className=" min-h-[100px] max-h-[300px] h-28 w-96 appearance-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4" placeholder="Why did you like the product or not?" spellcheck="false" onChange={(event) =>{if(bodyTextLenght >0){setBodyText(bodyTextLenght - 1)}; setBodyInput(event.target.value)}}></textarea>
        {bodyTextLenght !==0 ?<p class="text-xs text-gray-400 text-left my-3">Minimum required characters left: {bodyTextLenght}</p> : <p class="text-xs text-gray-400 text-left my-3">Minimum reached</p>}
        </form>
        </div>
        <div>

        </div>
        </div>)
      } else if (popNumber === 4) {
        // to upload photos
       return <UplodePhoto setUrlInput={setUrlInput} urlInput={urlInput}/>
      } else if (popNumber === 5) {
        // to enter name and email
        return(
        <div>
        <form>
        <h6 className="pb-4 pt-4"> What is your nickname*</h6>
        <input type='text' onChange={(event) =>{setNameInput(event.target.value)}} maxlength="60" placeholder="Example: jackson11!" class="w-full mt-2 mb-2 px-6 py-3 border rounded-lg text-lg text-gray-700 focus:outline-none" />
        <p class="text-xs text-gray-400 text-left ">For privacy reasons, do not use your full name or email address</p>
        <h6 className="pb-4 pt-4"> Your email*</h6>
        <input type='email'  onChange={(event) =>{setEmailInput(event.target.value)}} maxlength="60" placeholder="Example: jackson11@email.com" class="w-full mt-2 mb-2 px-6 py-3 border rounded-lg text-lg text-gray-700 focus:outline-none" />
        <p class="text-xs text-gray-400 text-left ">For privacy reasons, do not use your full name or email address</p>
        </form>
        </div>)
      } 
    }


    //////////////////////////////// render part ///////////////////////////////////////////////////////////
    
    if (addButton) {
    return (
    <div>
   <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            
            {toTheNextPage()}
          </div>
        </div>
      </div>
      {/* { for the buttons } */}
      <p class="text-xs text-red-500 text-right mr-2 my-3">Required fields are marked with anasterisk <abbr title="Required field">*</abbr></p>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        
       {popNumber === 5 ?<button type="button" onClick={()=> {setpopNumber(1); if(popNumber!==-1) {setaddButton(false)}; handlePostRequest()}} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
          Submit
        </button> :<button type="button" onClick={()=> {setpopNumber(popNumber+1); }} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
          Next
        </button> }
        <button type="button"  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={()=> {setaddButton(false); setpopNumber(1); setUrlInput([])}}>
          Cancel
        </button>
      </div>
    </div>
  </div>
</div> 
        </div>
    )} else { 
        return (<div></div>)
    }
}

export default  AddReview;