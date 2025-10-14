import { PagemetaDataType, productType, shippingAddressType } from "./products.type"

export interface OrderAllDetailsType{
  results:number,
  metaDeta:PagemetaDataType,
  data:OrderType[]
}
export interface OrderType {
  shippingAddress: shippingAddressType
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: CartItem[]
  createdAt: string
  updatedAt: string
  id: number
}
export interface CartItem {
  count: number
  product: productType
  price: number
  _id: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}



