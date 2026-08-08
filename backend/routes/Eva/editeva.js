const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')
const bc = require('bcrypt')

router.get(`/`,verifyToken,requireRole('ผู้รับการประเมินผล'),async(req,res)=>{
    try {
        const id_member = req.user.id_member
        // const {first_name,last_name,email,username,role,password} = req.body
        const [rows] = await db.query(`select first_name,last_name,email,username,role from tb_member where id_member=?`,[id_member])
        res.json(rows[0])
    } catch (error) {
        console.error('Errror get user',error)
        res.status(500).json({message:'Error GET user'})
    }
})

router.put('/',verifyToken,requireRole('ผู้รับการประเมินผล'),async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const {first_name,last_name,email,username,role,password} = req.body
        if(password && password.trim()){
            const hash = await bc.hash(password,10)
            await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,role=?,password=? where id_member='${id_member}'`,[first_name,last_name,email,username,role,hash])
        }else{
            await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,role=? where id_member='${id_member}'`,[first_name,last_name,email,username,role])
        }
    } catch (error) {
        console.error('Errror put user',error)
        res.status(500).json({message:'Error put user'})
    }
})

module.exports = router