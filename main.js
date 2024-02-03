// Import package
const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
// Constants
const app = express();
const host = '127.1.1.1';
const port = 1111;
// USE
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({host:'localhost',user:'root',password:'Nawabi@007@',database:'shoping',port:3306});
db.connect((err)=>{
    if(err) return console.log(err)
    console.log("database connected...")
})

// CRUD Operation Start
app.get("/",(req,res)=>{    
    const q = "SELECT * FROM users";
    db.query(q,(err,data)=>{
        if(data) return res.status(200).json(data);
        res.status(404).json(err.sqlMessage);
    })
})
app.post("/",(req,res)=>{
    const value = [ req.body.name,req.body.f_name,req.body.age,req.body.email,req.body.password ];
    const q = "INSERT INTO users(name,f_name,age,email,password) VALUES (?)";
    db.query(q,[value],(err,data)=>{
        if(data) return res.status(200).json({message:"User inserted"});
        res.status(404).json(err.sqlMessage);
    })
})
app.patch("/",(req,res)=>{
    const value = [ req.body.name,req.body.f_name,req.body.age,req.body.email,req.body.password ];
    const id = req.params.id;
    const q = "UPDATE `users` SET `name`=? , `f_name`=? , `age`=? , `email`=? , `password`=? WHERE id=22";
    db.query(q,[...value,id],(err,data)=>{
        if(data) return res.status(200).json({message:"User updated"});
        res.status(404).json(err.sqlMessage);
    })
})
app.delete("/",(req,res)=>{
    const id = req.params.id;
    const q = "DELETE FROM users WHERE id=?";
    db.query(q,[id],(err,data)=>{
        if(data) return res.status(200).json({message:"User deleted"});
        res.status(404).json(err.sqlMessage);
    })
})
// CRUD Operation End




// Create server
app.listen(port,host,()=>{
    console.log(`connected : http://${host}:${port}`)
})