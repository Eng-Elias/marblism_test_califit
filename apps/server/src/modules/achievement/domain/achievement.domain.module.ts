import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AchievementDomainFacade } from './achievement.domain.facade'
import { Achievement } from './achievement.model'

@Module({
  imports: [TypeOrmModule.forFeature([Achievement]), DatabaseHelperModule],
  providers: [AchievementDomainFacade, AchievementDomainFacade],
  exports: [AchievementDomainFacade],
})
export class AchievementDomainModule {}
