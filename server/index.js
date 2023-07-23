import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/auth.js';

const app = express();
dotenv.config();
const {DB_HOST, PORT}=process.env;

// mongoose.set('strictQuery', true);

//Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);

 function start(){
 
    mongoose.connect(DB_HOST)
    .then(()=>{ console.log("Database connection successful");
      app.listen(PORT);
      console.log(`Server started on port: ${PORT}`);})
    .catch(error=>{
      console.log(error.message);
      process.exit(1);
  });
   
}
start();



