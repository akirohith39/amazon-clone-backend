const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51Gx3lcGeAq3bZmDs5hA9fQTz9j8f70ScxNRhX3QqpCIKEaxtjSjv8PtMgGSqvYbOirZ1Dergj0yZ1Auz0TZLfswQ00d84GJqNJ");
const uuid = require("uuid");

const app = express();


//middleware
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req,res)=>{
    res.send("hello world")
})


app.post("/payment", (req,res)=>{
    const {product,token} = req.body;
    console.log("Product: ",product);
    console.log("Price: ",product.price);
    const idempontencyKey = uuid.v4();

    return stripe.customers.create({
        email:token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({},{idempontencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

//Listen
app.listen(5000,()=> console.log("listening on port 5000"))