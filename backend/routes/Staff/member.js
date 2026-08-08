const db = require('../../db')
const bc = require('bcrypt')
const express = require('express')
const router = express.Router()
const {verifyToken,requireRole} =require('../../middleware/authMiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const {first_name,last_name,email,username,password,role} = req.body
        const hash = await bc.hash(password,10)
        const [rows] = await db.query(`insert into tb_member(first_name,last_name,email,username,password,role) values(?,?,?,?,?,?)`,[first_name,last_name,email,username,hash,role])

        res.json({message:"member add Successful"})

    } catch (error) {
        console.error("Erorr add",error)
        res.status(500).json({message:"Error add"})
    }
})

router.put('/update/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_member} = req.params
        const {first_name,last_name,email,username,password,role} = req.body
        if(password && password.trim()){
            const hash = await bc.hash(password,10)
            const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=?,role=? where id_member = ?`,[first_name,last_name,email,username,hash,role,id_member])
            res.json(rows,{message:"member update Successful"})
        }else{
            const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,role=? where id_member = ?`,[first_name,last_name,email,username,role,id_member])
            res.json(rows,{message:"member update Successful"})
        }
        

        

    } catch (error) {
        console.error("Erorr update",error)
        res.status(500).json({message:"Error update"})
    }
})

router.delete('/delete/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_member} = req.params

        const [rows] = await db.query(`delete from tb_member where id_member = ?`,[id_member])
        res.json(rows,{message:"member delete Successful"})        

    } catch (error) {
        console.error("Erorr delete",error)
        res.status(500).json({message:"Error delete"})
    }
})

router.get('/showE',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const [rows] = await db.query(`select * from tb_member where role='ผู้รับการประเมินผล' order by id_member desc`)
        res.json(rows,{message:"member showE Successful"})        

    } catch (error) {
        console.error("Erorr ShowE",error)
        res.status(500).json({message:"Error showE"})
    }
})

router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const [rows] = await db.query(`select * from tb_member where role='กรรมการประเมิน' order by id_member desc`)
        res.json(rows,{message:"member showE Successful"})        

    } catch (error) {
        console.error("Erorr ShowE",error)
        res.status(500).json({message:"Error showE"})
    }
})

module.exports = router