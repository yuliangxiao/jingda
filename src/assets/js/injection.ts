import { Injectable } from '@angular/core';



@Injectable()
export class ProductServer {
    constructor() { }
    getProduct(): Product {
        return new Product(10, '标题', 0.00, '备注');
    }
};
export class Product {
    constructor(
        private id: number,
        private title: string,
        private price: number,
        private desc: string
    ) {
    }
}