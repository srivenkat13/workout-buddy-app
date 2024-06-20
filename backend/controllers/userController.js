const User = require('../models/userModel')

const loginUser =  async (req,res) =>{
    res.json({msg:'Login user'})
}
const signupUser =  async (req,res) =>{
    res.json({msg:'Signup user'})
}

module.exports = {loginUser, signupUser}