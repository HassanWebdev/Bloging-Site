import mongoose from 'mongoose';
import { AuthList } from '@/lib/createSchema';
import { NextResponse } from 'next/server';

export async function POST(req: NextResponse) {
    interface User {
        email: string,
        id: string,
    }

    try {
        const body: User = await req.json();
        const { email, id } = body;
        const database = process.env.MONGODB_URI || 'mongodb+srv://hassanwebdev0896:M.saim777@cluster0.a6knlop.mongodb.net/Next-js?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(database);

        const isMatched = await AuthList.findOne({ email: email });

        if (isMatched) {
            isMatched.Posts = isMatched.Posts.filter((post) => post._id.toString() !== id);
            await isMatched.save();
            return NextResponse.json({ 'message': 'Post deleted successfully' });
        } else {
            return NextResponse.json({ 'message': 'User not found' });
        }
    } catch (e) {
        return NextResponse.json({ 'error': e.message });
    }
}