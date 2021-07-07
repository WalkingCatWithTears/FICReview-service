import React from "react";
import ReactDOM from "react-dom";
import RatingsAndViews from "./Ratings & Reviews/RatingsAndViews.js";

const App = () => {
    return (
        <>
        <RatingsAndViews />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById("ratings-reviews"));
