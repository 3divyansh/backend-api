
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user');
const cors = require('cors');
const cron = require("node-cron");
require("dotenv").config()
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose');
const url = "mongodb+srv://divyanshsoni:divyansh@divyansh.6jc07nb.mongodb.net/?retryWrites=true&w=majority&appName=Divyanshz"

const PORT = 8888;



app.use(express.json({extended:true,limit:"10mb"}));
app.use(bodyParser.json({extended:true,limit:"10mb"}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());



// { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.DB_URL)
.then(()=>{
	app.listen(PORT,()=>{
		console.log(`Server is running on port ${process.env.PORT}`);
		console.log(`connected to database`)
	});
})
.catch((err)=>{
	console.log(err);
})


app.use("/user",userRoutes);

app.use('/',(req, res,next)=>{
	res.send('server is up running on port ${PORT}');
})
	

