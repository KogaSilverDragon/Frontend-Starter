import {Component} from '@angular/core';
import {User} from "./model/user";
import {Router, RoutesRecognized} from "@angular/router";
import {Subscription} from "rxjs";
import {UsersService} from "./services/users.service";
import {Product} from "./model/product";
import {ProductsService} from "./services/products.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private routerSub: Subscription;
  private userSub: Subscription;

  currentUser: User | null = null;
  hideHeader: boolean = false;

  constructor(private router: Router,
              private usersService: UsersService,
              private productsService: ProductsService) {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        this.hideHeader = event.state?.root?.firstChild?.data['hideHeader'] || false;
      }
    });

    this.userSub = this.usersService.getCurrentUser().subscribe((user: User | null) => {
      this.currentUser = user;
      this.updateUserProductsInfo();
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  logoutUser(): void {
    this.usersService.clearCurrentUser();
    this.currentUser = null;
    this.router.navigate(['/home'])
  }

  async updateUserProductsInfo(): Promise<void> {
    const products: Product[] = await this.productsService.getProducts().toPromise();
    this.currentUser?.orders.forEach(order => order.products.forEach(product => {
      product.product = products.find((_product) => product.id === _product.id)
    }));
  }
}
