export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  category: string;
  sizes: string[];
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export type View = 'home' | 'shop' | 'vault' | 'product' | 'profile';
