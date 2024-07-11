import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Achievement } from './achievement.model'

export class AchievementApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Achievement>,
  ): Promise<Achievement[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/achievements${buildOptions}`)
  }

  static findOne(
    achievementId: string,
    queryOptions?: ApiHelper.QueryOptions<Achievement>,
  ): Promise<Achievement> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/achievements/${achievementId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Achievement>): Promise<Achievement> {
    return HttpService.api.post(`/v1/achievements`, values)
  }

  static updateOne(
    achievementId: string,
    values: Partial<Achievement>,
  ): Promise<Achievement> {
    return HttpService.api.patch(`/v1/achievements/${achievementId}`, values)
  }

  static deleteOne(achievementId: string): Promise<void> {
    return HttpService.api.delete(`/v1/achievements/${achievementId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Achievement>,
  ): Promise<Achievement[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/achievements${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Achievement>,
  ): Promise<Achievement> {
    return HttpService.api.post(`/v1/users/user/${userId}/achievements`, values)
  }
}
