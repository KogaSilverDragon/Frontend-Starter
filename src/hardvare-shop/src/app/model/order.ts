import {OrderItem} from "./order-item";

export interface IOrder {
  id?: number | null;

  products: OrderItem[];
}

export class Order implements IOrder {
  id: number | null;

  products: OrderItem[];

  constructor(order: IOrder) {
    if (!order) {
      this.id = null;
      this.products = [];
    } else {
      this.id = order.id || null;
      this.products = (order.products || []).map(item => new OrderItem(item));
    }
  }
}
