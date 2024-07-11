import { WorkoutPlanExercise } from '../workoutPlanExercise'

import { Progress } from '../progress'

export class Exercise {
  id: string

  name: string

  description?: string

  videoUrl?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  workoutPlanExercises?: WorkoutPlanExercise[]

  progresss?: Progress[]
}
