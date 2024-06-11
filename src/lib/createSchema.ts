import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  email:String,
  img: String,
  title: String,
  content: String,
  category: String,
  date: { type: Date, default: Date.now },
  time: { type: String, default: () => new Date().toLocaleTimeString() },
  comments: [
    {
      email: String,
      comment: String
    }
  ]
});

interface UserIn {
  email: string;
  name: string;
  password: string;
  Posts: {
    email:string,
    img: string;
    title: string;
    content: string;
    category: string;
    date: Date;
    time: string;
    comments: {
      email: string;
      comment: string;
    }[];
  }[];
  date: Date;
}

const UserData: Schema<UserIn> = new Schema({
  email: String,
  name: String,
  password: String,
  Posts: [PostSchema],
  date: { type: Date, default: Date.now }
});

export const AuthList = mongoose.models.authlists || mongoose.model("authlists", UserData);