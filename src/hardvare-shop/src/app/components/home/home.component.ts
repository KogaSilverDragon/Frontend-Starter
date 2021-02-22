import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductsService} from "../../services/products.service";
import {UsersService} from "../../services/users.service";
import {User} from "../../model/user";
import {OrderItem} from "../../model/order-item";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _products: Product[] = []
  currentUser: User | null = null
  private userSub: Subscription;
  filter: string = '';

  constructor(private productsService: ProductsService,
              private userService: UsersService) {
    this.userSub = this.userService.getCurrentUser().subscribe((user: User | null) => this.currentUser = user);
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  private async fetchProducts(): Promise<void> {
    this._products = await this.productsService.getProducts().toPromise();
  }

  get products(): Product[] {
    if (!this.filter) { return this._products; }
    const filter = new RegExp(this.filter, 'gi');
    console.log(filter)
    return this._products.filter(product => filter.test(product.name));
  }

  private async updateUser(): Promise<void> {
    await this.userService.updateUser(this.currentUser!).toPromise();
  }

  addToCart(product: Product) {
    const order = this.currentUser?.orders[this.currentUser?.orders.length - 1]!;
    let item = order.products.find(_product => product.id === _product.id);

    if (!item) {
      order.products.push(
        new OrderItem({
          id: product.id,
          quantity: 1,
          discount: 0,
          totalPrice: product.price,
          product: product
        })
      );
    } else {
      item.quantity++;
      item.totalPrice = product.price * item.quantity;
    }

    this.updateUser();
  }
}
