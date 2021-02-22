import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  product: Product | null = null;

  constructor(private productsService: ProductsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchProduct();
  }

  private async fetchProduct() {
    const id: number | null = parseInt(this.route.snapshot.paramMap.get('id') || '', 10) || null;
    this.product = (await this.productsService.getProducts().toPromise())
      .find(product => product.id === id) || new Product();

  }

  updateItem(value: number): void {
    this.product!.price = value === null || value < 1 ? 1 : value;
  }

  async save(): Promise<void> {
    if (!this.product!.id) {
      await this.productsService.addProduct(this.product!).toPromise();
    } else {
      await this.productsService.updateProduct(this.product!).toPromise();
    }
    this.router.navigate(['/admin']);
  }
}
