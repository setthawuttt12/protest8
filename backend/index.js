require('dotenv').config({path:'.env'})
const cors = require('cors')
const express = require('express')
const path = require('path')
const fileUp = require('express-fileupload')
const app = express()

app.use(cors({

    origin:'http://localhost:3000',
    credentials: true

}))


app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use(fileUp())
app.use(express.urlencoded({extended:true}))

const auth = require('./routes/auth')
app.use('/api/auth',auth)

const profile = require('./routes/profile')
app.use('/api/profile',profile)

const dash = require('./routes/dash')
app.use('/api/dash',dash)

//staff Api

const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const indicate = require('./routes/Staff/indicate')
app.use('/api/Staff/indicate',indicate)

const round = require('./routes/Staff/round')
app.use('/api/Staff/round',round)

const eva = require('./routes/Staff/eva')
app.use('/api/Staff/eva',eva)

const commit = require('./routes/Staff/commit')
app.use('/api/Staff/commit',commit)

const status = require('./routes/Staff/status')
app.use('/api/Staff/status',status)


const doc = require('./routes/Staff/doc')
app.use('/api/Staff/doc',doc)

app.use((req,res)=> res.status(404).json({message:'Route not found'}))
app.listen(3001,()=>{

    console.log(`Server Running on Port 3001`);
    

})