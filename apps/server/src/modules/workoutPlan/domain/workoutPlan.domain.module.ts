import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { WorkoutPlanDomainFacade } from './workoutPlan.domain.facade'
import { WorkoutPlan } from './workoutPlan.model'

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutPlan]), DatabaseHelperModule],
  providers: [WorkoutPlanDomainFacade, WorkoutPlanDomainFacade],
  exports: [WorkoutPlanDomainFacade],
})
export class WorkoutPlanDomainModule {}
