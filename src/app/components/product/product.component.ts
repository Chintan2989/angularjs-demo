import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AddProductComponent {
  productForm: FormGroup;
  submitted = false;

  editMode = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      status: [true, Validators.required]
    });
  }

   ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.productId = +id;
        const product = this.productService.getProductById(this.productId);
        if (product) {
          this.productForm.patchValue(product);
        }
      }
    });
  }

  get f() { return this.productForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    const product: Product = this.productForm.value;

    if(this.editMode) {
      this.editProduct();
      return;
    }

    this.productService.addProduct(product);
    this.router.navigate(['/dashboard']);
  }

  editProduct(): void {
    console.log('Editing product with ID:', this.productId);
    if (this.productId === null) {
      console.error('Product ID is missing for edit operation');
      return;
    }
    const updatedProduct: Product = { ...this.productForm.value, id: this.productId };
    console.log('Updated product details:', updatedProduct);
    this.productService.updateProduct(this.productId, updatedProduct);
    this.router.navigate(['/dashboard']);
  }
}
