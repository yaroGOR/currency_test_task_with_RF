import { Component, Input } from '@angular/core';
import { ICurrencyMB } from 'src/app/models/ICurrencyMB';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() data: ICurrencyMB[] = [];

  constructor() {}
}
