import { ICurrencyMB } from '../models/ICurrencyMB';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currency = [];
  constructor(private http: HttpClient) {}

  getAll() {
    const currency = this.http.get<ICurrencyMB[]>(
      'https://api.monobank.ua/bank/currency'
    );

    return currency;
  }
}
