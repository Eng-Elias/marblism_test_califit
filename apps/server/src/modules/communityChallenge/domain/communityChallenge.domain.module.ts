import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CommunityChallengeDomainFacade } from './communityChallenge.domain.facade'
import { CommunityChallenge } from './communityChallenge.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityChallenge]),
    DatabaseHelperModule,
  ],
  providers: [CommunityChallengeDomainFacade, CommunityChallengeDomainFacade],
  exports: [CommunityChallengeDomainFacade],
})
export class CommunityChallengeDomainModule {}
