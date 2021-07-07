import React, { useState, useEffect } from 'react';
import StarRatings from  'react-star-ratings';

const ViewRatingStars = (props) => {
    const [rating, setRating] = useState(null);

    useEffect(() => {
        if (props.productInfo) {
            let rate =0;
            let count = 0;
            props.productInfo.map((rated) => {
                rate+= rated.rating;
                count+=1;
            })
            setRating(rate/count)
        }
    })

    return (
        <>
        <div className="flex gap-1  ">
        <h2 className="flex text-5xl font-sans">{rating? rating.toFixed(1): ''}</h2>
                 {rating && <StarRatings
                 className="flex test-xs"
                 isHalf={true}
                 rating= {rating}
                 edit={false}
                 starRatedColor="#ffc107"
                 starDimension="20px"
                 starSpacing="2px"
                 />   }
        </div>
        </>
    )

}

export default ViewRatingStars;


const RatingAverage = (reviews) => {
    let rate = 0;
    reviews.map((rating) => {
        rate+= rating.rating
    })

    return rate
}