
export interface Product {
  id: any;
  name: string;
  extendedName: string;
  description: string;
  price: number;
  priceWithoutTax: number;
  brand: string;
  imageUrl: string;
  category: string;
  discount: number;
}

export interface idPair {
  id: string;
  path: string;
}
