import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {Product} from "../../model/product";
import {UsersService} from "../../services/users.service";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  users: User[] = [];
  products: Product[] = [];
  deleteItem: User | Product | null = null;

  constructor(private usersService: UsersService,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchProducts();
  }

  private async fetchUsers(): Promise<void> {
    this.users = await this.usersService.getUsers().toPromise();
  }

  private async fetchProducts(): Promise<void> {
    this.products = await this.productsService.getProducts().toPromise();
  }

  delete(item: User | Product): void {
    this.deleteItem = item;
  }

  cancelDelete(): void {
    this.deleteItem = null;
  }

  async confirmDelete(): Promise<void> {
    if (this.deleteItem instanceof User) {
      await this.usersService.deleteUser(this.deleteItem).toPromise();
      this.fetchUsers();
    } else {
      await this.productsService.deleteProduct(this.deleteItem!).toPromise();
      this.fetchProducts();
    }

    this.deleteItem = null;
  }

}
