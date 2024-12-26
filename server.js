const express = require('express')
const app = express()

//To access website through web browser, you need to declare routes

//routes
app.get('/',(req, res) =>{ 
    //request gets from client, response is what to response back from node app 
    res.send("Hello Node API")
})

app.listen(3000, ()=>{
    console.log('Node API app is running on port 3000.')
})