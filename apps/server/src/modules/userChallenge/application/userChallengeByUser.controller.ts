import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UserChallengeDomainFacade } from '@server/modules/userChallenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserChallengeApplicationEvent } from './userChallenge.application.event'
import { UserChallengeCreateDto } from './userChallenge.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class UserChallengeByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private userChallengeDomainFacade: UserChallengeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/userChallenges')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.userChallengeDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/userChallenges')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: UserChallengeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
