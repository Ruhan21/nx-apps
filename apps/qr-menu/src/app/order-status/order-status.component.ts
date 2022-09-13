import { Component, OnInit } from '@angular/core';
import {bounceInOnEnterAnimation, fadeInOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'nx-apps-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
  animations: [
    bounceInOnEnterAnimation(),
    fadeInOnEnterAnimation(),
  ]
})
export class OrderStatusComponent implements OnInit {

  textList: string[] = [];
  showTick = false
  showViewOrder= false;
  constructor() {}

  ngOnInit(): void {
    this.textList.push('Payment')
    setTimeout(() => {
      this.textList.push('Completed')
    },250)
    setTimeout(() => {
      this.showTick = true
      setTimeout(() => {
        this.showViewOrder = true
      },500)
    },2200)
  }
}
