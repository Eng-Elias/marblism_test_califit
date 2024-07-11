import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  UserChallenge,
  UserChallengeDomainFacade,
} from '@server/modules/userChallenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { UserChallengeApplicationEvent } from './userChallenge.application.event'
import {
  UserChallengeCreateDto,
  UserChallengeUpdateDto,
} from './userChallenge.dto'

@Controller('/v1/userChallenges')
export class UserChallengeController {
  constructor(
    private eventService: EventService,
    private userChallengeDomainFacade: UserChallengeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.userChallengeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: UserChallengeCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.userChallengeDomainFacade.create(body)

    await this.eventService.emit<UserChallengeApplicationEvent.UserChallengeCreated.Payload>(
      UserChallengeApplicationEvent.UserChallengeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:userChallengeId')
  async findOne(
    @Param('userChallengeId') userChallengeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.userChallengeDomainFacade.findOneByIdOrFail(
      userChallengeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:userChallengeId')
  async update(
    @Param('userChallengeId') userChallengeId: string,
    @Body() body: UserChallengeUpdateDto,
  ) {
    const item =
      await this.userChallengeDomainFacade.findOneByIdOrFail(userChallengeId)

    const itemUpdated = await this.userChallengeDomainFacade.update(
      item,
      body as Partial<UserChallenge>,
    )
    return itemUpdated
  }

  @Delete('/:userChallengeId')
  async delete(@Param('userChallengeId') userChallengeId: string) {
    const item =
      await this.userChallengeDomainFacade.findOneByIdOrFail(userChallengeId)

    await this.userChallengeDomainFacade.delete(item)

    return item
  }
}
