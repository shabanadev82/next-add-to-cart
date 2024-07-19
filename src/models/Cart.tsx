import { CartType } from '@/data';
import mongoose, { Schema, model, models, Document } from 'mongoose';

interface ICart extends CartType, Document {}

const cartSchema: Schema = new Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ]
});

const Cart = models?.Cart || model<ICart>('Cart', cartSchema);

export default Cart;