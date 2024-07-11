import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Progress } from './progress.model'

export class ProgressApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Progress>,
  ): Promise<Progress[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/progresss${buildOptions}`)
  }

  static findOne(
    progressId: string,
    queryOptions?: ApiHelper.QueryOptions<Progress>,
  ): Promise<Progress> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/progresss/${progressId}${buildOptions}`)
  }

  static createOne(values: Partial<Progress>): Promise<Progress> {
    return HttpService.api.post(`/v1/progresss`, values)
  }

  static updateOne(
    progressId: string,
    values: Partial<Progress>,
  ): Promise<Progress> {
    return HttpService.api.patch(`/v1/progresss/${progressId}`, values)
  }

  static deleteOne(progressId: string): Promise<void> {
    return HttpService.api.delete(`/v1/progresss/${progressId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Progress>,
  ): Promise<Progress[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/progresss${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Progress>,
  ): Promise<Progress> {
    return HttpService.api.post(`/v1/users/user/${userId}/progresss`, values)
  }

  static findManyByExerciseId(
    exerciseId: string,
    queryOptions?: ApiHelper.QueryOptions<Progress>,
  ): Promise<Progress[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/exercises/exercise/${exerciseId}/progresss${buildOptions}`,
    )
  }

  static createOneByExerciseId(
    exerciseId: string,
    values: Partial<Progress>,
  ): Promise<Progress> {
    return HttpService.api.post(
      `/v1/exercises/exercise/${exerciseId}/progresss`,
      values,
    )
  }
}
