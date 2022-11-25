import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICurr } from 'src/app/models/ICurr';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() data: ICurr[] = [];
  operationType: string;

  formExchanger!: FormGroup;

  currencyBuy: number;
  currencySell: number;

  currencySearchResult: ICurr[];
  outputFieldName: string;

  constructor(private fb: FormBuilder) {
    this.formExchanger = this.fb.group({
      amountBuyField: ['', Validators.pattern("^[0-9.]*$")],
      amountSellField: ['', Validators.pattern("^[0-9.]*$")],
      currencyBuyField: '980',
      currencySellField: '980',
    });

    this.operationType = '';
    this.currencyBuy = 980;
    this.currencySell = 980;
    this.currencySearchResult = [];
    this.outputFieldName = '';
  }

  ngOnInit(): void {
    this.setValues();
    this.onChanges();
  }

  onChanges() {
    this.formExchanger.controls['amountBuyField']?.valueChanges.subscribe(
      () => {
        this.operationType = 'buy';
        this.outputFieldName = 'amountSellField';
      }
    );

    this.formExchanger.controls['amountSellField']?.valueChanges.subscribe(
      () => {
        this.operationType = 'sell';
        this.outputFieldName = 'amountBuyField';
      }
    );
    this.formExchanger.valueChanges.subscribe((val) => {
      console.log(val)
      this.currencySearchResult = this.findCurrencyRecord(
        this.currencyBuy,
        this.currencySell
      );
      var inputValue: number = this.defineInputValue(val);
      var amount: number = this.calculateAmount(inputValue);

      this.setFieldValue(amount, this.outputFieldName);
    });
  }

  defineInputValue(value: any) {
    var amount: number = 0;
    if (this.operationType === 'buy') {
      amount = Number(value.amountBuyField);
    } else if (this.operationType === 'sell') {
      amount = Number(value.amountSellField);
    }
    return amount;
  }

  findCurrencyRecord(currencyBuy: number, currencySell: number) {
    let currencySearchResult: ICurr[] = this.data.filter((item) => {
      return (
        Number(item.currencyCodeA) === Number(currencyBuy) &&
        Number(item.currencyCodeB) === Number(currencySell)
      );
    });
    return currencySearchResult;
  }

  calculateAmount(inputAmount: number) {
    var amount: number = 0;
    if (this.currencySearchResult.length === 0) {
      amount = inputAmount;
    } else {
      if (this.operationType === 'buy') {
        amount = inputAmount * this.currencySearchResult[0].rate;
      } else if (this.operationType === 'sell') {
        amount = (inputAmount * 1) / this.currencySearchResult[0].rate;
      }
    }
    return amount;
  }

  setFieldValue(value: number, fieldName: string) {
    this.formExchanger.controls[fieldName]?.setValue(value, {
      emitEvent: false,
    });
  }
  setValues() {
    this.formExchanger
      .get('currencyBuyField')
      ?.valueChanges.subscribe((val: number) => {
        this.currencyBuy = val;
      });
    this.formExchanger
      .get('currencySellField')
      ?.valueChanges.subscribe((val: number) => {
        this.currencySell = val;
      });
  }
  /**
  onInputChanges() {
    this.formExchanger.controls['amountBuyField']?.valueChanges.subscribe(
      (val) => {
        console.log(val);
        this.type = 'buy';
        console.log(this.type);
        this.calculateAmount();
      }
    );

    this.formExchanger.controls['amountSellField']?.valueChanges.subscribe(
      (val) => {
        console.log(val);
        this.type = 'sell';
        console.log(this.type);
        this.calculateAmount();
      }
    );

    this.formExchanger.valueChanges.subscribe(() => {
      console.log(this.currencyBuy);
      console.log(this.currencySell);
      this.currencySearchResult = this.findCurrencyRecord(
        this.currencyBuy,
        this.currencySell
      );
      this.calculateAmount();
    });
  }

  calculateAmount() {
    console.log('calculating');
    if (this.currencySearchResult.length === 0) {
      this.calculateSameCurrencies();
    } else if (this.currencySearchResult[0].currencyCodeB === 980) {
      console.log('true');
      this.calculateCurrenciesForUAH();
    } else if (this.currencySearchResult[0].currencyCodeB != 980) {
      this.calculateCurrenciesForUAH();
    }
  }

  calculateSameCurrencies() {
    if (this.type === 'buy') {
      this.formExchanger.controls['amountSellField']?.setValue(this.amountBuy, {
        emitEvent: false,
      });
    } else if (this.type === 'sell') {
      this.formExchanger.controls['amountBuyField']?.setValue(this.amountSell, {
        emitEvent: false,
      });
    } else {
    }
  }

  calculateCurrenciesForUAH() {
    // rateBuy < rateSell
    console.log(this.currencyBuy);
    console.log(this.currencySell);
    //якшо водиш кількість валюти яку маєш купити

    if (this.type === 'buy') {
      // якшо купуєш валюту за гривні (валюта бай, грн сел)
      if (this.currencySell === 980) {
        this.amountSell = this.buyForUAH(this.amountBuy);
        this.formExchanger.controls['amountSellField']?.setValue(
          this.amountSell,
          { emitEvent: false }
        );
      }
      // грн бай, валюта сел
      else if (Number(this.currencyBuy) === 980) {
        this.amountSell = this.sellForUAH(this.amountBuy);
        this.formExchanger.controls['amountSellField']?.setValue(
          this.amountSell,
          { emitEvent: false }
        );
      }
      // продаэш валюту 1
      else {
        this.amountSell = this.buyCurrency(this.amountBuy);
        this.formExchanger.controls['amountSellField']?.setValue(
          this.amountSell,
          { emitEvent: false }
        );
      }
    } else if (this.type === 'sell') {
    } else {
    }
  }
  // купуєш валюту за гривні, то скільки валюти отримаєш (валюта бай, грн сел)
  buyForUAH(amount: number) {
    return amount * this.currencySearchResult[0].rateBuy;
  }
  // Якшо продаєш валюту за гривні, то скільки валюти отримаєш (грн бай, валюта селл)
  sellForUAH(amount: number) {
    return (amount * 1) / this.currencySearchResult[0].rateSell;
  }
  buyCurrency(amount: number) {
    return amount * this.currencySearchResult[0].rateBuy;
  }
  sellCurrency(amount: number) {
    return amount * this.currencySearchResult[0].rateSell;
  }

  checkUAHFirst() {
    let UAHFirst: boolean = true;
    if (this.currencyBuy === 980) {
      UAHFirst = true;
    } else if (this.currencySell === 980) {
      UAHFirst = false;
    }
    return UAHFirst;
  }
*/
}
