import React, {useState, useEffect} from 'react'
import moment from 'moment';
import StarRatings from  'react-star-ratings';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import axios from 'axios';


const  Reviews = (props) => {
   const {product,setReportedReview} = props
   const [show, setShow] = useState({status: false, id: ''})
   const [helpRate, setHelpRate] = useState('')
   const [reviewId, setReviewId] = useState('')
   const [imgclick, setimageclick] = useState(null)
   const [reportbutton, setReportButton] = useState(false)
   
   // for the show more body text
   const [showMoreText, setShowMoreText] = useState(false)
   //to update the helpfulness
    const updateHeplful = () => {
        if (reviewId) {
    axios.put(`/api/reviews/${reviewId}/helpful`)
    .then((result) => {console.log('yes') })
    .catch((err) => {console.log(err);})
    }
    }
    useEffect(() => { updateHeplful() }) 
     
    // to report the review
    const ReportHandler = (id) => {
     axios.put(`/api/reviews/${id}/report`).then((result) => {
       console.log(result);
     })
    }
    if (product) {
    return (

              <> 
                <div className=" pt-6 border-b-2 " key ={product.product_id}>
                <section className="flex justify-between">
                { <StarRatings
                 className="flex test-xs"
                 isHalf={true}
                 rating= {product.rating}
                 edit={false}
                 starRatedColor="#ffc107"
                 starDimension="20px"
                 starSpacing="2px"
                 />   }
                 <span className="text-right text-gray-500	text-sm"> {product.reviewer_name}, {moment(product.date).format("MMM Do, YYYY")}</span>
                </section>

                <section className="py-4 ">
                <div>
                { product.summary ? <p className="font-semibold text-gray-600 pb-4 text-lg">{product.summary}</p>: ''}
                {/* {not finished for the button show more} */} 
                {(product.body && product.body.length <250) || showMoreText ? <p>{product.body}</p>  : <div className=" gap-3"><p>{product.body.slice(0,250)}</p> <span className="text-gray-400 text-xs underline" onClick={()=>setShowMoreText(true)}>Show more</span></div>}
                {product.photos.length ? <div className="flex pt-4"> {product.photos.map((photo, index) => {
                    return (<><div className="flex  ">
                    <span key ={index} onClick={() => {setimageclick(photo.url)}} className="px-2 cursor-pointer transition duration-500 ease-in-out popup transform hover:-translate-y-1 hover:scale-110 ..."> <img src={photo.url} className="rounded  pl-2  img_popup" style={{width:"89px", height:"80px"}}/></span>
                    </div> 
                    
                    {/* {} */}
                 { imgclick  ?  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                 <div class="flex items-end justify-center min-h-screen pt-1 px-4 pb-20 text-center sm:block sm:p-0 ">
                 <div class="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                 <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                 <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ">
                 <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                 <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-1 mr-2 text-white text-sm z-50" onClick={()=> setimageclick(null)}>
                 <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                 <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
                </div>
                 <div class="sm:flex sm:items-start">
                <img src={imgclick} style={{width: '100%', height:"30rem"}} />
                </div>
                </div>
                </div>
                </div>
                </div> : '' }
                </>)
                })  } </div>
                
                : ''}
                {product.recommend?   <div className="flex gap-2 pt-6"> <div className="py-1"><FaCheck /></div><p >I recommend this project</p> </div>: ""}
                { true ? <div className="pt-6">
                <div className="bg-gray-200 ">
                <p className="font-semibold py-2 px-3 text-base text-gray-600">Response from seller:</p>
                <p className="pb-4 px-3 text-base"> reponse du ta7foun </p>
                </div>
                </div> : ""}
                <div className="flex text-xs pt-4 gap-1 text-gray-500">
                 <span onClick={()=>{setShow({status:true, id: product.review_id})}}>Helpful?</span>
                 <span className="underline">Yes{'('+ product.helpfulness + ')'} </span>
                 <span className="">|</span>  <span className="underline" onClick ={() => { ReportHandler(product.review_id), setReportedReview(product.review_id)}}>Report</span>
                </div>
                {show.status && show.id ===product.review_id? 
                <div className="flex flex-grow-0 text-xs gap-1 pt-2"> 
                <ImCross onClick={() =>{setShow({status: false}); if (helpRate) { setReviewId(product.review_id); product.helpfulness= product.helpfulness+1};  } }/>
                <div className="">
                <label>Yes</label>
                <input type="radio" className="form-radio h-2 w-2 text-orange-400" name="rate" value="1" onClick={() => setHelpRate(true)} />
                </div>
                <div className="">
                <label>No</label>
                <input type="radio"  className="form-radio h-2 w-2 text-orange-400"  name="rate" value="0" onClick={() => setHelpRate(false)} />
                </div>
                </div>: ""}
                </div>
                </section>
                
                </div>
                </>
                
            )  } else { return (<p> No reviews for this product</p>) }
}

export default Reviews;

