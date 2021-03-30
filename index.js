const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51IWz2QSCqanxg9sN08G0Jm9aRtbgsGmud89BjKTw4L2taMAVjf4MuxLOYkGgVOIfgs3uuTCwSROCHI8Rpvcnx2z6006p5syhUQ");
const uuid = require("uuid");

const app = express();


//middleware
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req,res)=>{
    res.send("hello world")
})

{/*
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
*/}
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//Listen
//app.listen(process.env.PORT || 5000,()=> console.log("listening on port 5000"))
exports.api = functions.https.onRequest(app);