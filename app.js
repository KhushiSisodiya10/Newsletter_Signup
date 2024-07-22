const express = require("express");
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//for loading static files
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/646d939c3a" ;

    const options = {
        method: "POST",
        auth: 'ujjwal1:80e1ad2cf81a18257b798a50b7b2c300-us21'
    }
    const request = https.request(url,options,function(response){

        console.log(response.statusCode);

        if(Number(response.statusCode)==200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data" , (data) =>{
            console.log(JSON.parse(data))
        });
    });

    
    request.write(jsonData);
    request.end();
   
})

app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.listen("3000", () => {
    console.log("Server is running on port 3000")
})

//API KEY
// 80e1ad2cf81a18257b798a50b7b2c300-us21

// list ID
//646d939c3a