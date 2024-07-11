import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AchievementDomainModule } from '../domain'
import { AchievementController } from './achievement.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { AchievementByUserController } from './achievementByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AchievementDomainModule,

    UserDomainModule,
  ],
  controllers: [AchievementController, AchievementByUserController],
  providers: [],
})
export class AchievementApplicationModule {}
