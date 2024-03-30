import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from "./routes/listing.Route.js"
import  path  from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongoDB!');
}).catch((err)=>{
    console.log(err);
});
const __dirname = path.resolve()

const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000,()=>{
    console.log('server is running on port 3000');
});



app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter);

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
})

//midellware
app.use((error,request,response,next)=>{
    const statusCode = error.statusCode || 500 ;
    const message = error.message || 'Internal server Error';
    return response.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })

})
