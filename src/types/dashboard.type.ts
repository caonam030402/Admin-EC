export type Total = {
  _id: null | string
  total: number
  currentDateTime?: string
}

export interface TotalOverview {
  totalAmoutSold: Total
  totalProduct: Total
  totalProductSold: Total
  totalUser: Total
}
