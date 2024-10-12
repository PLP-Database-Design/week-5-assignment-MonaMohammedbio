//Declare dependencies and variables
const express = require("express"); //express is a framework to handle the request and responses
const app =express();
const mysql = require  ("mysql2");
const dotenv = require ("dotenv");
// const cors = require ("cors");

app.use(express.json());
// app.use (cors()); 
dotenv.config();

// connect to database
const db = mysql.createConnection(
    {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database : process.env.DB_NAME

    });

    //check if db connection works
    db.connect ((err)=>{
        // No wedding today 
        if(err) return console.log("Error connecting to mysql db");
        //Yes wedding connected
        console.log("connected to mysql successfully as id" ,db.threadId)
// Your code goes here
// GET METHOD example
app.set('view engine','ejs');
app.set('views', __dirname +'/views');   
app.get('/provider', (req,res)=>{
    //Reterieve data from the database
    db.query('SELECT * FROM providers' ,(err,results)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error rerieving data');
        }
        else {
            //Display the records to the browser
            res.render('provider',{results:results});
        }
            
    });
});

        app.listen(process.env.PORT ,()=>{
            console.log(`Server listening on port ${process.env.PORT}`);
            //check if the port listen to the server
            //send a message to the browser
            console.log('Sending message to browser...');
            app.get('/',(req,res)=>{
                res.send('Server starts successfully! Wdedding can go on !!!')
            })
        });
    });