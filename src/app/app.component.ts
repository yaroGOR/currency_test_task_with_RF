import { Component } from '@angular/core';
import { ICurrencyMB } from './models/ICurrencyMB';
import { CurrencyService } from './services/currency.service';
import { ICurr } from './models/ICurr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'testtask2';
  currencies: ICurrencyMB[] = [];
  newCurrencies: ICurr[] = [];

  oldData: ICurrencyMB[] = [
    {
      currencyCodeA: 840,
      currencyCodeB: 980,
      date: 1668550209,
      rateBuy: 36.65,
      rateSell: 37.4406,
      rateCross: 0,
    },
    {
      currencyCodeA: 978,
      currencyCodeB: 980,
      date: 1668582610,
      rateBuy: 38.05,
      rateSell: 39.0503,
      rateCross: 0,
    },
    {
      currencyCodeA: 978,
      currencyCodeB: 840,
      date: 1668582610,
      rateBuy: 1.028,
      rateSell: 1.048,
      rateCross: 0,
    },
  ];

  constructor( private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.downloadMonoAPIData();
  }

  downloadMonoAPIData() {
    this.currencyService.getAll().subscribe(
      (currencyList) => {
        this.currencies = currencyList.slice(0, 3);
        this.roundDecimals(this.currencies);
        this.newCurrencies = this.handleData(this.currencies);
      },
      (error) => {
        console.log('Error while retrieving data from monobank', error);
        if (error.status == 429) {
          alert(
            'To many requests to monobank API. Wait a minute and retry. Old data wil be provided'
          );
          this.currencies = this.oldData;
          this.roundDecimals(this.currencies);
          this.newCurrencies = this.handleData(this.currencies);

          console.log(this.currencies);
        } else {
          alert('Error, can`t provide actual data. Old data will be provided.');
          this.currencies = this.oldData;
          this.roundDecimals(this.currencies);
          this.newCurrencies = this.handleData(this.currencies);
        }
      }
    );
  }

  roundDecimals(data: ICurrencyMB[]) {
    data.forEach((item) => {
      item.rateBuy = Number(item.rateBuy.toFixed(2));
      item.rateSell = Number(item.rateSell.toFixed(2));
    });
  }

  handleData(data: ICurrencyMB[]) {
    var newData: ICurr[] = [];
    data.forEach((item) => {
      newData.push({
        currencyCodeA: item.currencyCodeA,
        currencyCodeB: item.currencyCodeB,
        rate: item.rateSell,
      });
      newData.push({
        currencyCodeA: item.currencyCodeB,
        currencyCodeB: item.currencyCodeA,
        rate: 1 / item.rateBuy,
      });
    });
    return newData;
  }
}
