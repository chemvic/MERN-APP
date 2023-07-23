import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
           },
    posts:{
        type: Schema.Types.ObjectId,
        ref: 'Post',       
    },
    token:{
        type: String,
    }
    },

    {timestamps: true, versionKey:false, }

);

export default model('User', userSchema);