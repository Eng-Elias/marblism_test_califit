import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { UserChallengeDomainModule } from '../domain'
import { UserChallengeController } from './userChallenge.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { UserChallengeByUserController } from './userChallengeByUser.controller'

import { CommunityChallengeDomainModule } from '../../../modules/communityChallenge/domain'

import { UserChallengeByCommunityChallengeController } from './userChallengeByCommunityChallenge.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    UserChallengeDomainModule,

    UserDomainModule,

    CommunityChallengeDomainModule,
  ],
  controllers: [
    UserChallengeController,

    UserChallengeByUserController,

    UserChallengeByCommunityChallengeController,
  ],
  providers: [],
})
export class UserChallengeApplicationModule {}
