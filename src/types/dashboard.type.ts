type Total = {
  _id: null | string
  total: number
}

export interface TotalOverview {
  totalAmoutSold: Total
  totalProduct: Total
  totalProductSold: Total
  totalUser: Total
}
