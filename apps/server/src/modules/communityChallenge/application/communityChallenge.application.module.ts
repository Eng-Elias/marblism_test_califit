import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CommunityChallengeDomainModule } from '../domain'
import { CommunityChallengeController } from './communityChallenge.controller'

@Module({
  imports: [AuthenticationDomainModule, CommunityChallengeDomainModule],
  controllers: [CommunityChallengeController],
  providers: [],
})
export class CommunityChallengeApplicationModule {}
