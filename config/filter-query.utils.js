const getMongooseOperator = require('./mongoose.operators');

function getFilterQuery(filters) {
    let query = {};
    for (let key of Object.keys(filters)) {
        const { field, join, operator1, value1, operator2, value2, type } = filters[key];
        if (!join) {
            if (type === 'numeric') {
                const mongooseOperator = getMongooseOperator(operator1, 'numeric');
                query[field] = {
                    [mongooseOperator]: Number(value1)
                }
            } else {
                const mongooseOperator = getMongooseOperator(operator1, 'categorical', value1);
                if (Array.isArray(value1)) {
                    query[field] = {
                        [mongooseOperator]: value1
                    }
                } else {
                    if (operator1 === 'contains') {
                        query[field] = {
                            [mongooseOperator]: value1,
                            "$options": "i"
                        }
                    } else if (operator1 === '!contains') {
                        query[field] = {
                            [mongooseOperator]: `^(?!${value1})`,
                            "$options": "i"
                        }
                    }
                }
            }
        } else {
            if (type === 'numeric') {
                const mongooseOperator1 = getMongooseOperator(operator1, 'numeric');
                const mongooseOperator2 = getMongooseOperator(operator2, 'numeric');
                query[field] = {
                    [mongooseOperator1]: Number(value1),
                    [mongooseOperator2]: Number(value2)
                }
            }
        }
    }
    return query;
}

function getAggregateFilterQuery(reqParam) {
    let query = [];
    if (reqParam.hasOwnProperty('groupby')) {
        if (reqParam['groupby'] !== '') {
            query = [{
                "$match": {
                    "$and": []
                }
            }, {
                "$group": {
                    "_id": "",
                    "avgAccBalance": {
                        "$avg": "$accountBalance"
                    },
                    "avgTenure": {
                        "$avg": "$relationshipTenure"
                    }
                }
            }];
        } else {
            query = [{
                "$match": {
                    "$and": []
                }
            }];
        }
    }
    for (let key of Object.keys(reqParam)) {
        if (key !== 'groupby' && reqParam[key].selectedValues.length) {
            query[0].$match.$and.push({
                [key]: {
                    "$in": reqParam[key].selectedValues
                }
            });
        } else {
            if (reqParam['groupby'] !== '') {
                query[1].$group._id = `$${reqParam[key]}`;
            }
        }
    }
    return query;
}

module.exports = {
    getFilterQuery,
    getAggregateFilterQuery
};
