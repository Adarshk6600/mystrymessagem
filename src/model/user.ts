import mongoose, { Schema, Document, Model } from "mongoose";

 export interface Message extends Document {
  content: string,
   createdAt: Date,
}

const MessageSchema: Schema<Message> = new Schema(
  {

    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    }
  }
)

export interface User extends Document {
   username: String,
   email: String,
   password: String,
   verifyCode:String
   verifyCodeExpiry: Date,
   isVerified:boolean,
   isAcceptingMessage:boolean,
   messages:Message[],
   
}


const UserSchema: Schema<User> = new Schema(
  {

    username: {
      type: String,
      required: [true, 'username is required'],
      trim: true,
      unique:true
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique:true,
      default: Date.now,
      match: [/.+\@.+\..+/, 'please use a valid Email'],
    },

    password: {
      type: String,
      required:[true, 'password is required']
    },

    verifyCode: {
      type: String,
      required:[true, 'verification code is required']
    },

    verifyCodeExpiry: {
      type: Date,
      required:[true, 'verification code is required']
    },


    isVerified: {
      type: Boolean,
      required: [true, 'please verify'],
      default:false
    },

    isAcceptingMessage: {
      type: Boolean,
      default:true
    },

    messages:[MessageSchema]

  }
)


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema)

export default UserModel;