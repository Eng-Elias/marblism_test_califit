import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { WorkoutPlanExerciseDomainFacade } from './workoutPlanExercise.domain.facade'
import { WorkoutPlanExercise } from './workoutPlanExercise.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutPlanExercise]),
    DatabaseHelperModule,
  ],
  providers: [WorkoutPlanExerciseDomainFacade, WorkoutPlanExerciseDomainFacade],
  exports: [WorkoutPlanExerciseDomainFacade],
})
export class WorkoutPlanExerciseDomainModule {}
