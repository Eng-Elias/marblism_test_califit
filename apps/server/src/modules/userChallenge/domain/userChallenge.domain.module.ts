import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { UserChallengeDomainFacade } from './userChallenge.domain.facade'
import { UserChallenge } from './userChallenge.model'

@Module({
  imports: [TypeOrmModule.forFeature([UserChallenge]), DatabaseHelperModule],
  providers: [UserChallengeDomainFacade, UserChallengeDomainFacade],
  exports: [UserChallengeDomainFacade],
})
export class UserChallengeDomainModule {}
