/*
  #################### Database elements ####################
 */
export interface Product {
  id: any;
  name: string;
  extendedName: string;
  description: string;
  price: number;
  priceWithoutTax: number;
  brand: string;
  imageUrl: string;
  category: 'headphones' | 'laptops' | 'furniture' | 'sports' | 'phones' | 'games' | 'clothing' | '';
  discount: number;
}

export interface User {
  name: string;
  email: string;
  uid: string;
  password: string;
  profile: 'admin' | 'regular';
  shoppingCart: ShoppingCartElement[];
  photoURL: string;
}

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}


/*
  #################### Auxiliary types ####################
 */
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

export interface ShoppingCartElement {
  id: string;
  count: number;
}

