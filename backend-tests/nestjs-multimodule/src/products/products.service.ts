import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'TypeScript Book', category: 'books', price: 39 },
    { id: 2, name: 'Keyboard', category: 'electronics', price: 120 },
    { id: 3, name: 'T-Shirt', category: 'clothing', price: 25 },
  ];

  findAll(): { items: Product[]; total: number } {
    return { items: this.products, total: this.products.length };
  }

  findById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
