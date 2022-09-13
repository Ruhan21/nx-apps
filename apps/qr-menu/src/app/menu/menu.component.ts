import { Component } from '@angular/core';
import {MenuItem, OrderDetails} from "../interfaces/app.interfcaces";
import {Router} from "@angular/router";

@Component({
  selector: 'nx-apps-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  filerCategories = [
    {categoryName: 'All'},
    {categoryName: 'Starters'},
    {categoryName: 'Salads'},
    {categoryName: 'Specials'}
  ]

  menuItems: MenuItem[] = [
    {
      id:'1',
      name:'Lobster bisque',
      description:'Lorem, deren, trataro, filede, nerada',
      imageUrl:'lobster-bisque.jpg',
      price:5.95,
      currency:'ZAR',
      filterTags:['Specials']
    },{
      id:'2',
      name:'Bread barrel',
      description:'Lorem, deren, trataro, filede, nerada',
      imageUrl:'bread-barrel.jpg',
      price:6.95,
      currency:'ZAR',
      filterTags:['Starters']
    },{
      id:'3',
      name:'Caesar',
      description:'Lorem, deren, trataro, filede, nerada',
      imageUrl:'caesar.jpg',
      price:7.95,
      currency:'ZAR',
      filterTags:['Salads']
    },{
      id:'4',
      name:'Cake',
      description:'Lorem, deren, trataro, filede, nerada',
      imageUrl:'cake.jpg',
      price:9.95,
      currency:'ZAR',
      filterTags:['Specials']
    },{
      id:'5',
      name:'Greek salad',
      description:'Lorem, deren, trataro, filede, nerada',
      imageUrl:'greek-salad.jpg',
      price:8.95,
      currency:'ZAR',
      filterTags:['Salads']
    },{
      id:'6',
      name:'Lobster roll',
      description:'Lorem, deren, trataro, filede, nerada',
      imageUrl:'lobster-roll.jpg',
      price:6.95,
      currency:'ZAR',
      filterTags:['Specials']
    },{
      id:'7',
      name:'Mozzarella',
      description:'Lorem, deren, trataro, filede, nerada',
      imageUrl:'mozzarella.jpg',
      price:5.95,
      currency:'ZAR',
      filterTags:['Starters']
    },{
      id:'8',
      name:'Spinach salad',
      description:'Lorem, deren, trataro, filede, nerada',
      imageUrl:'spinach-salad.jpg',
      price:6.95,
      currency:'ZAR',
      filterTags:['Salads']
    },{
      id:'9',
      name:'Tuscan grilled',
      description:'Lorem, deren, trataro, filede, nerada',
      imageUrl:'tuscan-grilled.jpg',
      price:7.95,
      currency:'ZAR',
      filterTags:['Specials']
    },
  ]

  menuDisplayList = [...this.menuItems]

  orderDetails: OrderDetails = {orderId:'',menuItems:[],total:0,isPaid:false,currency:'ZAR'}

  decodedOrderId : {
    organisationId: string,
    table: string,
    dateTime: Date,
  }

  summarizedOrderData:{menuItem:MenuItem,quantity:number,total:number}[] = []
  showOrderFooter = false

  constructor(private _router:Router) {
    this.orderDetails.orderId = this.createOrderId();
    this.decodedOrderId = this.decodeOrderId(this.orderDetails.orderId)
  }

  filterByCategory(categoryName: string) {
    if(categoryName === 'All'){
      this.menuDisplayList = [...this.menuItems]
    } else {
      this.menuDisplayList = [...this.menuItems.filter(x => x.filterTags.includes(categoryName))]
    }
  }

  toggleShowMenuItem(item:HTMLElement) {
    item.classList.contains('active') ? item.classList.remove('active') : item.classList.add('active')
  }

  createOrderId(){
    const organisationId = 1;
    const tableNumber = 14;
    const dateTime = new Date().getTime();

    return `${organisationId}-${tableNumber}-${dateTime}`
  }

  decodeOrderId(orderId:string){
    const data = orderId.split('-');
    return {
      organisationId: data[0],
      table: data[1],
      dateTime: new Date(parseInt(data[2])),
    }
  }

  addToOrder(item: MenuItem){
    this.orderDetails.menuItems.push(item)
    this.orderDetails.total += item.price
    if(this.orderDetails.menuItems.length > 0 && !this.showOrderFooter){
      this.toggleShowOrderFooter()
    }
  }

  removeFromOrder(item: MenuItem){
    for (let i = 0; i < this.orderDetails.menuItems.length; i++) {
      const menuItem = this.orderDetails.menuItems[i];
      if(menuItem.id === item.id){
        this.orderDetails.menuItems.splice(i,1);
        break;
      }
    }

    this.orderDetails.total -= item.price;

    if(this.orderDetails.menuItems.length === 0 && this.showOrderFooter){
      this.toggleShowOrderFooter()
    }
  }

  numberOfItemsSelected(item: MenuItem){
    return this.orderDetails.menuItems.filter(x => x.id === item.id).length
  }

  summarizeOrderData(){
    this.toggleShowOrderFooter();
    this.summarizedOrderData = [];
    this.orderDetails.menuItems.forEach(value => {
      if(this.summarizedOrderData.filter(x => x.menuItem.id === value.id).length === 0){
        const quantity = this.orderDetails.menuItems.filter(y => y.id === value.id).length;
        this.summarizedOrderData.push({menuItem:value,quantity:quantity,total: quantity * value.price})
      }
    })
  }

  toggleShowOrderFooter(){
    this.showOrderFooter = !this.showOrderFooter;
  }

  payOrder(){
    this._router.navigate(['order-status']);
  }
}
