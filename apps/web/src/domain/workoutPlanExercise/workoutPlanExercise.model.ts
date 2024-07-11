import { WorkoutPlan } from '../workoutPlan'

import { Exercise } from '../exercise'

export class WorkoutPlanExercise {
  id: string

  order: number

  workoutPlanId?: string

  workoutPlan?: WorkoutPlan

  exerciseId?: string

  exercise?: Exercise

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
