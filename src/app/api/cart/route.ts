import { ItemsType } from "@/data"
import dbConnect from "@/lib/mongodb.config"
import Cart from "@/models/Cart"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
       await dbConnect()
        const cart = await Cart.find()
        return NextResponse.json(cart,{status:201})
    } catch (error) {
        return NextResponse.json(error,{status:401})
    }
}

export async function POST(request:NextRequest) {
    const body = await request.json();
    try {
        await dbConnect();
        
        const existingCart = await Cart.findOne({ userId: body.userId });
        if (existingCart) {
            // Push each item from body.items array to the existingCart.items array
            body.items.forEach((item:ItemsType) => {
                existingCart.items.push(item);
            });
            await existingCart.save();            
            return NextResponse.json({ success: true, cart: existingCart }, { status: 200 });
        } else {
            // Create a new cart with items from body.items array
            const newCart = new Cart({
                userId: body.userId,
                items: body.items
            });
            await newCart.save();
            return NextResponse.json({ success: true, cart: newCart }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 401 });
    }
}
