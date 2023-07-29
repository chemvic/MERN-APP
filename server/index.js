import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';

const app = express();
dotenv.config();
const {DB_HOST, PORT}=process.env;

// mongoose.set('strictQuery', true);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));

// routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

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



