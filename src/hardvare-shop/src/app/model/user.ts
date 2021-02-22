import {Order} from "./order";

export interface IUser {
  id?: number | null;

  name: string;

  access: string;

  orders?: Order[];
}

export class User implements IUser {
  id: number | null;

  name: string;

  access: string;

  orders: Order[];

  constructor(product?: IUser) {
    if (!product) {
      this.id = null;
      this.name = '';
      this.access = 'W';
      this.orders = [];
    } else {
      this.id = product.id || null;
      this.name = product.name || '';
      this.access = product.access || 'W';
      this.orders = (product.orders || []).map(_order => new Order(_order));
    }
  }

  get hasAccessW(): boolean { return /W/.test(this.access); }

  get hasAccessR(): boolean { return /R/.test(this.access); }

  get asJSON(): IUser {
    return {
      id: this.id,
      name: this.name,
      access: this.access,
      orders: this.orders
    };
  }
}
