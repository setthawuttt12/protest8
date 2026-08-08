const db = require('../../db')
const bc = require('bcrypt')
const express = require('express')
const router = express.Router()
const {verifyToken,requireRole} =require('../../middleware/authMiddleware')

router.get('/show/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_member m,tb_commit c,tb_eva e where c.id_eva = ? and c.id_eva = e.id_eva and c.id_member = m.id_member`,[id_eva])
        res.json(rows)
    } catch (error) {
        console.error("error get status",error)
        res.status(500).json({message:"Erorr get status"})
    }
})

module.exports = router