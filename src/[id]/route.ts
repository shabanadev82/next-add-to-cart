import { NextRequest, NextResponse } from 'next/server';
import { ParamsProps } from "@/data";
import dbConnect from "@/lib/mongodb.config";
import Cart from "@/models/Cart";

export const GET = async (request:NextRequest, { params }: ParamsProps) => {
    const { id } = params;
    try {
      await dbConnect();
      const cart = await Cart.findById(id);
      console.log(id);      
      if (cart) {
        return NextResponse.json(cart, { status: 200 });
      } 
        return NextResponse.json({ message: "No cart found" }, { status: 404 });
    } catch (error) {
      return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
  };
  
export const Delete = async (request:NextRequest,{params}:ParamsProps) =>{
    const {id} = params
    try {
        const deletedCart = await Cart.findByIdAndDelete(id)
        if(!deletedCart){
            return NextResponse.json({message:"cart not found"},{status:401})
        }
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}