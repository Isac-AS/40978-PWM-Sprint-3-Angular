
export interface Product {
  id: any;
  name: string;
  extendedName: string;
  description: string;
  price: number;
  priceWithoutTax: number;
  brand: string;
  imageUrl: string;
  category: string;//'headphones' | 'laptops' | 'furniture' | 'sports' | 'phones' | 'games' | 'clothing';
  discount: number;
}

export interface IdPair {
  id: string;
  path: string;
}

export interface HeaderDialogPair {
  login: boolean;
  admin: boolean;
}

export interface MessagePopupPair {
  message: string;
  status: boolean;
}

export interface User {
  name: string;
  email: string;
  uid: string;
  password: string;
  profile: 'admin' | 'regular';
  shoppingCart: string[];
}
