export interface ItemsType {
    productId:string
    quantity:number
}

export interface CartType {
userId:string;
items:[ItemsType]
}

export interface ParamsProps {
    params: { id: string }
}
export interface UserParamsProps {
    params: { userId: string }
}
export interface IdsProps {
    params :{
        userId: string,
        productId: string
    }
}