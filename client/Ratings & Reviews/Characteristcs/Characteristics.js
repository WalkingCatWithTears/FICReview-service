import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Characteristics = (props) => {
    const {productId, setReviewsMeta, reviewsMeta} = props;
    const [value, onChange]=useState(1);
    // const [reviewsMeta, setReviewsMeta] = useState(null)
    // to get the metadata for a given product.
    const getMetaData = () => {
        axios.get(`/api/reviews/meta/${productId}/${'relevant'}`).then((result) => {
            setReviewsMeta(Object.entries(result.data.characteristics));
        }).catch((err) => {console.log(err);})
    }

    useEffect(()=> {
        getMetaData()
    },[])
    if ( reviewsMeta ) {
    return (
        <div className="pt-4">
        {reviewsMeta && [...Array(reviewsMeta.length)].map((range, index) => {
            
         return (
             <>
             <p className="text-sm ">{reviewsMeta[index][0]}</p>       
             <div className="pb-4" >
             <input className="w-full h-1 border-none outline-none bg-gray-300 appearance-none " type="range" min="1" max="5" step="0.1" 
             value={reviewsMeta[index][1].value} 
             />

             {reviewsMeta[index][0] === 'Comfort' || reviewsMeta[index][0] === 'Quality'  ? 
             <div className="flex justify-between text-xs text-gray-500	"> 
             { reviewsMeta[index][0] === 'Comfort'   ? <span>Uncomfortable</span> : <span>Poor</span>}
             <span>Perfect</span>
             </div> : 
             <div className="flex justify-between text-xs text-gray-500	"> 
             {reviewsMeta[index][0]   === 'Length' ?<span>Runs Short</span> : <span>Runs tight</span>  }
             <span>Perfect</span>
             { reviewsMeta[index][0] === 'Size' || reviewsMeta[index][0] === 'Width'    ? <span>Too wide</span>:  <span>Runs long</span> }
             </div>
            }         
             </div>
             </>
         )

         })}
        </div>
    )} else { return <p>Loading ...</p>}
}

export default Characteristics;