import React, {useState, useCallback, useEffect} from 'react';
import StarRating from './Ratings Stars/EditRatingStars';
import ViewRatingStars from './Ratings Stars/ViewRatingStars.js';
import axios from 'axios';
import ProgressBra from './Ratings Stars/ProgressBare.js';
import Reviews from './Reviews/reviews.js';
import DropDown from './SortdropDown/DrropDown.js';
import Characteristics from './Characteristcs/Characteristics';
import AddReview from './AddReviwe/AddReview';
import { Scrollbars } from 'react-custom-scrollbars-2';




function RatingsAndViews() {
    const [pourcentage, setPourcentage] = useState(0)
    const [countForPourcentage, setCountForPourcentage] = useState(0)
    const [productId, setProductId] = useState(11001)
    const [productInfo, setProductIOnf] = useState('')
    const [arrayOfproducts, setArrayOfproducts] = useState(null)
    const [bareValue, setBareValue] = useState({value:'', status: false});
    const [allBareValue, setAllBareValue] = useState({sort:'relevant', startSort: false});
    const [activeBareFilter, setActiveBareFilter] = useState(false)
    const [dropDownValue, setDropDownValue] = useState('relevance')
    const [reviewsMeta, setReviewsMeta] = useState(null)
    const [addButton, setaddButton] = useState(false)
    const[reportedRewiew, setReportedReview] = useState(null)
    //for the moreview button
    const [countReview, setCountReview] = useState(2)


   // to get the reviews of a specefic product
    useEffect(() => {
        axios.get(`/api/reviews/${productId}/${allBareValue.sort}`).then((result)=> {
          setProductIOnf(result.data)
          setArrayOfproducts(result.data.results)
          
        })
    }, [allBareValue])
    

   
   
    //to calculate the % of recommended 
    useEffect(() => {
      if(arrayOfproducts  && !countForPourcentage ) {
        let add=0;
        setCountForPourcentage(productInfo.results.length)
        productInfo.results.map((element) => {
          if(element.recommend) {
            add+=1
          }
        })
        setPourcentage(add)
      }}, [arrayOfproducts])
    
    

  
   
    // For the view more reviews button 
    const couterViews = () => {
      setCountReview(countReview + 2)
    }

    if (productInfo ) {
       
    return (
    <> 
 
    <h1 className="flex px-48 font-mono pt-11">RATINGS & REVIEWS</h1>
    <div className="flex pl-48 py-3 justify-between gap-12 pr-36">
      <section className=""> 
        <ViewRatingStars productInfo = {productInfo.results}/> 
       <p className="flex py-5 text-sm "> {Math.floor((pourcentage*100)/countForPourcentage)}% of the reviews recommend this product</p> 
        <ProgressBra 
        productInfo = {productInfo.results} 
        bareValue= {bareValue} 
        setBareValue= {setBareValue} 
        allBareValue={allBareValue} 
        setAllBareValue={setAllBareValue}
        activeBareFilter={activeBareFilter}
        setActiveBareFilter={setActiveBareFilter}
        setCountReview = {setCountReview}
        
        /> 
        <Characteristics productId={productId} setReviewsMeta={setReviewsMeta}  reviewsMeta={reviewsMeta}/> 
      </section>
      <section className="flex-grow">
      {productInfo && arrayOfproducts ? <h1 className="font-semibold text-gray-600 text-lg flex gap-1">{productInfo.results.length} Reviews, sorted by 
      <DropDown  
      value= {dropDownValue} 
      handler = {setDropDownValue}  
      setAllBareValue={setAllBareValue} 
      allBareValue={allBareValue} 
      setCountReview={setCountReview}/>
      </h1> : ''}
        <Scrollbars autoHide autoHideDuration={200} >
        {arrayOfproducts ? arrayOfproducts.map((product, index) => {
          if(allBareValue.startSort) {
            if (product.rating === bareValue.value) {
            if (arrayOfproducts.indexOf(product) >=countReview) {return }
              return <Reviews product = {product} setReportedReview={setReportedReview}/>
            }
          } else if (!allBareValue.startSort) {
            if (arrayOfproducts.indexOf(product) >=countReview) {return }
            if (reportedRewiew) { if(product.review_id === reportedRewiew) {arrayOfproducts.splice(index,1) ; setArrayOfproducts(arrayOfproducts) }}
            return <Reviews product = {product} setReportedReview={setReportedReview}/>
          }
           
          }) : <Reviews product={null} /> 
        } 
        </Scrollbars>
      
      <div className="flex pt-6 gap-3 pb-20">
       {arrayOfproducts &&arrayOfproducts.length >2 && countReview < arrayOfproducts.length? <button onClick={()=>couterViews()} className="flex justify-center border-2 border-gray-500	w-40"> <span  className="flex pt-2 pb-2">MORE REVIEWS</span></button> : '' }
      <button className="flex  gap-4 justify-center border-2 border-gray-500	w-60" onClick={() => {setaddButton(true)}}> <div className="flex pt-2 pb-2"><span className="">ADD A  REVIEW </span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg></div></button> 
      </div>
      <AddReview addButton={addButton}  setaddButton={setaddButton}  reviewsMeta= {reviewsMeta} productId={productId} />
      </section>   
    </div>
    </>
  ); } else { return <p>Loading ...</p>}
    
}

export default RatingsAndViews;















// const pourcentageCalculator = () => {
    //   if(arrayOfproducts  && !countForPourcentage ) {
    //     let add=0;
    //     setCountForPourcentage(productInfo.results.length)
    //     productInfo.results.map((element) => {
    //       if(element.recommend) {
    //         add+=1
    //       }
    //     })
    //     setPourcentage(add)
    //   }   else {
    //     return
    //   }
    // }

    // pourcentageCalculator() 