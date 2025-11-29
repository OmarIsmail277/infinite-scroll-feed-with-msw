import type { Product } from "../types/products";

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
];

const adjectives = [
  "Premium",
  "Deluxe",
  "Essential",
  "Pro",
  "Ultra",
  "Smart",
  "Classic",
];

const productTypes = [
  "Headphones",
  "Laptop",
  "Phone",
  "Watch",
  "Camera",
  "Tablet",
  "Jacket",
  "Shoes",
  "Backpack",
  "Sunglasses",
  "Hat",
  "Novel",
  "Cookbook",
  "Guide",
  "Magazine",
  "Plant",
  "Chair",
  "Lamp",
  "Rug",
  "Vase",
  "Ball",
  "Racket",
  "Bike",
  "Weights",
  "Puzzle",
  "Game",
  "Doll",
  "Car",
];

// Generate 131+ products
export const generateProducts = (count: number = 131): Product[] => {
  return Array.from({ length: count }, (_, index) => {
    const category = categories[index % categories.length];
    const adjective = adjectives[index % adjectives.length];
    const productType = productTypes[index % productTypes.length];

    return {
      id: `product-${index + 1}`,
      name: `${adjective} ${productType}`,
      description: `High-quality ${productType.toLowerCase()} perfect for your needs. Features advanced technology and premium materials.`,
      price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
      category,
      imageUrl: `https://picsum.photos/seed/${index + 1}/400/300`,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 - 5.0
      inStock: Math.random() > 0.1, // 90% in stock
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000
      ).toISOString(),
    };
  });
};

export const mockProducts = generateProducts();
