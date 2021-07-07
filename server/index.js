const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3002;
require('dotenv').config()



app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


// get the reviews
app.get(`/api/reviews/:product_id/:sort`, (req, res) => {
  const {product_id,sort} = req.params
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews`, {
    headers: {
      Authorization: process.env.GITHUB_TOKEN
    },
    params: {
      product_id : product_id,
      sort: sort,
    }
  })
  .then((response) => {
    // console.log(response.data)
    res.send(response.data)
  })
  .catch((error) => {
    console.error(error)
  })
})

//update the helfulness

app.put(`/api/reviews/:review_id/report`, (req, res) => {
 const {review_id} = req.params
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/${review_id}/report`, {}, {
    headers: {
      Authorization: process.env.GITHUB_TOKEN
    }
  })
  .then((response) => {
    console.log(response, 'kllkjkljkl')
    res.send(response.data)
  })
  .catch((error) => {
    console.error(error)
  })

})


//get the review meda data
app.get(`/api/reviews/meta/:product_id/:sort/`, (req, res) => {
  const {product_id} = req.params
  console.log(product_id);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta`, {
    headers: {
      Authorization: process.env.GITHUB_TOKEN
    },
    params: {
      product_id : product_id,
      sort: 'relevant',
    }
  })
  .then((response) => {
    res.send(response.data)
  })
  .catch((error) => {
    console.error(error)
  })
})

// post a review 
app.post(`/api/reviews`, (req, res) => {
  
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/`, req.body,{
    headers: {
      Authorization: process.env.GITHUB_TOKEN
    },
    
  })
  .then((response) => {
    res.send(response.data)
  })
  .catch((error) => {
    console.error(error)
  })
})

//Report the review

app.put(`/api/reviews/:review_id/helpful`, (req, res) => {
  const {review_id} = req.params
   axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/${review_id}/helpful`, {}, {
     headers: {
       Authorization: process.env.GITHUB_TOKEN
     }
   })
   .then((response) => {
     console.log(response, 'hiuuu')
     res.send(response.data)
   })
   .catch((error) => {
     console.error(error)
   })
 
 })






app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
