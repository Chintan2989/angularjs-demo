import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private products: Product[] = [];

  private localStorageKey = 'products';

  constructor() {
    // Initialize localStorage if empty
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.products));
    }
  }

  getProducts(): Product[] {
    const stored = localStorage.getItem(this.localStorageKey);
    return stored ? JSON.parse(stored) : [];
  }

  getProductById(id: number): Product | undefined {
    const storedProducts = this.getProducts();
    return storedProducts.find((p) => p.id === id);
  }

  addProduct(product: Product): void {
    const currentProducts = this.getProducts();
    product.id =
      currentProducts.length > 0
        ? currentProducts[currentProducts.length - 1].id + 1
        : 1;
    currentProducts.push(product);
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentProducts));
  }

  deleteProduct(id: number): void {
    const storedProducts = this.getProducts();
    this.products = storedProducts.filter((p) => p.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.products));
  }

  updateProduct(id: number, updatedProduct: Product): void {
    const storedProducts = this.getProducts();
    const index = storedProducts.findIndex((p) => p.id === id);
    if (index !== -1) {
      storedProducts[index] = { ...updatedProduct, id };
    }
    console.log('Updated product:', storedProducts);
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedProducts));
  }
}
