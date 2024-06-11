import mongoose from 'mongoose';
import { AuthList } from '@/lib/createSchema';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const POST = async (request: Request): Promise<NextResponse> => {
  interface User {
    email:string,
    name:string,
    password:string,
  }
  try {
    const body: User = await request.json()
    const { email, name, password } = body
    const database = process.env.MONGODB_URI || 'mongodb+srv://hassanwebdev0896:M.saim777@cluster0.a6knlop.mongodb.net/Next-js?retryWrites=true&w=majority&appName=Cluster0'
    await mongoose.connect(database);
    const isMatched = await AuthList.findOne({ email: email })
    if (isMatched) {
      return NextResponse.json({ "message": "Email already exists" }, { status: 409 });
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      const newUser = new AuthList({
        email: email,
        name: name.toLowerCase(),
        password: hashPassword,
      })
      await newUser.save();
      const response = NextResponse.json({ "Message": "Successfully created" }, { status: 201 })
      const token = jwt.sign({ name, email }, 'ahakahakahak')
      response.cookies.set('token', token);
      return response
    }
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
