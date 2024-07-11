import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TipDomainModule } from '../domain'
import { TipController } from './tip.controller'

@Module({
  imports: [AuthenticationDomainModule, TipDomainModule],
  controllers: [TipController],
  providers: [],
})
export class TipApplicationModule {}
