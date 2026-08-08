const db = require('../../db')
const bc = require('bcrypt')
const express = require('express')
const router = express.Router()
const {verifyToken,requireRole} =require('../../middleware/authMiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`insert into tb_indicate(id_topic,name_indicate,detail_indicate,point_indicate,check_indicate) values(?,?,?,?,?)`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])

        res.json({message:"indicate add Successful"})

    } catch (error) {
        console.error("Erorr add",error)
        res.status(500).json({message:"Error add"})
    }
})

router.put('/update/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_indicate} = req.params
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`update tb_indicate set id_topic=?,name_indicate=?,detail_indicate=?,point_indicate=?,check_indicate=? where id_indicate = ?`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate,id_indicate])
        res.json(rows,{message:"indicate update Successful"})
    } catch (error) {
        console.error("Erorr update",error)
        res.status(500).json({message:"Error update"})
    }
})

router.delete('/delete/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_indicate} = req.params

        const [rows] = await db.query(`delete from tb_indicate where id_indicate = ?`,[id_indicate])
        res.json(rows,{message:"indicate delete Successful"})        

    } catch (error) {
        console.error("Erorr delete",error)
        res.status(500).json({message:"Error delete"})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const [rows] = await db.query(`select * from tb_topic,tb_indicate where tb_topic.id_topic = tb_indicate.id_topic order by id_indicate desc`)
        res.json(rows,{message:"indicate showE Successful"})        

    } catch (error) {
        console.error("Erorr ShowE",error)
        res.status(500).json({message:"Error show"})
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