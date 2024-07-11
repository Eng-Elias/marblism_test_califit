import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Tip } from './tip.model'

export class TipApi {
  static findMany(queryOptions?: ApiHelper.QueryOptions<Tip>): Promise<Tip[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tips${buildOptions}`)
  }

  static findOne(
    tipId: string,
    queryOptions?: ApiHelper.QueryOptions<Tip>,
  ): Promise<Tip> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tips/${tipId}${buildOptions}`)
  }

  static createOne(values: Partial<Tip>): Promise<Tip> {
    return HttpService.api.post(`/v1/tips`, values)
  }

  static updateOne(tipId: string, values: Partial<Tip>): Promise<Tip> {
    return HttpService.api.patch(`/v1/tips/${tipId}`, values)
  }

  static deleteOne(tipId: string): Promise<void> {
    return HttpService.api.delete(`/v1/tips/${tipId}`)
  }
}
