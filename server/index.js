const express= require("express")
const mongoose =require("mongoose")
const cors =require("cors")
const model =require("./models/Employee")
const Razorpay =require("razorpay")

const app=express()
app.use(express.json())
app.use(cors(
    origin:["https://giftcards.vercel.app"],
    method:["POST","GET"],
    credentials:true
))

mongoose.connect("mongodb://localhost:27017/employee");

const razorpay = new Razorpay({
    key_id: "rzp_test_mYrxFk25VdC4K4",
    key_secret: "uyOzIcOcHea72b7Z0NOhYZ8S",
});

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

app.post("/orders", async (req, res) => {
    const { amount, currency } = req.body;
  
    if (!amount || !currency) {
      return res.status(400).json({ error: "Invalid request payload" });
    }
  
    const options = {
      amount: amount,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };
  
    try {
      const response = await razorpay.orders.create(options);
      res.status(201).json({
        order_id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.get("/payment/:paymentId", async (req, res) => {
    const { paymentId } = req.params;
  
    try {
      const payment = await razorpay.payments.fetch(paymentId);
  
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
  
      res.json({
        status: payment.status,
        method: payment.method,
        amount: payment.amount,
        currency: payment.currency,
      });
    } catch (error) {
      console.error("Error fetching payment:", error);
      res.status(500).json({ error: "Failed to fetch payment details" });
    }
  });

app.post('/register', (req,res)=>{
    model.create(req.body)
    .then(employee=>res.json(employee))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("server is running")
})
