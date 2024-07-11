import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { GoalDomainFacade } from '@server/modules/goal/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { GoalApplicationEvent } from './goal.application.event'
import { GoalCreateDto } from './goal.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class GoalByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private goalDomainFacade: GoalDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/goals')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.goalDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/goals')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: GoalCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.goalDomainFacade.create(valuesUpdated)

    await this.eventService.emit<GoalApplicationEvent.GoalCreated.Payload>(
      GoalApplicationEvent.GoalCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
