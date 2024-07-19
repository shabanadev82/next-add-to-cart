import { UserParamsProps } from "@/data";
import dbConnect from "@/lib/mongodb.config";
import Cart from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest, { params }: UserParamsProps) => {
    const { userId } = params;
    try {
      await dbConnect();
      const cart = await Cart.findOne({userId});
        if(!cart){
          return NextResponse.json({message:"user not found"},{status: 404})
        }
        return NextResponse.json( cart , { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
  };