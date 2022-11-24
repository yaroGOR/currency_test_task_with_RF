import { Component, Input } from '@angular/core';
import { ICurrencyMB } from 'src/app/models/ICurrencyMB';
import { ICurrency } from 'src/app/models/ICurrency';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.css'],
})
export class ExchangerComponent {
  @Input() data: ICurrencyMB[] = [];
  state: string = '';

  constructor() {}

  buyClicked() {
    this.state = 'buy';
  }
  sellClicked() {
    this.state = 'sell';
  }

  onChange_Calculate(event: any, inputValue: ICurrency, type = this.state) {
    //
    let currencySearchResult = this.data.filter((item) => {
      return (
        (Number(item.currencyCodeA) === Number(inputValue.currencyBuy) &&
          Number(item.currencyCodeB) === Number(inputValue.currencySell)) ||
        (Number(item.currencyCodeB) === Number(inputValue.currencyBuy) &&
          Number(item.currencyCodeA) === Number(inputValue.currencySell))
      );
    });

    if (type === 'buy') {
      if (Number(inputValue.currencyBuy) === 980) {
        inputValue.amountSell = Number(
          (
            (inputValue.amountBuy * 1) /
            currencySearchResult[0].rateBuy
          ).toFixed(2)
        );
      } else if (
        Number(inputValue.currencyBuy) === Number(inputValue.currencySell)
      ) {
        inputValue.amountBuy = Number(inputValue.amountSell.toFixed(2));
      } else {
        inputValue.amountSell = Number(
          (inputValue.amountBuy * currencySearchResult[0].rateSell).toFixed(2)
        );
      }
    } else if (type === 'sell') {
      if (Number(inputValue.currencySell) === 980) {
        inputValue.amountBuy = Number(
          (
            (inputValue.amountSell * 1) /
            currencySearchResult[0].rateSell
          ).toFixed(2)
        );
      } else if (
        Number(inputValue.currencyBuy) === Number(inputValue.currencySell)
      ) {
        inputValue.amountBuy = Number(inputValue.amountSell.toFixed(2));
      } else {
        inputValue.amountBuy = Number(
          (inputValue.amountSell * currencySearchResult[0].rateBuy).toFixed(2)
        );
      }
    }
  }
}
