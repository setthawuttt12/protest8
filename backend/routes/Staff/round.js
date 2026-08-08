const db = require('../../db')
const bc = require('bcrypt')
const express = require('express')
const router = express.Router()
const {verifyToken,requireRole} =require('../../middleware/authMiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`insert into tb_system(day_open,day_out,round_sys,year_sys,status_sys) values(?,?,?,?,?,?)`,[day_open,day_out,round_sys,year_sys,status_sys])

        res.json({message:"system add Successful"})

    } catch (error) {
        console.error("Erorr add",error)
        res.status(500).json({message:"Error add"})
    }
})

router.put('/update/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_sys} = req.params
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`update tb_system set day_open=?,day_out=?,round_sys=?,year_sys=?,status_sys=? where id_sys = ?`,[day_open,day_out,round_sys,year_sys,status_sys,id_sys])
        res.json(rows,{message:"system update Successful"})
    } catch (error) {
        console.error("Erorr update",error)
        res.status(500).json({message:"Error update"})
    }
})

router.delete('/delete/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_sys} = req.params

        const [rows] = await db.query(`delete from tb_system where id_sys = ?`,[id_sys])
        res.json(rows,{message:"system delete Successful"})        

    } catch (error) {
        console.error("Erorr delete",error)
        res.status(500).json({message:"Error delete"})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const [rows] = await db.query(`select * from tb_system where status_sys = 'y' order by id_sys desc`)
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