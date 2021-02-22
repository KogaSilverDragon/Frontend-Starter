export interface IProduct {
  id?: number | null;

  name: string;

  description: string;

  price: number;
}

export class Product implements IProduct {
  id: number | null;

  name: string;

  description: string;

  price: number;

  constructor(product?: IProduct) {
    if (!product) {
      this.id = null;
      this.name = '';
      this.description = '';
      this.price = 0;
    } else {
      this.id = product.id || null;
      this.name = product.name || '';
      this.description = product.description || '';
      this.price = product.price || 0;
    }
  }
}
