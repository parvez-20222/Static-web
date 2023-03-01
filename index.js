const express = require("express")
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"parvezalam74520@gmail.com",
        pass:"lnzpoazmckyrivqq"
    }
})

const app = express()

app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname + '/views/partials'))
app.use(express.static(path.join(__dirname,"/views/public")))

app.use(bodyParser.json());
// const urlEncoder=bodyParser.urlencoded()
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    return res.render("index")
})
app.get("/about",(req,res)=>{
    return res.render("about")
})

app.get("/faq",(req,res)=>{
    return res.render("faq")
})

app.get("/service",(req,res)=>{
    return res.render("service")
})

app.get("/gallery",(req,res)=>{
    return res.render("gallery")
})

app.get("/contact",(req,res)=>{
    return res.render("contact",{show:false})
})

app.post("/contact",(req,res)=>{
    console.log(req.body);
    let mailOption = {
        from:"parvezalam74520@gmail.com",
        to:req.body.email,
        subject:"Your Query Received!!! : Team Static",
        text : "Thanks to Share Your Query with Us!!!\nOur team Will Contact Your Soon\n"
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error);
    })
    mailOption = {
        from:"parvezalam74520@gmail.com",
        to:"parvezalam74520@gmail.com",
        subject:"Query Received!!! : Team Static",
        text : `
            Name :  ${req.body.name}
            Email :  ${req.body.email}
            Phone :  ${req.body.phone}
            Subject :  ${req.body.subject}
            Message :  ${req.body.message}
        `
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error);
    })
    return res.render("contact",{show:true})
})


app.listen(80,()=>console.log("Server is Running at Port 80"))