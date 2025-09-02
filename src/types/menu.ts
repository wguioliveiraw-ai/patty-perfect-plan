export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  isCustomizable?: boolean;
  ingredients?: string[];
  allergens?: string[];
  preparationTime?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizations?: Customization[];
  totalPrice: number;
}

export interface Customization {
  id: string;
  name: string;
  price: number;
  type: 'ingredient' | 'size' | 'extra';
}

export type MenuCategory = 
  | 'burgers'
  | 'sides'
  | 'drinks'
  | 'desserts'
  | 'combos';

export interface DeliveryInfo {
  address: string;
  phone: string;
  paymentMethod: 'credit' | 'debit' | 'pix' | 'cash';
  estimatedTime: number;
  deliveryFee: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  delivery: DeliveryInfo;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered';
  createdAt: Date;
}