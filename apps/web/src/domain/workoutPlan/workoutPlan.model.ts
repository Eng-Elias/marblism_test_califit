import { User } from '../user'

import { WorkoutPlanExercise } from '../workoutPlanExercise'

export class WorkoutPlan {
  id: string

  name: string

  description?: string

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  workoutPlanExercises?: WorkoutPlanExercise[]
}
