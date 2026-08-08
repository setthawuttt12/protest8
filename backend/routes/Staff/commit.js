const db = require('../../db')
const bc = require('bcrypt')
const express = require('express')
const router = express.Router()
const {verifyToken,requireRole} =require('../../middleware/authMiddleware')

router.post('/save/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        await db.query(`delete from tb_commit where tb_commit.id_eva = ?`,[id_eva])
        const m = req.body
        const v = m.map(p=>[id_eva,p.id_member,'n',p.role])
        const [rows] = await db.query(`insert into tb_commit(id_eva,id_member,status_commit,level_commit) values ?`,[v])

        res.json({message:"commit add Successful"})

    } catch (error) {
        console.error("Erorr add",error)
        res.status(500).json({message:"Error add"})
    }
})

router.delete('/delete/:id_commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_commit} = req.params

        const [rows] = await db.query(`delete from tb_commit where id_commit = ?`,[id_commit])
        res.json(rows,{message:"commit delete Successful"})        

    } catch (error) {
        console.error("Erorr delete",error)
        res.status(500).json({message:"Error delete"})
    }
})

router.get('/header/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_system s,tb_eva e,tb_member m where e.id_eva = ? and s.id_sys = e.id_sys and m.id_member = e.id_member`,[id_eva])
        res.json(rows[0],{message:"system show Successful"})        

    } catch (error) {
        console.error("Erorr ShowE",error)
        res.status(500).json({message:"Error show"})
    }
})



router.get('/member/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        const [pick] = await db.query(`select id_member,concat(first_name,'',last_name)as fullname_commit from tb_member where role='กรรมการประเมิน' order by id_member desc`)
        const [picked] = await db.query(`select id_commit,m.id_member,first_name,last_name,level_commit as role from tb_member m,tb_eva e,tb_commit c where c.id_eva = ? and c.id_eva = e.id_eva and c.id_member = m.id_member`,[id_eva])
        res.json({pick,picked})        

    } catch (error) {
        console.error("Erorr member commit",error)
        res.status(500).json({message:"Error member commit"})
    }
})

module.exports = router