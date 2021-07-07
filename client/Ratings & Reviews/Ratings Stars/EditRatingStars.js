import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = (props) => {
    const {setRatingInput} = props
    const [toRating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const rateDescription = ["Poor", "Fair", "Average", "Good", "Great"];
    return (
        <>
        <div className="flex gap-1  ">
        {[...Array(5)].map((star, i) => {
            const rateValue = i +1;
            return (
            <>
            <label >
                <input  
                type="radio" 
                name="star_rating" 
                className="flex hidden " value={rateValue} 
                onClick= {() => setRating(rateValue)} 
                onChange={(event)=> { setRatingInput(event.target.value)}}
                />
                 <FaStar  
                 className="flex"
                 color={rateValue <= (hover||toRating) ? "#ffc107" : "#e4e5e9" }
                 onMouseEnter={()=> setHover(rateValue)}
                 onMouseLeave={()=> setHover(null)}
                 />
            </label>
            </>
            )
        })}
        <span className="flex px-2  font-serif text-sm">{rateDescription[toRating-1]}</span>
        </div>
        </>
    )

}

export default StarRating;