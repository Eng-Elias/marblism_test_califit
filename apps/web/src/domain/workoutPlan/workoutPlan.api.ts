import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { WorkoutPlan } from './workoutPlan.model'

export class WorkoutPlanApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<WorkoutPlan>,
  ): Promise<WorkoutPlan[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/workoutPlans${buildOptions}`)
  }

  static findOne(
    workoutPlanId: string,
    queryOptions?: ApiHelper.QueryOptions<WorkoutPlan>,
  ): Promise<WorkoutPlan> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/workoutPlans/${workoutPlanId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<WorkoutPlan>): Promise<WorkoutPlan> {
    return HttpService.api.post(`/v1/workoutPlans`, values)
  }

  static updateOne(
    workoutPlanId: string,
    values: Partial<WorkoutPlan>,
  ): Promise<WorkoutPlan> {
    return HttpService.api.patch(`/v1/workoutPlans/${workoutPlanId}`, values)
  }

  static deleteOne(workoutPlanId: string): Promise<void> {
    return HttpService.api.delete(`/v1/workoutPlans/${workoutPlanId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<WorkoutPlan>,
  ): Promise<WorkoutPlan[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/workoutPlans${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<WorkoutPlan>,
  ): Promise<WorkoutPlan> {
    return HttpService.api.post(`/v1/users/user/${userId}/workoutPlans`, values)
  }
}
