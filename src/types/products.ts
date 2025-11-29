export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  inStock: boolean;
  createdAt: string;
}

export interface ProductsResponse {
  products: Product[];
  hasMore: boolean;
  nextPage: number | null;
  total: number;
}
