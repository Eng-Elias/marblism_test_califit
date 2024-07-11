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
  CommunityChallenge,
  CommunityChallengeDomainFacade,
} from '@server/modules/communityChallenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CommunityChallengeApplicationEvent } from './communityChallenge.application.event'
import {
  CommunityChallengeCreateDto,
  CommunityChallengeUpdateDto,
} from './communityChallenge.dto'

@Controller('/v1/communityChallenges')
export class CommunityChallengeController {
  constructor(
    private eventService: EventService,
    private communityChallengeDomainFacade: CommunityChallengeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.communityChallengeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: CommunityChallengeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.communityChallengeDomainFacade.create(body)

    await this.eventService.emit<CommunityChallengeApplicationEvent.CommunityChallengeCreated.Payload>(
      CommunityChallengeApplicationEvent.CommunityChallengeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:communityChallengeId')
  async findOne(
    @Param('communityChallengeId') communityChallengeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.communityChallengeDomainFacade.findOneByIdOrFail(
      communityChallengeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:communityChallengeId')
  async update(
    @Param('communityChallengeId') communityChallengeId: string,
    @Body() body: CommunityChallengeUpdateDto,
  ) {
    const item =
      await this.communityChallengeDomainFacade.findOneByIdOrFail(
        communityChallengeId,
      )

    const itemUpdated = await this.communityChallengeDomainFacade.update(
      item,
      body as Partial<CommunityChallenge>,
    )
    return itemUpdated
  }

  @Delete('/:communityChallengeId')
  async delete(@Param('communityChallengeId') communityChallengeId: string) {
    const item =
      await this.communityChallengeDomainFacade.findOneByIdOrFail(
        communityChallengeId,
      )

    await this.communityChallengeDomainFacade.delete(item)

    return item
  }
}
