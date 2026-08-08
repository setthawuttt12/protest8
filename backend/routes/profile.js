const express = require('express')
const db = require('../db')
const router = express.Router()
const {verifyToken} = require('../middleware/authmiddleware')

router.get(`/`,verifyToken,async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const [rows] = await db.query(`select * from tb_member where id_member=?`,[id_member])
    } catch (error) {
        
    }
})
module.exports = router