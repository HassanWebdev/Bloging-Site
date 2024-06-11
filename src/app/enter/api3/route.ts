import mongoose from 'mongoose';
import { AuthList } from '@/lib/createSchema';
import { NextResponse } from 'next/server';


export const POST = async (request: Request): Promise<NextResponse> => {
    interface User{
        email:string,
    }
   try{ const body: User = await request.json()
    const { email } = body
    const database = process.env.MONGODB_URI || 'mongodb+srv://hassanwebdev0896:M.saim777@cluster0.a6knlop.mongodb.net/Next-js?retryWrites=true&w=majority&appName=Cluster0'
    await mongoose.connect(database);
    const isMatched = await AuthList.findOne({email: email })
    return  NextResponse.json(isMatched)}
    catch(e:any){
        return NextResponse.json(e.message)
    }
}
