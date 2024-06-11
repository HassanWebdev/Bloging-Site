import mongoose from 'mongoose';
import { AuthList } from '@/lib/createSchema';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const database =
      process.env.MONGODB_URI ||
      'mongodb+srv://hassanwebdev0896:M.saim777@cluster0.a6knlop.mongodb.net/Next-js?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(database);
    const user = await AuthList.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {name:user.name, email: user.email, password: user.password },
      'ahakahakahak',
      { expiresIn: '1h' }
    );
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      secure: false,
      sameSite: 'lax', // or 'strict', but 'lax' is often better for UX
    });
    return response;
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
