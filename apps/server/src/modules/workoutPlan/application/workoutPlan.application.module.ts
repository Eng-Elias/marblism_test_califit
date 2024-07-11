import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { WorkoutPlanDomainModule } from '../domain'
import { WorkoutPlanController } from './workoutPlan.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { WorkoutPlanByUserController } from './workoutPlanByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    WorkoutPlanDomainModule,

    UserDomainModule,
  ],
  controllers: [WorkoutPlanController, WorkoutPlanByUserController],
  providers: [],
})
export class WorkoutPlanApplicationModule {}
