function getMongooseOperator(operator, type, value = null) {
    let mongooseOperator = '';
    if (type === 'numeric') {
        switch (operator) {
            case '=':
                mongooseOperator = '$eq';
                break;
            case '!=':
                mongooseOperator = '$ne';
                break;
            case '<':
                mongooseOperator = '$lt';
                break;
            case '>':
                mongooseOperator = '$gt';
                break;
            case '<=':
                mongooseOperator = '$lte'
                break;
            case '>=':
                mongooseOperator = '$gte'
                break;
            default:
                mongooseOperator = '';
        }
    } else {
        switch (operator) {
            case '=':
                mongooseOperator = '$in';
                break;
            case '!=':
                mongooseOperator = '$nin';
                break;
            case 'contains':
                if (Array.isArray(value)) {
                    mongooseOperator = '$in';
                } else {
                    mongooseOperator = '$regex';
                }
                break;
            case '!contains':
                if (Array.isArray(value)) {
                    mongooseOperator = '$nin';
                } else {
                    mongooseOperator = '$regex';
                }
                break;
            default:
                mongooseOperator = '';
        }
    }
    return mongooseOperator;
}

module.exports = getMongooseOperator;
