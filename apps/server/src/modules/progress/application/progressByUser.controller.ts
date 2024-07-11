import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ProgressDomainFacade } from '@server/modules/progress/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ProgressApplicationEvent } from './progress.application.event'
import { ProgressCreateDto } from './progress.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ProgressByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private progressDomainFacade: ProgressDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/progresss')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.progressDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/progresss')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ProgressCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.progressDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ProgressApplicationEvent.ProgressCreated.Payload>(
      ProgressApplicationEvent.ProgressCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
