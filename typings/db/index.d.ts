declare interface ILoginParams {
  email: string
  password: string
}

declare type Product = {
  code: ProductCode
  title: string
  price: number
  inventory: number
}

declare type Products = {
  [key: string]: Product
}

declare type ProductCode = number