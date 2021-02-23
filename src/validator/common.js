const Ajv = require('ajv').default;
const ajv = new Ajv({
    allErrors: true,
    jsonPointers: true
});
require('ajv-errors')(ajv);

exports.validate = (schema, data = {}, ctx) => {
    const valid = ajv.validate(schema, data);
    if (!valid) {
        return ajv.errors;
    } else {
        return false;
    }
}

exports.addKey = (keyword, callback) => {
    ajv.addKeyword(keyword, {
        modifying: false,
        schema: false, // keyword value is not used, can be true
        validate: function validateFn(data, dataPath, parentData) {
            const message = callback(parentData);
            validateFn.errors = [{
                keyword: dataPath.slice(1),
                message,
                params: {
                    keyword: dataPath.slice(1)
                },
            }, ];
            return !message;
        },
        errors: true,
    });
};