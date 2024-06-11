import mongoose from 'mongoose';
import { AuthList } from '@/lib/createSchema';
import { NextResponse } from 'next/server';



export async function POST(req: NextResponse) {
    interface User{
        email:string,
    }
   try{ const body: User = await req.json()
    const { email } = body
    const database = process.env.MONGODB_URI || 'mongodb+srv://hassanwebdev0896:M.saim777@cluster0.a6knlop.mongodb.net/Next-js?retryWrites=true&w=majority&appName=Cluster0'
    await mongoose.connect(database);
    const isMatched = await AuthList.findOne({email: email },{password:false})
    return  NextResponse.json(isMatched)}
    catch(e){
        return NextResponse.json(e.message)
    }
}