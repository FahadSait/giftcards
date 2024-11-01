const express= require("express")
const mongoose =require("mongoose")
const cors =require("cors")
const model =require("./models/Employee")
const Razorpay =require("razorpay")

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/employee");

app.post('/login', (req,res)=>{
    const {email,password} =req.body;
    model.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("Success");
                console.log("Success password!!");
            }
            else{
                res.json("Incorrect Password");
            }
        }
        else{
            res.json("Already exist");
        }
    })
})

app.post('/orders', async(req, res) => {
    const razorpay = new Razorpay({
        key_id: "rzp_test_GcZZFDPP0jHtC4",
        key_secret: "6JdtQv2u7oUw7EWziYeyoewJ"
    })

    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "receipt#1",
        payment_capture: 1
    }

    try {
        const response = await razorpay.orders.create(options)

        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

app.get("/payment/:paymentId", async(req, res) => {
    const {paymentId} = req.params;

    const razorpay = new Razorpay({
        key_id: "rzp_test_GcZZFDPP0jHtC4",
        key_secret: "6JdtQv2u7oUw7EWziYeyoewJ"
    })
    
    try {
        const payment = await razorpay.payments.fetch(paymentId)

        if (!payment){
            return res.status(500).json("Error at razorpay loading")
        }

        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        })
    } catch(error) {
        res.status(500).json("failed to fetch")
    }
})

app.post('/register', (req,res)=>{
    model.create(req.body)
    .then(employee=>res.json(employee))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("server is running")
})
