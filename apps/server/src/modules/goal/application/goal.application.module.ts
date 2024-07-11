import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { GoalDomainModule } from '../domain'
import { GoalController } from './goal.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { GoalByUserController } from './goalByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, GoalDomainModule, UserDomainModule],
  controllers: [GoalController, GoalByUserController],
  providers: [],
})
export class GoalApplicationModule {}
