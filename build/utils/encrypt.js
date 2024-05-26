"use strict";
const bcrypt = require('bcryptjs');
const encript = async (pass) => {
    const passHash = await bcrypt.hashSync(pass, 8);
    console.log(passHash);
    return passHash;
};
const verified = async (pass, passHash) => {
    const verify = await bcrypt.compareSync(pass, passHash);
    return verify;
};
module.exports = { encript, verified };
