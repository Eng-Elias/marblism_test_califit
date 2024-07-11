import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Exercise } from './exercise.model'

export class ExerciseApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Exercise>,
  ): Promise<Exercise[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/exercises${buildOptions}`)
  }

  static findOne(
    exerciseId: string,
    queryOptions?: ApiHelper.QueryOptions<Exercise>,
  ): Promise<Exercise> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/exercises/${exerciseId}${buildOptions}`)
  }

  static createOne(values: Partial<Exercise>): Promise<Exercise> {
    return HttpService.api.post(`/v1/exercises`, values)
  }

  static updateOne(
    exerciseId: string,
    values: Partial<Exercise>,
  ): Promise<Exercise> {
    return HttpService.api.patch(`/v1/exercises/${exerciseId}`, values)
  }

  static deleteOne(exerciseId: string): Promise<void> {
    return HttpService.api.delete(`/v1/exercises/${exerciseId}`)
  }
}
