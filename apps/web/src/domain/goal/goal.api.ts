import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Goal } from './goal.model'

export class GoalApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Goal>,
  ): Promise<Goal[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/goals${buildOptions}`)
  }

  static findOne(
    goalId: string,
    queryOptions?: ApiHelper.QueryOptions<Goal>,
  ): Promise<Goal> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/goals/${goalId}${buildOptions}`)
  }

  static createOne(values: Partial<Goal>): Promise<Goal> {
    return HttpService.api.post(`/v1/goals`, values)
  }

  static updateOne(goalId: string, values: Partial<Goal>): Promise<Goal> {
    return HttpService.api.patch(`/v1/goals/${goalId}`, values)
  }

  static deleteOne(goalId: string): Promise<void> {
    return HttpService.api.delete(`/v1/goals/${goalId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Goal>,
  ): Promise<Goal[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/user/${userId}/goals${buildOptions}`)
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Goal>,
  ): Promise<Goal> {
    return HttpService.api.post(`/v1/users/user/${userId}/goals`, values)
  }
}
