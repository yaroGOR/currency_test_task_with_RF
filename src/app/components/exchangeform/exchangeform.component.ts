import { Component, OnInit, Input } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICurrency } from 'src/app/models/ICurrency';
import { ICurrencyMB } from 'src/app/models/ICurrencyMB';

@Component({
  selector: 'app-exchangeform',
  templateUrl: './exchangeform.component.html',
  styleUrls: ['./exchangeform.component.css']
})

export class ExchangeFormComponent implements OnInit {  
  title = 'exchanger-form'
  @Input() data: ICurrencyMB[] = [];

  formExchanger: FormGroup;
  type : string = ''

  this.formExchanger.get('amountBuy').valueChanges.subscribe((value) => {
    console.log(value)
  })

  callingFunction() {
np
  }
  constructor() {}
  ngOnInit() {
    this.formExchanger = new FormGroup({
      amountBuy: new FormControl('0'),
      amountSell: new FormControl('0'),
      currencyBuy: new FormControl('980'),
      currencySell: new FormControl('980')
    })
  }
    
        
  

  
 

};
