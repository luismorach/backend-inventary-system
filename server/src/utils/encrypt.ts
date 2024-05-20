const {hash,compare} =require('bcrypt');

const encript=async(pass:string)=>{
    const passHash= await hash(pass,8)
    return passHash
}

const verified= async(pass:string,passHash:any)=>{
    const verify=await compare(pass,passHash)
    return verify
}
module.exports={encript,verified}