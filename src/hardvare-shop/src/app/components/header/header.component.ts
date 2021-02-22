import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../model/user";
import {Order} from "../../model/order";
import {OrderItem} from "../../model/order-item";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private timeout: number | null = null;

  menuOpen: boolean = false;
  cartOpen: boolean = false;

  @Input() currentUser: User | null = null;
  @Output() logoutUser: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  private async updateUser(): Promise<void> {
    await this.userService.updateUser(this.currentUser!).toPromise();
  }

   updateItem(value: number | FocusEvent, item: OrderItem): void {
    let timeout: number = 3000;
    if (value instanceof FocusEvent) {
      timeout = 0;
    } else {
      item.quantity = value === null || value < 1 ? 1 : value;
      item.totalPrice = !item.product ? 0 : item.product.price * item.quantity;
    }

    if (!!this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => this.updateUser(), timeout);
  }

  removeItem(order: Order, item: OrderItem): void {
    let orderItems: OrderItem[] = this.currentUser!.orders.find(_order => _order.id === order.id)!.products;
    orderItems.splice(orderItems.findIndex(_item => _item.id === item.id), 1);
    this.updateUser();
  }

  getTotal(): string {
    return this.currentUser!.orders.reduce((total: number, order) => {
      return total + order.products.reduce((subtotal: number, item) => {
        return subtotal + item.discountPrice
      }, 0)
    }, 0).toFixed(2)
  }

  logout(): void {
    this.logoutUser.emit();
  }

}
