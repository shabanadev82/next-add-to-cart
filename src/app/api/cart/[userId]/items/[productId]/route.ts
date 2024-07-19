import { IdsProps } from "@/data";
import dbConnect from "@/lib/mongodb.config";
import Cart from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";


export async function GET (request:NextRequest,{params}:IdsProps){
    const {userId, productId}= params;
    
    await dbConnect();
    try {
        const user = await Cart.findOne({userId})
        const item = user.items
        .find((item:any) => item && item.id === productId);
        if(!user){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        return NextResponse.json(item, {status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}
export async function PUT(request: NextRequest, { params }: IdsProps) {
    const { userId, productId } = params;
    const {items}= await request.json();

    await dbConnect();
    
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { userId, "items._id": productId },
            { $set: { "items.$.quantity": items[0].quantity } },
            { new: true }
        );

        if (!updatedCart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }
        
        return NextResponse.json({ message: "Cart updated successfully", updatedCart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: IdsProps) {
    const { userId, productId } = params;

    await dbConnect();
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { _id: productId } } },
            { new: true }
        );

        if (!updatedCart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }
        
        return NextResponse.json({ message: "Item deleted successfully", updatedCart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}