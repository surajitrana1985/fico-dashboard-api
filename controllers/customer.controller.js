const Customer = require('../models/customer.model');
const { getFilterQuery, getAggregateFilterQuery } = require('../config/filter-query.utils');

const getCustomerData = async (req, res) => {
    try {
        const { page, limit, filters } = req.body;
        const query = getFilterQuery(filters);
        const customers = await Customer.find(query).limit(limit * 1).skip((page - 1) * limit);
        const totalRecords = await Customer.find(query).count();
        return res.json({
            totalRecords,
            customers
        });
    } catch (error) {
        res.status(400).send(error);
    };
};

const getDistinctColumn = async (req, res) => {
    try {
        const distinctValues = await Customer.distinct(req.body.field);
        return res.json({
            distinctValues
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

const filterCustomerData = async (req, res) => {
    try {
        const { page, limit } = req.body.paginationOptions;
        const filters = req.body.filterOptions;
        const query = getFilterQuery(filters);
        const customers = await Customer.find(query).limit(limit * 1).skip((page - 1) * limit);
        const totalRecords = await Customer.find(query).count();
        return res.json({
            totalRecords,
            customers
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

const filterChartData = async (req, res) => {
    try {
        const reqParam = req.body;
        const query = getAggregateFilterQuery(reqParam);
        const customers = await Customer.aggregate(query);
        return res.json({
            customers
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

const postCustomerData = async (req, res) => {
    const customer = new Customer({
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        age: req.body.age,
        qualification: req.body.qualification,
        income: req.body.income,
        workExp: req.body.workExp,
        numHouseholds: req.body.numHouseholds,
        region: req.body.region,
        state: req.body.state,
        address: req.body.address,
        accountBalance: req.body.accountBalance,
        relationshipTenure: req.body.relationshipTenure,
        numAccounts: req.body.numAccounts,
        accountType: req.body.accountType,
        employmentStatus: req.body.employmentStatus
    });
    try {
        const data = await customer.save();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    getCustomerData,
    getDistinctColumn,
    filterCustomerData,
    filterChartData,
    postCustomerData
};
