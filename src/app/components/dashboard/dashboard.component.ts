import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { StatusPipe } from '../../pipes/status.pipe';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [CommonModule, StatusPipe, CurrencyPipe, FormsModule]
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  sortColumn: string = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filterProducts();
  }

  filterProducts(): void {
    // Filter by search term (case insensitive)
    let filtered = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    console.log('Filtered products:', filtered);

    // Sort by product name based on sortOrder
    filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) return this.sortOrder === 'asc' ? -1 : 1;
      if (nameA > nameB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredProducts = filtered;
  }

  editProduct(product: any): void {
    if (!product?.id) {
      console.error('Product ID is missing:', product);
      return;
    }
    console.log('Edit product functionality to be implemented for ID:', product);
    this.router.navigate(['/product', product.id]);
  }

  deleteProduct(id: number): void {
    if (!id) {
      console.error('Product ID is missing:', id);
      return;
    }
    this.productService.deleteProduct(id);
    this.products = this.productService.getProducts();
    this.filterProducts();
  }

}
