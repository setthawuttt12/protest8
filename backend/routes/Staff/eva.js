const db = require('../../db')
const bc = require('bcrypt')
const express = require('express')
const router = express.Router()
const {verifyToken,requireRole} =require('../../middleware/authMiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const {id_member,id_sys,day_eva,status_eva} = req.body
        const [rows] = await db.query(`insert into tb_eva(id_member,id_sys,day_eva,status_eva) values(?,?,?,?)`,[id_member,id_sys,day_eva,status_eva])

        res.json({message:"eva add Successful"})

    } catch (error) {
        console.error("Erorr add",error)
        res.status(500).json({message:"Error add"})
    }
})

router.put('/update/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        const {id_member,id_sys,day_eva,status_eva} = req.body
        const [rows] = await db.query(`update tb_eva set id_member=?,id_sys=?,day_eva=?,status_eva=? where id_eva = ?`,[id_member,id_sys,day_eva,status_eva,id_eva])
        res.json(rows,{message:"eva update Successful"})
    } catch (error) {
        console.error("Erorr update",error)
        res.status(500).json({message:"Error update"})
    }
})

router.delete('/delete/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params

        const [rows] = await db.query(`delete from tb_eva where id_eva = ?`,[id_eva])
        res.json(rows,{message:"eva delete Successful"})        

    } catch (error) {
        console.error("Erorr delete",error)
        res.status(500).json({message:"Error delete"})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const [rows] = await db.query(`select * from tb_system s,tb_eva e,tb_member m where s.id_sys = e.id_sys and m.id_member = e.id_member order by id_eva desc`)
        res.json(rows,{message:"system show Successful"})        

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