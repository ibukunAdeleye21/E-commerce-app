import { IProductCart } from "../catalog/product.model";

export interface Order {
    id: number;
    orderDate: string;  // string if you're receiving it as an ISO string from backend
    totalAmount: number;
    status: string;
    cartItems: CartItemDto[];
}

export interface CartItemDto {
    productId: number;
    productTitle: string;
    productDescription: string;
    productCategory: string;
    productImage: string;
    price: number;
    quantity: number;
    amount: number;
}

export interface IOrderItemDto {
    TotalAmount: number;
    cartItems: IProductCart;
}

export interface OrderCartItemDto {
    AllProductId: number,
    Price: number,
    Quantity: number,
    Amount: number
}