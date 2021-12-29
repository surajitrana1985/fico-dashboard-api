const express = require('express');

const router = express.Router();
const {
    getCustomerData, getDistinctColumn, filterCustomerData,
    filterChartData, postCustomerData } = require('../controllers/customer.controller');

router.post('/customer-data', getCustomerData);
router.post('/distinct', getDistinctColumn);
router.post('/filter', filterCustomerData);
router.post('/filter-chart', filterChartData);
router.post('/', postCustomerData);

module.exports = router;
