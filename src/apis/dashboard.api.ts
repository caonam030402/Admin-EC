import { Total, TotalOverview } from 'src/types/dashboard.type'
import { SuccessResponse } from 'src/types/utils.type'
import { http } from 'src/utils/http'

const URL = 'dashboard'

export const dashboardApi = {
  getquanlityOverview() {
    return http.get<SuccessResponse<TotalOverview>>(`${URL}/quanlity-overview`)
  },
  getquanlitySoldOverTime() {
    return http.get<SuccessResponse<Total>>(`${URL}/quantity-sold-overtime`)
  }
}
