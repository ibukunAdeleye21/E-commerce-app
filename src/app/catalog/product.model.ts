export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

export interface Rating {
    rate: number;
    count: number;
}

export interface IProductCart {
    product: IProduct,
    //date: string;
    //userId: number;
    qty: number;
}