"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body);
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
function createRegisterValidation(data) {
    const { name, state } = data;
    if (name === 'a') {
        throw new Error("musb be unique");
    }
}
module.exports = {
    validate,
    createRegisterValidation
};
