require('dotenv').config({path:'.env'})
const cors = require('cors')
const express = require('express')
const path = require('path')
const fileupload = require('express-fileupload')
const app = express()

app.use(cors({

    origin:'http://localhost:3000',
    credentials: true

}))


app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use(fileupload())
app.use(express.urlencoded({extended:true}))


const pf = require('./routes/profile')
app.use('/api/profile',pf)



const auth = require('./routes/auth')
app.use('/api/auth',auth)

//eva

const edit = require('./routes/Eva/editeva')
app.use('/api/Eva/editeva',edit)

const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)

const score_member = require('./routes/Eva/score_member')
app.use('/api/Eva/score_member',score_member)

const score_commit = require('./routes/Eva/score_commit')
app.use('/api/Eva/score_commit',score_commit)

app.use((req,res)=> res.status(404).json({message:'Route not found'}))
app.listen(3001,()=>{

    console.log(`Server Running on Port 3001`);
    

})