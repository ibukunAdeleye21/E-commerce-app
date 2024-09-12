export interface IUserRegisterCredentials {
    firstname: string;
    lastname: string;
    phonenumber: string;
    password?: string;
    email: string;
}

export interface IUserCredentials {
    Email: string;
    Password: string;
}

export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
}

export interface ICartItemWithProductDetails {
    id: number;
    Quantity: number;
    Price: number;
    Amount: number;
    ProductId: number;
    ProductTitle: string;
    ProductDescription: string;
    ProductCategory: string;
    ProductImage: string;
}
