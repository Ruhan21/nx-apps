export interface MenuItem {
  id:string,
  name:string,
  description:string,
  imageUrl:string,
  price:number,
  currency:string,
  filterTags:string[]
}

export interface OrderDetails {
  orderId:string,
  menuItems: MenuItem[],
  currency:string,
  total:number,
  isPaid:boolean
}
