import {Product} from "./product";

export interface IOrderItem {
  id?: number | null;

  product?: Product;

  quantity: number;

  totalPrice: number;

  discount: number;
}

export class OrderItem implements IOrderItem {
  id: number | null;

  product?: Product;

  quantity: number;

  totalPrice: number;

  discount: number;

  constructor(orderItem: IOrderItem) {
    if (!orderItem) {
      this.id = null;
      this.quantity = 0;
      this.totalPrice = 0;
      this.discount = 0;
    } else {
      this.id = orderItem.id || null;
      this.quantity = orderItem.quantity || 0;
      this.totalPrice = orderItem.totalPrice || 0;
      this.discount = orderItem.discount || 0;
      this.product = orderItem.product;
    }
  }

  get asJSON(): IOrderItem {
    return {
      id: this.id,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
      discount: this.discount,
    };
  }

  get discountPrice(): number {
    return this.totalPrice * (1 - this.discount / 100)
  }
}
