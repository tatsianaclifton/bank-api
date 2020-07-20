const express = require('express');
const axios = require('axios');

const router = express.Router();

router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

router.get('/banks', (req, res) => {
    const searchQuery = `?search=NAME:${encodeURIComponent(req.query.name)}&sort_by=NAME&sort_order=DESC&fields=ZIP,OFFDOM,CITY,COUNTY,STNAME,STALP,NAME&limit=10&offset=0&format=json&download=false`;
    const url = `https://banks.data.fdic.gov/api/institutions${searchQuery}`;
    axios.get(url)
        .then(response => {
            return res.status(200).send({
                message: 'GET banks call succeeded',
                banks: response.data.data
            });
        })
        .catch(error => {
            console.log('error', error);
            return res.status(400).send({
                message: 'Failed to get banks'
            });
        });
}); 

module.exports = router;