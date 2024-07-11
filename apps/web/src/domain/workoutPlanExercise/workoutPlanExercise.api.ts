import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { WorkoutPlanExercise } from './workoutPlanExercise.model'

export class WorkoutPlanExerciseApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<WorkoutPlanExercise>,
  ): Promise<WorkoutPlanExercise[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/workoutPlanExercises${buildOptions}`)
  }

  static findOne(
    workoutPlanExerciseId: string,
    queryOptions?: ApiHelper.QueryOptions<WorkoutPlanExercise>,
  ): Promise<WorkoutPlanExercise> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/workoutPlanExercises/${workoutPlanExerciseId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<WorkoutPlanExercise>,
  ): Promise<WorkoutPlanExercise> {
    return HttpService.api.post(`/v1/workoutPlanExercises`, values)
  }

  static updateOne(
    workoutPlanExerciseId: string,
    values: Partial<WorkoutPlanExercise>,
  ): Promise<WorkoutPlanExercise> {
    return HttpService.api.patch(
      `/v1/workoutPlanExercises/${workoutPlanExerciseId}`,
      values,
    )
  }

  static deleteOne(workoutPlanExerciseId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/workoutPlanExercises/${workoutPlanExerciseId}`,
    )
  }

  static findManyByWorkoutPlanId(
    workoutPlanId: string,
    queryOptions?: ApiHelper.QueryOptions<WorkoutPlanExercise>,
  ): Promise<WorkoutPlanExercise[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/workoutPlans/workoutPlan/${workoutPlanId}/workoutPlanExercises${buildOptions}`,
    )
  }

  static createOneByWorkoutPlanId(
    workoutPlanId: string,
    values: Partial<WorkoutPlanExercise>,
  ): Promise<WorkoutPlanExercise> {
    return HttpService.api.post(
      `/v1/workoutPlans/workoutPlan/${workoutPlanId}/workoutPlanExercises`,
      values,
    )
  }

  static findManyByExerciseId(
    exerciseId: string,
    queryOptions?: ApiHelper.QueryOptions<WorkoutPlanExercise>,
  ): Promise<WorkoutPlanExercise[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/exercises/exercise/${exerciseId}/workoutPlanExercises${buildOptions}`,
    )
  }

  static createOneByExerciseId(
    exerciseId: string,
    values: Partial<WorkoutPlanExercise>,
  ): Promise<WorkoutPlanExercise> {
    return HttpService.api.post(
      `/v1/exercises/exercise/${exerciseId}/workoutPlanExercises`,
      values,
    )
  }
}
