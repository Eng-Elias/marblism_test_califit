import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TipDomainFacade } from './tip.domain.facade'
import { Tip } from './tip.model'

@Module({
  imports: [TypeOrmModule.forFeature([Tip]), DatabaseHelperModule],
  providers: [TipDomainFacade, TipDomainFacade],
  exports: [TipDomainFacade],
})
export class TipDomainModule {}
