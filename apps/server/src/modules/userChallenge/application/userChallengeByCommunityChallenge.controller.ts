import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UserChallengeDomainFacade } from '@server/modules/userChallenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserChallengeApplicationEvent } from './userChallenge.application.event'
import { UserChallengeCreateDto } from './userChallenge.dto'

import { CommunityChallengeDomainFacade } from '../../communityChallenge/domain'

@Controller('/v1/communityChallenges')
export class UserChallengeByCommunityChallengeController {
  constructor(
    private communityChallengeDomainFacade: CommunityChallengeDomainFacade,

    private userChallengeDomainFacade: UserChallengeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/communityChallenge/:communityChallengeId/userChallenges')
  async findManyCommunityChallengeId(
    @Param('communityChallengeId') communityChallengeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.communityChallengeDomainFacade.findOneByIdOrFail(
        communityChallengeId,
      )

    const items =
      await this.userChallengeDomainFacade.findManyByCommunityChallenge(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/communityChallenge/:communityChallengeId/userChallenges')
  async createByCommunityChallengeId(
    @Param('communityChallengeId') communityChallengeId: string,
    @Body() body: UserChallengeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, communityChallengeId }

    const item = await this.userChallengeDomainFacade.create(valuesUpdated)

    await this.eventService.emit<UserChallengeApplicationEvent.UserChallengeCreated.Payload>(
      UserChallengeApplicationEvent.UserChallengeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
