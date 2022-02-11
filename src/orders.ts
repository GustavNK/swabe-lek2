import { Schema } from 'mongoose'

export interface Orders {
  material: string
  amount: number
  currency: string
  price: number
  timestamp: string
  delivery: Delivery
}

export interface Delivery {
    first_name: string
    last_name: string
    address: Address
}

export interface Address {
    street_name: string
    street_number: string
    city: string
}

export const schema = new Schema<Orders>({
  material: {type: String, required: true},
  amount: {type: Number, required: true},
  currency: {type: String, required: true},
  price: {type: Number, required: true},
  timestamp: {type: String, required: true},
  delivery: {
      first_name: String,
      last_name: String,
      address: {
          street_name: String,
          street_number: String,
          city: String
      }
  },
})