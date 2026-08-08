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

<<<<<<< HEAD
const pf = require('./routes/profile')
app.use('/api/profile',pf)


=======
>>>>>>> origin/main
app.use((req,res)=> res.status(404).json({message:'Route not found'}))
app.listen(3001,()=>{

    console.log(`Server Running on Port 3001`);
    

})