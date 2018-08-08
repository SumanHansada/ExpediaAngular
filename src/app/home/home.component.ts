import { Component, OnInit } from '@angular/core';
import { Invoice } from './../interfaces/invoice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  invoice: Invoice[] = [];
  name: string;
  category: string;
  quantity: number;
  price: number;
  taxRate: number;
  totalPrice: number;
  item: any = {};
  undefinedOption: any;
  hasCategoryError = true;
  finalTotal: number;
  constructor() { }

  ngOnInit() {
    this.finalTotal = 0;
    // this.invoice = [
    //   {name: 'XYZ', quantity: 5, category : 'Medical', price: 10, taxRate : null, totalPrice: null},
    //   {name: 'PQR', quantity: 7, category : 'NonMedical', price: 15, taxRate : null, totalPrice: null}
    // ];
  }

  addItem() {
    this.invoice.push(this.item);
    this.item = {};
  }

  removeItem(index: number) {
    this.invoice.splice(index, 1);
    this.finalTotal = this.invoice.reduce((previousValue, currentValue) =>
    previousValue += currentValue.totalPrice, 0);
  }


  changeName(row: number, _name: string) {
    this.invoice[row].name = _name;
  }

  changeQuantity(row: number, _quantity: number) {
    if (_quantity < 1 || _quantity > 9999) {
      return;
    }
    this.invoice[row].quantity = _quantity;
    const amount = this.invoice[row].price * this.invoice[row].quantity;
    if (!isNaN(amount) && !isNaN(this.invoice[row].taxRate)) {
      this.invoice[row].totalPrice = amount - (this.invoice[row].taxRate * amount);
      this.finalTotal = this.invoice.reduce((previousValue, currentValue) =>
      previousValue += currentValue.totalPrice, 0);
    }
  }
  changeCategory(row: number, _category: string) {
    this.invoice[row].category = _category;
    if (_category === 'Medical') {
      this.invoice[row].taxRate = 0;
      this.hasCategoryError = false;
    } else if (_category === 'NonMedical') {
      this.invoice[row].taxRate = 0.2;
      this.hasCategoryError = false;
    } else {
      this.hasCategoryError = true;
      this.invoice[row].taxRate = NaN;
    }
    const amount = this.invoice[row].price * this.invoice[row].quantity;
    if (!isNaN(amount) && !isNaN(this.invoice[row].taxRate)) {
      this.invoice[row].totalPrice = amount - (this.invoice[row].taxRate * amount);
      this.finalTotal = this.invoice.reduce((previousValue, currentValue) =>
      previousValue += currentValue.totalPrice, 0);
    } else if (isNaN(this.invoice[row].taxRate)) {
      this.invoice[row].totalPrice = NaN;
    }
  }
  changePrice(row: number, _price: number) {
    this.invoice[row].price = _price;
    const amount = this.invoice[row].price * this.invoice[row].quantity;
    if (!isNaN(amount) && !isNaN(this.invoice[row].taxRate)) {
      this.invoice[row].totalPrice = amount - (this.invoice[row].taxRate * amount);
      this.finalTotal = this.invoice.reduce((previousValue, currentValue) =>
      previousValue += currentValue.totalPrice, 0);
    }
  }
}
