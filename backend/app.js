const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })

app.use(express.json());
app.use(express.urlencoded({
    extended : false
}))

app.use(cors()); 
app.use(cookieParser());

// routes
const userRoute = require('./routes/authRouter');
const contactRoute = require('./routes/contactRoutes')
const tradeapiRoute = require('./routes/trade.api.router')
const newtradeRoute = require('./routes/newtrade.routes');
const macanismRoute = require('./routes/macanismRout')
const paymentRoutes = require('./routes/payment.routes');
const bankDetailRoutes = require('./routes/bankdetails.routes');
const ifscRoutes = require('./routes/ifsc.routes');
const walletRoute = require('./routes/wallet.routes');
const productRoute = require('./routes/product.routes')
const invoiceRoute = require('./routes/invoice.routes')
const kycRoute = require('./routes/kyc.routes')
const adminRoute = require("./routes/admin.routes");



app.use('/api/auth', userRoute);
app.use('/api/trade', tradeapiRoute);
app.use('/api/newtrade', newtradeRoute);
app.use('/api/contact', contactRoute);
app.use('/api/macanism', macanismRoute);
app.use('/api/payment', paymentRoutes);
app.use('/api/bank', bankDetailRoutes);
app.use('/api/ifsc', ifscRoutes);
app.use('/api/wallet', walletRoute);
app.use('/api/product',productRoute)
app.use('/api/invoice',invoiceRoute);
app.use('/api/kyc',kycRoute);
app.use("/api/admin", adminRoute);


app.get('/',(req,res)=>{
    res.json('route tesing')
})

module.exports = app;