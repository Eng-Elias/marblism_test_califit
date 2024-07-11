import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { WorkoutPlanExerciseDomainModule } from '../domain'
import { WorkoutPlanExerciseController } from './workoutPlanExercise.controller'

import { WorkoutPlanDomainModule } from '../../../modules/workoutPlan/domain'

import { WorkoutPlanExerciseByWorkoutPlanController } from './workoutPlanExerciseByWorkoutPlan.controller'

import { ExerciseDomainModule } from '../../../modules/exercise/domain'

import { WorkoutPlanExerciseByExerciseController } from './workoutPlanExerciseByExercise.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    WorkoutPlanExerciseDomainModule,

    WorkoutPlanDomainModule,

    ExerciseDomainModule,
  ],
  controllers: [
    WorkoutPlanExerciseController,

    WorkoutPlanExerciseByWorkoutPlanController,

    WorkoutPlanExerciseByExerciseController,
  ],
  providers: [],
})
export class WorkoutPlanExerciseApplicationModule {}
