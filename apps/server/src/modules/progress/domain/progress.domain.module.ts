import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ProgressDomainFacade } from './progress.domain.facade'
import { Progress } from './progress.model'

@Module({
  imports: [TypeOrmModule.forFeature([Progress]), DatabaseHelperModule],
  providers: [ProgressDomainFacade, ProgressDomainFacade],
  exports: [ProgressDomainFacade],
})
export class ProgressDomainModule {}
