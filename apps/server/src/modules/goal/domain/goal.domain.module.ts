import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { GoalDomainFacade } from './goal.domain.facade'
import { Goal } from './goal.model'

@Module({
  imports: [TypeOrmModule.forFeature([Goal]), DatabaseHelperModule],
  providers: [GoalDomainFacade, GoalDomainFacade],
  exports: [GoalDomainFacade],
})
export class GoalDomainModule {}
