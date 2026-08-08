const db = require('../../db')
const bc = require('bcrypt')
const express = require('express')
const router = express.Router()
const {verifyToken,requireRole} =require('../../middleware/authMiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const {name_topic} = req.body
        const [rows] = await db.query(`insert into tb_topic(name_topic) values(?)`,[name_topic])

        res.json({message:"topic add Successful"})

    } catch (error) {
        console.error("Erorr add",error)
        res.status(500).json({message:"Error add"})
    }
})

router.put('/update/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_topic} = req.params
        const {first_name,last_name,email,username,password,role} = req.body
        const [rows] = await db.query(`update tb_topic set name_topic=? where id_topic = ?`,[name_topic,id_topic])
        res.json(rows,{message:"topic update Successful"})
    } catch (error) {
        console.error("Erorr update",error)
        res.status(500).json({message:"Error update"})
    }
})

router.delete('/delete/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_topic} = req.params

        const [rows] = await db.query(`delete from tb_topic where id_topic = ?`,[id_topic])
        res.json(rows,{message:"member delete Successful"})        

    } catch (error) {
        console.error("Erorr delete",error)
        res.status(500).json({message:"Error delete"})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const [rows] = await db.query(`select * from tb_topic order by id_topic desc`)
        res.json(rows,{message:"member showE Successful"})        

    } catch (error) {
        console.error("Erorr ShowE",error)
        res.status(500).json({message:"Error showE"})
    }
})

// router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
//     try {

//         const [rows] = await db.query(`select * from tb_member where role='กรรมการประเมิน' order by id_member desc`)
//         res.json(rows,{message:"member showE Successful"})        

//     } catch (error) {
//         console.error("Erorr ShowE",error)
//         res.status(500).json({message:"Error showE"})
//     }
// })

module.exports = router